const AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-east-1',
});
const fs = require('fs')
const exec = require('child_process').exec

//this is an access token that gives access to the repos.
//right now this token has been created on dorian's account
const GithubAccessKey = '874078b983eeb3908a5a5f08cc223fade144e146'
const CloudFormationStackName = 'dacast-backoffice-terraform-states'
const CloudFormationStackPath = './deployment/setup/state-bucket.cloudformation.json'
const CloudFormationStackS3BucketOutputName = 'S3Bucket'
const CodebuildProjectName = 'dacast-backoffice-deployment'
// the domains will be {EnvName}-{DomainPrefix}.{DomainName}
// except for the ProdEnvName which will be {DomainPrefix}.{DomainName}
const DomainPrefixClient = 'app'
const DomainPrefixAdmin = 'admin'
const ProdEnvName = 'prod'
const StagingEnvName = 'staging'
const DomainName = 'dacast.com'
const DEFAULT_BRANCH = 'master'

async function main(){
    const env = process.argv[2]
    const branch = process.argv[3] || DEFAULT_BRANCH
    if(!env){
        console.log('make sure to specify which environment you want to deploy: node deploy [env name]')
        return
    }
    let envNameAdmin = env + '-' + DomainPrefixAdmin
    let envNameClient = env + '-' + DomainPrefixClient
    let envApiBaseUrl = 'https://singularity-api-app.dacast.com'
    let envAdminApiBaseUrl = 'https://singularity-api-admin.dacast.com'
    let envRecurlyToken = 'ewr1-hgy8aq1eSuf8LEKIOzQk6T'
    let envAmplitudeApiKey = '91c66b0e632ea39b21b7ed408b571b26'
    let appDomain = 'https://staging-app.dacast.com'
    if(ProdEnvName === env) {
        envNameClient = DomainPrefixClient
        envNameAdmin = DomainPrefixAdmin
    }

    switch(env) {
        case ProdEnvName:
            envApiBaseUrl =  'https://universe-api-app.dacast.com'
            envRecurlyToken = 'ewr1-Q41rGVpgRgI2uLRM9kgivS'
            envAmplitudeApiKey = '64efab409adefee52210ae5f7b439186'
            envAdminApiBaseUrl = 'https://universe-api-admin.dacast.com'
            appDomain = 'https://app.dacast.com'
            break
        case StagingEnvName: 
            envApiBaseUrl = 'https://singularity-api-app.dacast.com'
            envRecurlyToken = 'ewr1-hgy8aq1eSuf8LEKIOzQk6T'
            envAmplitudeApiKey = '91c66b0e632ea39b21b7ed408b571b26'
            envAdminApiBaseUrl = 'https://singularity-api-admin.dacast.com'
            appDomain = 'https://staging-app.dacast.com'
            break
        default:
            console.log('unknown env name, using staging api base url ', envApiBaseUrl)
            break
    }

    let stateBucketName

    console.log('Deploying ' + envNameClient)
    if(process.argv.indexOf('--with-setup') !== -1){
        stateBucketName = await deployCloudFormation()
        await deployTerraform(stateBucketName)
    } else {
        console.log('[Prebuild] Skipping setup')
        stateBucketName = await retrieveStateBucketName(new AWS.CloudFormation())
    }

    await startCodebuildBuild(CodebuildProjectName, stateBucketName, envNameClient, envNameAdmin, DomainName, branch, GithubAccessKey, envApiBaseUrl, envAdminApiBaseUrl, envRecurlyToken, envAmplitudeApiKey, appDomain)
}

main()

//TODO tag resources

//deploy.js nplayer preprod

/**
 * @returns the name of the s3 bucket to store terraform states in
 */
async function deployCloudFormation() {
    let template = fs.readFileSync(CloudFormationStackPath).toString()
    let cloudformation = new AWS.CloudFormation()

    try{
        console.log('[Prebuild] Getting cloudformation stack details')
        await cloudformation.describeStacks({
            StackName: CloudFormationStackName
        }).promise()
    }catch(ex){
        if(ex.message !== `Stack with id ${CloudFormationStackName} does not exist`){
            console.log('\n\nThe following error may be due to you not having your AWS credentials setup correctly. Try \n\texport AWS_ACCESS_KEY_ID=...\n\texport AWS_SECRET_ACCESS_KEY=...\n')
            throw ex
        }
        //create stack
        console.log('[Prebuild] Creating cloudformation stack to hold the S3 bucket that will contain the terraform state files')
        await cloudformation.createStack({
            StackName: CloudFormationStackName,
            TemplateBody: template
        }).promise()
    }

    try{
        console.log('[Prebuild] Updating cloudformation stack')
        await cloudformation.updateStack({
            StackName: CloudFormationStackName,
            TemplateBody: template
        }).promise()
        await waitForStackUpdate(cloudformation, CloudFormationStackName)
    }catch(ex){
        if(ex.message !== 'No updates are to be performed.'){
            throw ex
        }
        console.log('[Prebuild] No updates were to be performed')
    }

    let bucketName = await retrieveStateBucketName(cloudformation)
    return bucketName
}

async function retrieveStateBucketName(cloudformation) {
    let description = await cloudformation.describeStacks({
        StackName: CloudFormationStackName
    }).promise()
    let stack = description.Stacks.filter(s => s.StackName === CloudFormationStackName)[0]
    if(!stack) {
        throw new Error('couldnt find stack ' + CloudFormationStackName)
    }
    let output = stack.Outputs.filter(o => o.OutputKey === CloudFormationStackS3BucketOutputName)[0]
    if(!output){
        throw new Error(`couldnt find output key ${CloudFormationStackS3BucketOutputName} in cloudformation stack ${CloudFormationStackName}`)
    }

    let bucketArn = output.OutputValue
    let bucketName = bucketArn.split(':').pop()
    return bucketName
}

async function deployTerraform(stateBucketName) {
    let s3Key = `pipeline-terraform-state`
    console.log('[Prebuild] Initializing terraform')
    let command = `terraform init -input=false -get=true -backend=true -backend-config="bucket=${stateBucketName}" -backend-config="key=${s3Key}"`
    try{
        await runCommand('./deployment/setup', command)
    }catch(ex){
        console.log('[Prebuild] Error initializing terraform, command was: ', command)
        throw ex
    }

    console.log('[Prebuild] Applying terraform template')
    command = `terraform apply -auto-approve -var codebuild_project_name=${CodebuildProjectName}`
    try{
        await runCommand('./deployment/setup', command)
    }catch(ex){
        console.log('[Prebuild] Error applying terraform template, command was: ', command)
        throw ex
    }
}

async function startCodebuildBuild(codebuildProjectName, stateBucketName, envNameClient, envNameAdmin, domainName, branch, githubToken, apiBaseUrl, adminApiBaseUrl, recurlyToken, amplitudeApiKey, appDomain) {
    console.log('[Build] starting build on codebuild project ' + codebuildProjectName)
    let codebuild = new AWS.CodeBuild()
    let buildInfo = await codebuild.startBuild({
        projectName: codebuildProjectName,
        environmentVariablesOverride: [
            {
                name: 'STATE_BUCKET',
                value: stateBucketName,
                type: 'PLAINTEXT'
            },
            {
                name: 'ENV_NAME_CLIENT',
                value: envNameClient,
                type: 'PLAINTEXT'
            },
            {
                name: 'ENV_NAME_ADMIN',
                value: envNameAdmin,
                type: 'PLAINTEXT'
            },
            {
                name: 'BRANCH',
                value: branch,
                type: 'PLAINTEXT'
            },
            {
                name: 'DOMAIN_NAME',
                value: domainName,
                type: 'PLAINTEXT'
            },
            {
                name: 'GITHUB_TOKEN',
                value: githubToken,
                type: 'PLAINTEXT'
            },
            {
                name: 'API_BASE_URL',
                value: apiBaseUrl,
                type: 'PLAINTEXT'
            },
            {
                name: 'ADMIN_API_BASE_URL',
                value: adminApiBaseUrl,
                type: 'PLAINTEXT'
            },
            {
                name: 'RECURLY_TOKEN',
                value: recurlyToken,
                type: 'PLAINTEXT'
            },
            {
                name: 'AMPLITUDE_API_KEY',
                value: amplitudeApiKey,
                type: 'PLAINTEXT'
            },
            {
                name: 'APP_DOMAIN',
                value: appDomain,
                type: 'PLAINTEXT'
            },
        ]
    }).promise()

    //wait for build to end
    while(true){
        let builds = await codebuild.batchGetBuilds({
            ids: [buildInfo.build.id]
        }).promise()
        let build = builds.builds.filter(b => b.id === buildInfo.build.id)[0]
        if(!build) {
            throw new Error('couldnt find build ' + buildInfo.build.id)
        }

        switch(build.buildStatus) {
            case 'FAILED':
            case 'FAULT':
            case 'STOPPED':
            case 'TIMED_OUT':
                throw new Error('build ended with error status: ' + build.buildStatus)
                break
            case 'IN_PROGRESS':
                console.log('[Build] Waiting for build to finish: ' + build.buildStatus + '...')
                await wait(3000)
                continue
            case 'SUCCEEDED':
                console.log('[Build] Build complete')
                break
            default:
                throw new Error('build status is invalid: ' + build.buildStatus)
        }
        break
    }
}

async function wait(time){
    return new Promise((resolve, reject) => setTimeout(resolve, time))
}

function runCommand(projectPath, command) {
    return new Promise((resolve, reject) =>
        // execute the command
        exec(
            // generate command
            command,
            //  generate options
            { cwd: projectPath },
            // resolve promise
            (err, stdout, stderr) =>
                err || stderr
                    ? reject(err || stderr)
                    : resolve(stdout)
        )
    )
}
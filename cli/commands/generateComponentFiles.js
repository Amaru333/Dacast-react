#! /usr/bin/env node
var utils = require("../utils");
var shell = require("shelljs");
var argv = require('yargs')
    .option('component-name', {
        alias: 'cn',
        describe: 'Your component name.'
    })
    .check( (argv) => {
        if(!utils.isValidComponentName(argv['component-name'])) {
            throw("Invalid component name (no numbers/space and CamelCase)")
        } else {
            return true
        }
    } )
    .demandOption(['component-name'], 'Please provide a component name to run this command.')
    .help()
    .argv;

var componentName = argv['component-name'];
var topLevel = shell.exec('git rev-parse --show-toplevel', {silent: true});
var topLevel = topLevel.stdout.replace('\n', '');

var newDirPath = topLevel+'/src/components/'+componentName;

if (shell.test('-d', newDirPath)) {
    shell.echo("Component already exist!");
    shell.exit(1)
}

var newComponentPath = newDirPath+'/'+componentName+'.tsx';
var modelComponentPath = topLevel+'/cli/models/ComponentModel.txt';

shell.mkdir('-p', newDirPath);
shell.touch( newComponentPath );

var componentContent = shell.sed(/@@COMPONENT_NAME@@/g, componentName, modelComponentPath );
shell.exec(" echo '"+ componentContent +"' >> "+ newComponentPath +" ", {silent: true})

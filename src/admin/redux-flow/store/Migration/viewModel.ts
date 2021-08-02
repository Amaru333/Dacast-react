import { GetJobsListOutput, GetMigratedUsersListOutput, GetMigrationJobDetailsOutput, PostStartMigrationJobInput, PostSwitchOverUsersInput } from '../../../../DacastSdk/admin';
import { FilteringMigrationState } from '../../../pages/Migration/MigrationFilters';
import { JobDetails, JobInfo, MigratedUser } from './types';
var qs = require('qs');


export const formatGetJobsListInput = (pendingOnly: boolean): string => {
    if(pendingOnly){
        let currentStep = [
            'Started Export',
            'Polling Export',
            'Done Polling Export',
            'Started Export Verification',
            'Polling Export Verification',
            'Done Polling Export Verification',
            'Started Import',
            'Polling Import',
            'Done Polling Import',
            'Started Import Verification',
            'Polling Import Verification',
            'Started Switch',
            'Polling Switch',
            'Done Switching',
            'Verifying Switch'
        ]
        return '?' + qs.stringify({currentStep}, {arrayFormat: 'comma'})
    }
    return ''
}
export const formatGetJobsListOutput = (data: GetJobsListOutput): JobInfo[] => {
    let formattedData: JobInfo[] = data.jobs.map(job => {
        return {
            ...job,
            currentStep: job.currentStep === 'Success' ? 'Switched' : job.currentStep
        }
    })

    return formattedData
}

export const formatGetJobDetailsInput = (data: string): string => data

export const formatGetJobDetailsOuput = (data: GetMigrationJobDetailsOutput): JobDetails => {
    let formattedData: JobDetails = {
        export: {
            ...data.export,
            label: 'Export'
        },
        exportVerification: {
            ...data.exportVerification,
            label: 'Export Verification',
        },
        import: {
            ...data.import,
            label: 'Import'
        },
        validation: {
            ...data.importVerification,
            label: 'Validation'
        },
        switchover: {
            ...data.switchover,
            label: 'Switch Over'
        },
        overall: {
            status: data.currentStep,
            errorDetails: data.errorDetails,
            label: 'Overall',
            previousStep: data.previousStep
        }
    }
    return formattedData
}

export const formatPostStartJobInput = (data: {platform: 'Dacast' | 'Vzaar', usersList: string[], enableDifferential: boolean}): PostStartMigrationJobInput => {
    let formattedData: PostStartMigrationJobInput = {
        platform: data.platform.toLowerCase() as 'dacast' | 'vzaar',
        userIds: data.usersList,
        enableDifferential: data.enableDifferential
    }

    return formattedData
}

export const formatPostSwitchOverUsersInput = (data: string[]): PostSwitchOverUsersInput => {
    let formattedData: PostSwitchOverUsersInput = {
        onlyUserIds: data
    }

    return formattedData
}

export const formatGetMigratedUserListInput = (data: FilteringMigrationState & {next: string}): string => {
    if (data) {
        let formattedData: string = '?'
        if(Object.values(data.status).some(f => f)) {
            formattedData += 'status=' + Object.keys(data.status).filter(key => data.status[key]).join()
        }
    
        if(data.platform === 'dacast') {
            formattedData += '&platform=dacast'
        }
    
        if(data.platform === 'vzaar') {
            formattedData += '&platform=vzaar'
        }
    
        if(data.userIds) {
            if(data.platform === 'uapp') {
                formattedData += '&uappUserIds=' + data.userIds
            } else {
                formattedData += '&userIds=' + data.userIds
            }
        }

        if(data.next) {
            formattedData += '&next=' + data.next
        }
    
        formattedData = formattedData.replace('?&', '?')
    
        return formattedData
    }

    return ''
}

export const formatGetMigratedUserListOutput = (data: GetMigratedUsersListOutput): {users: MigratedUser[]; next: string} => data
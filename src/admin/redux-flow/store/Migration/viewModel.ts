import { GetJobsListOutput, GetMigratedUsersListOutput, GetMigrationJobDetailsOutput, PostStartMigrationJobInput, PostSwitchOverUsersInput } from "../../../../DacastSdk/admin";
import { FilteringMigrationState } from "../../../pages/Migration/MigrationFilters";
import { JobDetails, JobInfo, MigratedUser } from "./types";

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
        import: {
            ...data.import,
            label: 'Import'
        },
        switchover: {
            ...data.switchover,
            label: "Switch Over"
        },
        overall: {
            status: data.currentStep,
            errorDetails: data.errorDetails,
            label: "Overall"
        }
    }
    return formattedData
}

export const formatPostStartJobInput = (data: {platform: 'Dacast' | 'Vzaar', usersList: string[]}): PostStartMigrationJobInput => {
    let formattedData: PostStartMigrationJobInput = {
        platform: data.platform.toLowerCase() as 'dacast' | 'vzaar',
        userIds: data.usersList
    }

    return formattedData
}

export const formatPostSwitchOverUsersInput = (data: string[]): PostSwitchOverUsersInput => {
    let formattedData: PostSwitchOverUsersInput = {
        onlyUserIds: data
    }

    return formattedData
}

export const formatGetMigratedUserListInput = (data: FilteringMigrationState): string => {
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
            formattedData += '&uappUserIds=' + data.userIds
        }
    
        if(data.legacyUserIds) {
            formattedData += '&userIds=' + data.legacyUserIds
        }
    
        formattedData = formattedData.replace('?&', '?')
    
        return formattedData
    }

    return ''
}

export const formatGetMigratedUserListOutput = (data: GetMigratedUsersListOutput): MigratedUser[] => data.users
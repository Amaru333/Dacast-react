import { GetJobsListOutput, GetMigrationJobDetailsOutput, PostStartMigrationJobInput } from "../../../../DacastSdk/admin";
import { JobDetails, JobInfo } from "./types";

export const formatGetJobsListOutput = (data: GetJobsListOutput): JobInfo[] => data.jobs

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
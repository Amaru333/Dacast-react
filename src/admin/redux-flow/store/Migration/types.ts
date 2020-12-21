export enum ActionTypes {
    GET_JOBS_LIST = "@@admin_migration/GET_JOBS_LIST"
}

export interface JobInfo {
    id: string
    platform: string
    lastUpdateDate: string
    currentStep: string
    errorDetails: string
    userIds: string[]
}

export interface MigrationData {
    jobsList: JobInfo[]
}

export const migrationInitialState: MigrationData | false = false
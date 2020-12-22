export enum ActionTypes {
    GET_JOBS_LIST = "@@admin_migration/GET_JOBS_LIST",
    GET_JOB_DETAILS = "@@admin_migration/GET_JOB_DETAILS",
    START_JOB = "@@admin_migration/START_JOB",
    SWITCH_USERS = "@@admin_migration/SWITCH_USERS",
    GET_MIGRATED_USERS = "@@admin_migration/GET_MIGRATED_USERS"
}

export interface JobInfo {
    id: string
    platform: string
    lastUpdateDate: string
    currentStep: string
    errorDetails: string
    userIds: string[]
}

export type JobDetailsKey = 'export' | 'import' | 'switchover' | 'overall'

export interface JobReport {
    userId: string
    errorDetails: string
    success: boolean
}

export type JobDetails = {
    [key in JobDetailsKey]: {
        status: string
        errorDetails: string
        label: 'Export' | 'Import' | 'Switch Over' | 'Overall'
        reports?: JobReport[]
    }
}

export interface MigratedUser {
    legacyUserId: string
    platform: string
    lastUpdateDate: string
    migrationStatus: string
    uappUserId: string
}

export interface MigrationData {
    jobsList?: JobInfo[]
    jobDetails?: JobDetails | null
    usersList?: MigratedUser[] | null
}

export const migrationInitialState: MigrationData | false = false
import { ActionTypes, JobDetails, JobInfo, MigratedUser } from './types';
import { applyAdminViewModel } from '../../../utils/utils';
import { dacastSdk } from '../../../utils/services/axios/adminAxiosClient';
import { formatGetJobDetailsInput, formatGetJobDetailsOuput, formatGetJobsListOutput, formatGetMigratedUserListOutput, formatPostStartJobInput, formatPostSwitchOverUsersInput } from './viewModel';

export interface GetJobsList {
    type: ActionTypes.GET_JOBS_LIST;
    payload: JobInfo[];
}

export interface GetJobDetails {
    type: ActionTypes.GET_JOB_DETAILS;
    payload: JobDetails;
}

export interface StartJob {
    type: ActionTypes.START_JOB;
    payload: JobDetails;
}

export interface SwitchUsers {
    type: ActionTypes.SWITCH_USERS;
    payload: SwitchUsers;
}

export interface GetMigratedUsersList {
    type: ActionTypes.GET_MIGRATED_USERS;
    payload: MigratedUser[];
}

export const getJobsListAction = applyAdminViewModel(dacastSdk.getJobsList, undefined, formatGetJobsListOutput, ActionTypes.GET_JOBS_LIST, null,  'Couldn\'t get jobs list')
export const getJobDetailsAction = applyAdminViewModel(dacastSdk.getJobDetails, formatGetJobDetailsInput, formatGetJobDetailsOuput, ActionTypes.GET_JOB_DETAILS, null,  'Couldn\'t get jobs details')

export const startMigrationJobAction = applyAdminViewModel(dacastSdk.postStartMigrationJob, formatPostStartJobInput, undefined, ActionTypes.START_JOB, 'Job Started',  'Couldn\'t start job')
export const switchOverUsersAction = applyAdminViewModel(dacastSdk.postSwitchOverUsers, formatPostSwitchOverUsersInput, undefined, ActionTypes.SWITCH_USERS, 'Users Switched',  'Couldn\'t switch users')

export const getMigratedUsersListAction = applyAdminViewModel(dacastSdk.getMigratedUsersList, undefined, formatGetMigratedUserListOutput, ActionTypes.GET_MIGRATED_USERS, null,  'Couldn\'t get migrated users list')

export type Action = GetJobsList | GetJobDetails | StartJob | SwitchUsers | GetMigratedUsersList


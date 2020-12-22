import { ActionTypes, JobDetails, JobInfo } from './types';
import { applyAdminViewModel } from '../../../utils/utils';
import { dacastSdk } from '../../../utils/services/axios/adminAxiosClient';
import { formatGetJobDetailsInput, formatGetJobDetailsOuput, formatGetJobsListOutput, formatPostStartJobInput } from './viewModel';

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

export const getJobsListAction = applyAdminViewModel(dacastSdk.getJobsList, undefined, formatGetJobsListOutput, ActionTypes.GET_JOBS_LIST, null,  'Couldn\'t get jobs list')
export const getJobDetailsAction = applyAdminViewModel(dacastSdk.getJobDetails, formatGetJobDetailsInput, formatGetJobDetailsOuput, ActionTypes.GET_JOB_DETAILS, null,  'Couldn\'t get jobs details')

export const startMigrationJobAction = applyAdminViewModel(dacastSdk.postStartMigrationJob, formatPostStartJobInput, undefined, ActionTypes.START_JOB, 'Job Started',  'Couldn\'t start job')

startMigrationJobAction
export type Action = GetJobsList | GetJobDetails | StartJob


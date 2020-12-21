import { ActionTypes, JobInfo } from './types';
import { applyAdminViewModel } from '../../../utils/utils';
import { dacastSdk } from '../../../utils/services/axios/adminAxiosClient';
import { formatGetJobsListOutput } from './viewModel';

export interface GetJobsList {
    type: ActionTypes.GET_JOBS_LIST;
    payload: JobInfo[];
}

export const getJobsListAction = applyAdminViewModel(dacastSdk.getJobsList, undefined, formatGetJobsListOutput, ActionTypes.GET_JOBS_LIST, null,  'Couldn\'t get jobs list')

export type Action = GetJobsList


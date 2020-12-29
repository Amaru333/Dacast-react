import { Plans, ActionTypes } from './types'
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPlansListOutput } from './viewModel';


export interface GetPlanDetails {
    type: ActionTypes.GET_PLAN_DETAILS;
    payload: Plans;
}

export const getPlanDetailsAction = applyViewModel(dacastSdk.getPlansList, undefined, formatGetPlansListOutput, ActionTypes.GET_PLAN_DETAILS, null, 'Couldn\'t get plans details')


export type UpgradeAction = GetPlanDetails
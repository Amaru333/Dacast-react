import { ActionTypes, PlanInfo } from './types';
import { applyAdminViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { formatGetAccountPlanInput, formatGetAccountPlanOutput, formatPutAccountPlanInput, formatPutExtendTrialInput, formatPutExtendTrialOutput } from './viewModel';

export interface GetPlan {
    type: ActionTypes.GET_ACCOUNT_PLAN;
    payload: PlanInfo;
}

export interface SavePlan {
    type: ActionTypes.SAVE_ACCOUNT_PLAN;
    payload: PlanInfo;
}

export interface ExtendTrial {
    type: ActionTypes.EXTEND_TRIAL;
    payload: number;
}

export const getAccountPlanAction = applyAdminViewModel(dacastSdk.getAccountPlan, formatGetAccountPlanInput, formatGetAccountPlanOutput, ActionTypes.GET_ACCOUNT_PLAN, null,  'Couldn\'t get plan details')
export const saveAccountPlanAction = applyAdminViewModel(dacastSdk.putAccountPlan, formatPutAccountPlanInput, undefined, ActionTypes.SAVE_ACCOUNT_PLAN, 'Plan details saved',  'Couldn\'t save plan details')
export const extendTrialAction = applyAdminViewModel(dacastSdk.putExtendTrial, formatPutExtendTrialInput, formatPutExtendTrialOutput, ActionTypes.EXTEND_TRIAL, 'Trial extended',  'Couldn\'t extend trial')

export type Action = GetPlan | SavePlan | ExtendTrial
import { ActionTypes, PlanInfo } from './types';
import { applyAdminViewModel } from '../../../../utils/utils';
import { dacastSdk } from '../../../../utils/services/axios/adminAxiosClient';
import { formatGetAccountPlanInput, formatGetAccountPlanOutput, formatPutAccountPlanInput } from './viewModel';

export interface GetPlan {
    type: ActionTypes.GET_ACCOUNT_PLAN;
    payload: PlanInfo;
}

export interface SavePlan {
    type: ActionTypes.SAVE_ACCOUNT_PLAN;
    payload: PlanInfo;
}

export interface SwitchPlan {
    type: ActionTypes.SWITCH_ACCOUNT_PLAN;
    payload: string;
}

export const getAccountPlanAction = applyAdminViewModel(dacastSdk.getAccountPlan, formatGetAccountPlanInput, formatGetAccountPlanOutput, ActionTypes.GET_ACCOUNT_PLAN, null,  'Couldn\'t get plan details')
export const saveAccountPlanAction = applyAdminViewModel(dacastSdk.putAccountPlan, formatPutAccountPlanInput, undefined, ActionTypes.SAVE_ACCOUNT_PLAN, 'Plan details saved',  'Couldn\'t save plan details')

export type Action = GetPlan | SavePlan | SwitchPlan
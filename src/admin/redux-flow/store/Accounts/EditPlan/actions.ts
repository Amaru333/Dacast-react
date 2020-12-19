import { ActionTypes, PlanInfo } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { PlansServices } from './service';
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


export const switchAccountPLanAction = (accountId: string, newPlan: string): ThunkDispatch<Promise<void>, {}, SwitchPlan> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, SwitchPlan>) => {
        await PlansServices.switchAccountPlan(accountId, newPlan)
            .then( response => {
                dispatch({type: ActionTypes.SWITCH_ACCOUNT_PLAN, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetPlan | SavePlan | SwitchPlan
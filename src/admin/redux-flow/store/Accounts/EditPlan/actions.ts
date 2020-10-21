import { ActionTypes, PlanInfo, PlanInfoPut } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { PlansServices } from './service';
import { showToastNotification } from '../../Toasts';

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

export const getAccountPlanAction = (accountId: string): ThunkDispatch<Promise<void>, {}, GetPlan> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetPlan>) => {
        await PlansServices.getAccountPlan(accountId)
            .then( response => {
                dispatch({type: ActionTypes.GET_ACCOUNT_PLAN, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification('Couldn\'t fetch plan details' , 'fixed', 'error'))
            })
    }
}

export const saveAccountPlanAction = (accountId: string, planInfo: PlanInfoPut): ThunkDispatch<Promise<void>, {}, SavePlan> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, SavePlan>) => {
        await PlansServices.saveAccountPlan(accountId, planInfo)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_ACCOUNT_PLAN, payload: response.data})
                dispatch(showToastNotification('Plan details saved!' , 'fixed', 'error'))

            }).catch(() => {
                dispatch(showToastNotification('Couldn\'t save plan details' , 'fixed', 'error'))

            })
    }
}

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
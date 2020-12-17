import { ThunkDispatch } from 'redux-thunk';
import { Plans, ActionTypes, ChangePlan, Plan } from './types'
import { UpgradeServices } from './services'
import { ApplicationState } from '../..';
import { showToastNotification } from '../../Toasts/actions';


export interface GetPlanDetails {
    type: ActionTypes.GET_PLAN_DETAILS;
    payload: {data: Plans};
}

export interface ChangeActivePlan {
    type: ActionTypes.CHANGE_ACTIVE_PLAN;
    payload: string;
}

export const getPlanDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetPlanDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPlanDetails> ) => {
        await UpgradeServices.getPlanDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAN_DETAILS, payload: {data: response.data.data}} );
            }).catch(() => {
                return Promise.reject()
            })
    };
}

export const purchasePlanAction = (data: Plan, recurlyToken: string, token3Ds?: string): ThunkDispatch<Promise<any>, {}, ChangeActivePlan> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ChangeActivePlan>) => {
        await UpgradeServices.purchasePlanService(data, recurlyToken, token3Ds)
            .then( response => {
                return response
                dispatch( {type: ActionTypes.CHANGE_ACTIVE_PLAN, payload: response && response.data.data.tokenID} );
            }).catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export type UpgradeAction = GetPlanDetails | ChangeActivePlan
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
    payload: ChangePlan;
}

export const getPlanDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetPlanDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPlanDetails> ) => {
        await UpgradeServices.getPlanDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAN_DETAILS, payload: {data: response.data.data}} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changeActivePlanAction = (data: Plan, recurlyToken: any): ThunkDispatch<Promise<void>, {}, ChangeActivePlan> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ChangeActivePlan> ) => {
        console.log('data(stepper data', data)
        await UpgradeServices.changeActivePlanService(data, recurlyToken)
            .then( response => {
                console.log('action response', response)
                
                
                // dispatch( {type: ActionTypes.CHANGE_ACTIVE_PLAN, payload: data} );
            }).catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                console.log('error', error)
            })
    };
}

export type UpgradeAction = GetPlanDetails | ChangeActivePlan
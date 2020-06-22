import { ThunkDispatch } from 'redux-thunk';
import { Plans, ActionTypes, ChangePlan } from './types'
import { PlansServices } from './services'
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
        await PlansServices.getPlanDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAN_DETAILS, payload: {data: response.data.data}} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changeActivePlanAction = (data: ChangePlan): ThunkDispatch<Promise<void>, {}, ChangeActivePlan> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ChangeActivePlan> ) => {
        await PlansServices.changeActivePlanService(data)
            .then( response => {
                console.log('action response', response)
                return response
                
                // dispatch( {type: ActionTypes.CHANGE_ACTIVE_PLAN, payload: data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type PlansAction = GetPlanDetails | ChangeActivePlan
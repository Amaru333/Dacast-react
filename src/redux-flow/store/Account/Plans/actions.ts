import { showToastNotification } from '../../Toasts/actions';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../..';
import { Plans, ActionTypes } from './types'
import { PlansServices } from './services'


export interface GetPlanDetails {
    type: ActionTypes.GET_PLAN_DETAILS;
    payload: Plans;
}

export interface ChangeActivePlan {
    type: ActionTypes.CHANGE_ACTIVE_PLAN;
    payload: Plans;
}

export const getPlanDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetPlanDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetPlanDetails> ) => {
        await PlansServices.getPlanDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_PLAN_DETAILS, payload: response.data} );
                console.log(Object.values({...response.data}))
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changeActivePlanAction = (data: Plans): ThunkDispatch<Promise<void>, {}, ChangeActivePlan> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, ChangeActivePlan> ) => {
        await PlansServices.changeActivePlanService(data)
            .then( response => {
                dispatch( {type: ActionTypes.CHANGE_ACTIVE_PLAN, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type PlansAction = GetPlanDetails | ChangeActivePlan
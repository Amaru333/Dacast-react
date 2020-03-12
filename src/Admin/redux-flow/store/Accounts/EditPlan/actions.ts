import { ActionTypes, PlanInfo } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { PlansServices } from './service';

export interface GetPlan {
    type: ActionTypes.GET_ACCOUNT_PLAN;
    payload: PlanInfo;
}

export const getAccountsAction = (accountId: string): ThunkDispatch<Promise<void>, {}, GetPlan> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetPlan>) => {
        await PlansServices.getPlan(accountId)
            .then( response => {
                dispatch({type: ActionTypes.GET_ACCOUNT_PLAN, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetPlan
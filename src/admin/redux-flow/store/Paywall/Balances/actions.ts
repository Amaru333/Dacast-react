import { ActionTypes, AccountBalanceInfo } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { BalancesServices } from './services';

export interface GetBalances {
    type: ActionTypes.GET_BALANCES;
    payload: AccountBalanceInfo;
}

export const getBalancesAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetBalances> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetBalances>) => {
        await BalancesServices.getBalances(qs)
            .then( response => {
                dispatch({type: ActionTypes.GET_BALANCES, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetBalances
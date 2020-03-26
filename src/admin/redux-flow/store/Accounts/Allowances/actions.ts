import { ActionTypes, Allowances } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { AccountAllowancesServices } from './service';

export interface GetAccountAllowances {
    type: ActionTypes.GET_ACCOUNT_ALLOWANCES;
    payload: Allowances;
}

export interface SaveAccountAllowances {
    type: ActionTypes.SAVE_ACCOUNT_ALLOWANCES;
    payload: Allowances;
}

export const getAccountAllowancesAction = (accountId: string): ThunkDispatch<Promise<void>, {}, GetAccountAllowances> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetAccountAllowances>) => {
        await AccountAllowancesServices.getAccountAllowances(accountId)
            .then( response => {
                dispatch({type: ActionTypes.GET_ACCOUNT_ALLOWANCES, payload: response.data});
            }).catch(() => {

            })
    }
}

export const saveAccountAllowancesAction = (accountAllocances: {[key: string]: string}, accountId: string): ThunkDispatch<Promise<void>, {}, SaveAccountAllowances> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, SaveAccountAllowances>) => {
        await AccountAllowancesServices.saveAccountAllowances(accountAllocances, accountId)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_ACCOUNT_ALLOWANCES, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetAccountAllowances | SaveAccountAllowances
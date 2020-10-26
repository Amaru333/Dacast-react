import { ActionTypes, Allowances, PutAllowances } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { AccountAllowancesServices } from './service';
import { showToastNotification } from '../../Toasts';

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
                dispatch(showToastNotification('Couldn\'t fetch allowances data' , 'fixed', 'error'))
            })
    }
}

export const saveAccountAllowancesAction = (accountAllocances: PutAllowances, accountId: string): ThunkDispatch<Promise<void>, {}, SaveAccountAllowances> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, SaveAccountAllowances>) => {
        await AccountAllowancesServices.saveAccountAllowances(accountAllocances, accountId)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_ACCOUNT_ALLOWANCES, payload: response.data});
                dispatch(showToastNotification('Allowances data saved!' , 'fixed', 'success'))

            }).catch(() => {
                dispatch(showToastNotification('Couldn\'t save allowances data' , 'fixed', 'error'))
            })
    }
}

export type Action = GetAccountAllowances | SaveAccountAllowances
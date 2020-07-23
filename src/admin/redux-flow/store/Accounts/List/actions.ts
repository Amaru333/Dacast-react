import { ActionTypes, Account } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { AccountsServices } from './services';

export interface GetAccounts {
    type: ActionTypes.GET_ACCOUNTS;
    payload: {
        data: {
            accounts: Account[]
        }
    };
}

export interface Impersonate {
    type: ActionTypes.IMPERSONATE,
    payload: {
        data: {
            token: string
        }
    }
}

export const getAccountsAction = (accountId: string): ThunkDispatch<Promise<void>, {}, GetAccounts> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetAccounts>) => {
        await AccountsServices.getAccounts(accountId)
            .then( response => {
                dispatch({type: ActionTypes.GET_ACCOUNTS, payload: response.data});
            }).catch(() => {

            })
    }
}

export const impersonateAction = (accountId: string): ThunkDispatch<Promise<void>, {}, Impersonate> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, Impersonate>) => {
        await AccountsServices.impersonate(accountId)
            .then( response => {
                dispatch({type: ActionTypes.IMPERSONATE, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetAccounts
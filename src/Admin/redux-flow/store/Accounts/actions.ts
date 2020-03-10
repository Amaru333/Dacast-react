import { ActionTypes, Account } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '..';
import { AccountsServices } from './services';

export interface GetAccounts {
    type: ActionTypes.GET_ACCOUNTS;
    payload: Account[];
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

export type Action = GetAccounts
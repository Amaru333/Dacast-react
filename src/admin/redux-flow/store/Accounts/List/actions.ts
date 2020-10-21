import { ActionTypes, Account } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { AccountsServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetAccounts {
    type: ActionTypes.GET_ACCOUNTS;
    payload: { users: Account[]; total: number}
}

export interface Impersonate {
    type: ActionTypes.IMPERSONATE,
    payload: {
        data: {
            token: string
        }
    }
}

export const getAccountsAction = (accountId: string, qs: string): ThunkDispatch<Promise<void>, {}, GetAccounts> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetAccounts>) => {
        await AccountsServices.getAccounts(accountId, qs)
            .then( response => {
                dispatch({type: ActionTypes.GET_ACCOUNTS, payload: response.data});
            }).catch((error) => {
                if(error.response.data.indexOf('unable to retrieve plan') > -1) {
                    dispatch(showToastNotification('User\'s plan couldn\'t be retrieved' , 'fixed', 'error'))
                } else {
                    dispatch(showToastNotification('Couldn\'t get accounts list' , 'fixed', 'error'))
                }
            })
    }
}

export const impersonateAction = (accountId: string): ThunkDispatch<Promise<void>, {}, Impersonate> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, Impersonate>) => {
        await AccountsServices.impersonate(accountId)
            .then( response => {
                dispatch({type: ActionTypes.IMPERSONATE, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification('Couldn\'t impersonate account' , 'fixed', 'error'))
            })
    }
}

export type Action = GetAccounts
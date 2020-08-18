import { ActionTypes, AccountInfo, PutAccountInfo } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { AccountServices } from './service';

export interface GetAccountInfo {
    type: ActionTypes.GET_ACCOUNT_INFO;
    payload: AccountInfo;
}

export interface SaveAccountInfo {
    type: ActionTypes.SAVE_ACCOUNT_INFO;
    payload: AccountInfo;
}

export const getAccountInfoAction = (accountId: string): ThunkDispatch<Promise<void>, {}, GetAccountInfo> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetAccountInfo>) => {
        await AccountServices.getAccountInfo(accountId)
            .then( response => {
                dispatch({type: ActionTypes.GET_ACCOUNT_INFO, payload: {accountId: accountId, ...response.data}});
            }).catch(() => {

            })
    }
}

export const saveAccountInfoAction = (accountInfo: PutAccountInfo): ThunkDispatch<Promise<void>, {}, SaveAccountInfo> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, SaveAccountInfo>) => {
        await AccountServices.saveAccountInfo(accountInfo)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_ACCOUNT_INFO, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetAccountInfo | SaveAccountInfo
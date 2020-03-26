import { ActionTypes, Logs } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { AccountLogsService } from './service';

export interface GetAccountLogs {
    type: ActionTypes.GET_ACCOUNT_LOGS;
    payload: Logs[];
}

export const getAccountLogsAction = (accountId: string): ThunkDispatch<Promise<void>, {}, GetAccountLogs> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetAccountLogs>) => {
        await AccountLogsService.getAccountLogs(accountId)
            .then( response => {
                dispatch({type: ActionTypes.GET_ACCOUNT_LOGS, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetAccountLogs
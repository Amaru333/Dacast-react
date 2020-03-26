import { ActionTypes, WithdrawalInfo } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { EditWithdrawalServices } from './service';

export interface GetWithdrawalInfo {
    type: ActionTypes.GET_WITHDRAWAL_INFO;
    payload: WithdrawalInfo;
}

export interface SaveWithdrawalStatus {
    type: ActionTypes.SAVE_WITHDRAWAL_STATUS;
    payload: string;
}

export const getWithdrawalInfoAction = (withdrawalId: string): ThunkDispatch<Promise<void>, {}, GetWithdrawalInfo> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetWithdrawalInfo>) => {
        await EditWithdrawalServices.getWithdrawalInfo(withdrawalId)
            .then( response => {
                dispatch({type: ActionTypes.GET_WITHDRAWAL_INFO, payload: response.data});
            }).catch(() => {

            })
    }
}

export const saveWithdrawalStatusAction = (withdrawalId: string, withdrawalStatus: string): ThunkDispatch<Promise<void>, {}, SaveWithdrawalStatus> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, SaveWithdrawalStatus>) => {
        await EditWithdrawalServices.saveWithdrawalStatus(withdrawalId, withdrawalStatus)
            .then( response => {
                dispatch({type: ActionTypes.SAVE_WITHDRAWAL_STATUS, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetWithdrawalInfo | SaveWithdrawalStatus
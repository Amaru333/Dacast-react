import { ActionTypes, WithdrawalsList } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { WithdrawalsServices } from './services';
import { showToastNotification } from '../../Toasts';

export interface GetWithdrawals {
    type: ActionTypes.GET_WITHDRAWALS;
    payload: WithdrawalsList;
}

export const getWithdrawalsAction = (accountId: string): ThunkDispatch<Promise<void>, {}, GetWithdrawals> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetWithdrawals>) => {
        await WithdrawalsServices.getWithdrawals(accountId)
            .then( response => {
                dispatch({type: ActionTypes.GET_WITHDRAWALS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification('Couldn\'t get withdrawals list' , 'fixed', 'error'))
            })
    }
}

export type Action = GetWithdrawals
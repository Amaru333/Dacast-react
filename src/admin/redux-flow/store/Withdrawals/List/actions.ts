import { ActionTypes, Withdrawal } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { AdminState } from '../..';
import { WithdrawalsServices } from './services';

export interface GetWithdrawals {
    type: ActionTypes.GET_WITHDRAWALS;
    payload: { 
        data: {
            operations: Withdrawal[]
        }
    };
}

export const getWithdrawalsAction = (accountId: string): ThunkDispatch<Promise<void>, {}, GetWithdrawals> => {
    return async (dispatch: ThunkDispatch<AdminState, {}, GetWithdrawals>) => {
        await WithdrawalsServices.getWithdrawals(accountId)
            .then( response => {
                dispatch({type: ActionTypes.GET_WITHDRAWALS, payload: response.data});
            }).catch(() => {

            })
    }
}

export type Action = GetWithdrawals
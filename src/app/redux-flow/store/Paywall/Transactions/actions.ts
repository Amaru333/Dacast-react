import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, TransactionsInfo } from './types';
import { TransactionsServices } from './services';

export interface GetTransactions {
    type: ActionTypes.GET_TRANSACTIONS;
    payload: {data: TransactionsInfo};
}

export const getTransactionsAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetTransactions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetTransactions>) => {
        await TransactionsServices.getTransactions(qs)
            .then( response => {
                dispatch({type: ActionTypes.GET_TRANSACTIONS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export type Action = GetTransactions
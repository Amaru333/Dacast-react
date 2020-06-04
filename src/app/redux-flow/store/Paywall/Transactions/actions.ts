import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, TransactionsInfos } from './types';
import { TransactionsServices } from './services';

export interface GetTransactions {
    type: ActionTypes.GET_TRANSACTIONS;
    payload: {data: {transactionsList: TransactionsInfos;}};
}

export const getTransactionsAction = (): ThunkDispatch<Promise<void>, {}, GetTransactions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetTransactions>) => {
        await TransactionsServices.getTransactions()
            .then( response => {
                dispatch({type: ActionTypes.GET_TRANSACTIONS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export type Action = GetTransactions
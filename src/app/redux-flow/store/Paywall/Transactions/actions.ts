import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, TransactionsInfo } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetPaywallTransactionsInput } from './viewModel';

export interface GetTransactions {
    type: ActionTypes.GET_TRANSACTIONS;
    payload: TransactionsInfo;
}

export const getTransactionsAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetTransactions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetTransactions>) => {
        await dacastSdk.getPaywallTransactions(formatGetPaywallTransactionsInput(qs))
            .then( response => {
                dispatch({type: ActionTypes.GET_TRANSACTIONS, payload: response});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export type Action = GetTransactions
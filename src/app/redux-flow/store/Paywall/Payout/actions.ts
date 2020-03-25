import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PayoutInfos, PaymentMethodRequest, WithdrawalRequest } from './types';
import { PayoutServices } from './services';

export interface GetPayoutInfos {
    type: ActionTypes.GET_PAYOUT_INFOS;
    payload: PayoutInfos;
}

export interface AddPaymentMethodRequest {
    type: ActionTypes.ADD_PAYMENT_METHOD_REQUEST;
    payload: PaymentMethodRequest;
}

export interface DeletePaymentMethodRequest {
    type: ActionTypes.DELETE_PAYMENT_METHOD_REQUEST;
    payload: string;
}

export interface AddWithdrawalRequest {
    type: ActionTypes.ADD_WITHDRAWAL_REQUEST;
    payload: WithdrawalRequest;
}

export const getPayoutInfosAction = (): ThunkDispatch<Promise<void>, {}, GetPayoutInfos> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPayoutInfos>) => {
        await PayoutServices.getPayoutInfos()
            .then( response => {
                dispatch({type: ActionTypes.GET_PAYOUT_INFOS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const addPaymentMethodRequestAction = (data: PaymentMethodRequest): ThunkDispatch<Promise<void>, {}, AddPaymentMethodRequest> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddPaymentMethodRequest>) => {
        await PayoutServices.addPaymentMethodRequest(data)
            .then( response => {
                dispatch({type: ActionTypes.ADD_PAYMENT_METHOD_REQUEST, payload: response.data});
                dispatch(showToastNotification(`Withdrawl Method has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const deletePaymentMethodRequestAction = (data: string): ThunkDispatch<Promise<void>, {}, DeletePaymentMethodRequest> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePaymentMethodRequest>) => {
        await PayoutServices.deletePaymentMethodRequest(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PAYMENT_METHOD_REQUEST, payload: response.data});
                dispatch(showToastNotification(`Withdrawl Method has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const addWithdrawalRequestAction = (data: WithdrawalRequest): ThunkDispatch<Promise<void>, {}, AddWithdrawalRequest> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddWithdrawalRequest>) => {
        console.log('super bitch')
        await PayoutServices.addWithdrawalRequest(data)
            .then( response => {
                dispatch({type: ActionTypes.ADD_WITHDRAWAL_REQUEST, payload: response.data});
                dispatch(showToastNotification(`New Withdrawl Request submitted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}


export type Action = GetPayoutInfos | AddPaymentMethodRequest | DeletePaymentMethodRequest | AddWithdrawalRequest
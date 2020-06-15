import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PaymentMethod, WithdrawalRequest } from './types';
import { PayoutServices } from './services';

export interface GetPaymentMethods {
    type: ActionTypes.GET_PAYMENT_METHODS;
    payload: {data: {paymentMethods: PaymentMethod[]}};
}

export interface GetWithdrawalRequests {
    type: ActionTypes.GET_WITHDRAWAL_REQUESTS;
    payload: {data: {widthdrawals: WithdrawalRequest[]}};
}

export interface AddPaymentMethodRequest {
    type: ActionTypes.ADD_PAYMENT_METHOD_REQUEST;
    payload: PaymentMethod;
}

export interface DeletePaymentMethodRequest {
    type: ActionTypes.DELETE_PAYMENT_METHOD_REQUEST;
    payload: string;
}

export interface AddWithdrawalRequest {
    type: ActionTypes.ADD_WITHDRAWAL_REQUEST;
    payload: WithdrawalRequest;
}

export const getPaymentMethodsAction = (): ThunkDispatch<Promise<void>, {}, GetPaymentMethods> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPaymentMethods>) => {
        await PayoutServices.getPaymentMethods()
            .then( response => {
                dispatch({type: ActionTypes.GET_PAYMENT_METHODS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const getWithdrawalRequestsAction = (): ThunkDispatch<Promise<void>, {}, GetWithdrawalRequests> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetWithdrawalRequests>) => {
        await PayoutServices.getWithdrawalRequests()
            .then( response => {
                dispatch({type: ActionTypes.GET_WITHDRAWAL_REQUESTS, payload: response.data});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const addPaymentMethodRequestAction = (data: PaymentMethod): ThunkDispatch<Promise<void>, {}, AddPaymentMethodRequest> => {
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
        await PayoutServices.addWithdrawalRequest(data)
            .then( response => {
                dispatch({type: ActionTypes.ADD_WITHDRAWAL_REQUEST, payload: response.data});
                dispatch(showToastNotification(`New Withdrawl Request submitted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}


export type Action = GetPaymentMethods | GetWithdrawalRequests | AddPaymentMethodRequest | DeletePaymentMethodRequest | AddWithdrawalRequest
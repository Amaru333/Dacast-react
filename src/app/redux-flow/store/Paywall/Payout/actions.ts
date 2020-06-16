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

export interface AddPaymentMethod {
    type: ActionTypes.ADD_PAYMENT_METHOD;
    payload: PaymentMethod;
}

export interface UpdatePaymentMethod {
    type: ActionTypes.UPDATE_PAYMENT_METHOD;
    payload: PaymentMethod;
}

export interface DeletePaymentMethod {
    type: ActionTypes.DELETE_PAYMENT_METHOD;
    payload: PaymentMethod;
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

export const addPaymentMethodAction = (data: PaymentMethod): ThunkDispatch<Promise<void>, {}, AddPaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddPaymentMethod>) => {
        await PayoutServices.addPaymentMethod(data)
            .then( response => {
                dispatch({type: ActionTypes.ADD_PAYMENT_METHOD, payload: {...data, id: response.data.data.id}});
                dispatch(showToastNotification(`Withdrawl Method has been saved`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const updatePaymentMethodAction = (data: PaymentMethod): ThunkDispatch<Promise<void>, {}, UpdatePaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UpdatePaymentMethod>) => {
        await PayoutServices.deletePaymentMethod(data)
            .then( response => {
                dispatch({type: ActionTypes.UPDATE_PAYMENT_METHOD, payload: data});
                dispatch(showToastNotification(`Withdrawl Method has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
            })
    }
}

export const deletePaymentMethodAction = (data: PaymentMethod): ThunkDispatch<Promise<void>, {}, DeletePaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePaymentMethod>) => {
        await PayoutServices.deletePaymentMethod(data)
            .then( response => {
                dispatch({type: ActionTypes.DELETE_PAYMENT_METHOD, payload: data});
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


export type Action = GetPaymentMethods | GetWithdrawalRequests | AddPaymentMethod | UpdatePaymentMethod | DeletePaymentMethod | AddWithdrawalRequest
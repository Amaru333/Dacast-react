import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PaymentMethod, WithdrawalRequest } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetWithdrawalMethodsOutput, formatPostWithdrawalMethodInput, formatPutWithdrawalMethodInput, formatGetWithdrawalRequestsOutput, formatPostWithdrawalRequestInput, formatPutWithdrawalRequestInput } from './viewModel';

export interface GetPaymentMethods {
    type: ActionTypes.GET_PAYMENT_METHODS;
    payload: PaymentMethod[];
}

export interface GetWithdrawalRequests {
    type: ActionTypes.GET_WITHDRAWAL_REQUESTS;
    payload: WithdrawalRequest[];
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

export interface CancelWithdrawalRequest {
    type: ActionTypes.CANCEL_WITHDRAWAL_REQUEST;
    payload: WithdrawalRequest;
}

export const getPaymentMethodsAction = (): ThunkDispatch<Promise<void>, {}, GetPaymentMethods> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPaymentMethods>) => {
        await dacastSdk.getPaymentMethod()
            .then( response => {
                dispatch({type: ActionTypes.GET_PAYMENT_METHODS, payload: formatGetWithdrawalMethodsOutput(response)});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const getWithdrawalRequestsAction = (): ThunkDispatch<Promise<void>, {}, GetWithdrawalRequests> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetWithdrawalRequests>) => {
        await dacastSdk.getPaymentRequest()
            .then( response => {
                dispatch({type: ActionTypes.GET_WITHDRAWAL_REQUESTS, payload: formatGetWithdrawalRequestsOutput(response)});
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const addPaymentMethodAction = (data: PaymentMethod): ThunkDispatch<Promise<void>, {}, AddPaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddPaymentMethod>) => {
        await dacastSdk.postPaymentMethod(formatPostWithdrawalMethodInput(data))
            .then( response => {
                dispatch({type: ActionTypes.ADD_PAYMENT_METHOD, payload: {...data, id: response.id}});
                dispatch(showToastNotification(`Withdrawal Method has been created`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const updatePaymentMethodAction = (data: PaymentMethod): ThunkDispatch<Promise<void>, {}, UpdatePaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UpdatePaymentMethod>) => {
        await dacastSdk.putPaymentMethod(formatPutWithdrawalMethodInput(data))
            .then(() => {
                dispatch({type: ActionTypes.UPDATE_PAYMENT_METHOD, payload: data});
                dispatch(showToastNotification(`Withdrawal Method has been edited`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const deletePaymentMethodAction = (data: PaymentMethod): ThunkDispatch<Promise<void>, {}, DeletePaymentMethod> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePaymentMethod>) => {
        await dacastSdk.deletePaymentMethod(data.id)
            .then(() => {
                dispatch({type: ActionTypes.DELETE_PAYMENT_METHOD, payload: data});
                dispatch(showToastNotification(`Withdrawal Method has been deleted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const addWithdrawalRequestAction = (data: WithdrawalRequest): ThunkDispatch<Promise<void>, {}, AddWithdrawalRequest> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddWithdrawalRequest>) => {
        await dacastSdk.postPaymentRequest(formatPostWithdrawalRequestInput(data))
            .then( response => {
                dispatch({type: ActionTypes.ADD_WITHDRAWAL_REQUEST, payload: {...data, id: response.id}});
                dispatch(showToastNotification(`New Withdrawal Request submitted`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}

export const cancelWithdrawalRequestAction = (data: WithdrawalRequest): ThunkDispatch<Promise<void>, {}, CancelWithdrawalRequest> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, CancelWithdrawalRequest>) => {
        await dacastSdk.putPaymentRequest(formatPutWithdrawalRequestInput({...data, status: 'Cancelled'}))
            .then(() => {
                dispatch({type: ActionTypes.CANCEL_WITHDRAWAL_REQUEST, payload: {...data, status: 'Cancelled'}});
                dispatch(showToastNotification(`Withdrawal Request cancelled`, 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', 'error'));
                return Promise.reject()
            })
    }
}


export type Action = GetPaymentMethods | GetWithdrawalRequests | AddPaymentMethod | UpdatePaymentMethod | DeletePaymentMethod | AddWithdrawalRequest | CancelWithdrawalRequest
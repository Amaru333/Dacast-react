import { ActionTypes, PaymentMethod, WithdrawalRequest } from './types';
import { dacastSdk } from '../../../../utils/services/axios/axiosClient';
import { formatGetWithdrawalMethodsOutput, formatPostWithdrawalMethodInput, formatPutWithdrawalMethodInput, formatGetWithdrawalRequestsOutput, formatPostWithdrawalRequestInput, formatPutWithdrawalRequestInput, formatPostWithdrawalMethodOuput, formatPostWithdrawalRequestOuput, formatDeleteWithdrawalMethodInput, formatGetPaywallBalanceOutput } from './viewModel';
import { applyViewModel } from '../../../../utils/utils';

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

export interface GetPaywallBalance {
    type: ActionTypes.GET_PAYWALL_BALANCE;
    payload: number;
}

export type Action = GetPaymentMethods | GetWithdrawalRequests | AddPaymentMethod | UpdatePaymentMethod | DeletePaymentMethod | AddWithdrawalRequest | CancelWithdrawalRequest | GetPaywallBalance

export const getPaymentMethodsAction = applyViewModel(dacastSdk.getPaymentMethod, null, formatGetWithdrawalMethodsOutput, ActionTypes.GET_PAYMENT_METHODS, null, 'Couldn\'t get withdrawal methods')
export const addPaymentMethodAction = applyViewModel(dacastSdk.postPaymentMethod, formatPostWithdrawalMethodInput, formatPostWithdrawalMethodOuput, ActionTypes.ADD_PAYMENT_METHOD, 'Withdrawal Method has been created', 'Couldn\'t create withdrawal method')
export const updatePaymentMethodAction = applyViewModel(dacastSdk.putPaymentMethod, formatPutWithdrawalMethodInput, null, ActionTypes.UPDATE_PAYMENT_METHOD, 'Withdrawal Method has been edited', 'Couldn\'t edit withdrawal method')
export const deletePaymentMethodAction = applyViewModel(dacastSdk.deletePaymentMethod, formatDeleteWithdrawalMethodInput, null, ActionTypes.DELETE_PAYMENT_METHOD, 'Withdrawal Method has been deleted', 'Couldn\'t delete withdrawal method')

export const getWithdrawalRequestsAction = applyViewModel(dacastSdk.getPaymentRequest, null, formatGetWithdrawalRequestsOutput, ActionTypes.GET_WITHDRAWAL_REQUESTS, null, 'Couldn\'t get withdrawal requests')
export const addWithdrawalRequestAction = applyViewModel(dacastSdk.postPaymentRequest, formatPostWithdrawalRequestInput, formatPostWithdrawalRequestOuput, ActionTypes.ADD_WITHDRAWAL_REQUEST, 'New Withdrawal Request submitted', 'Couldn\'t submit withdrawal request')
export const cancelWithdrawalRequestAction = applyViewModel(dacastSdk.putPaymentRequest, formatPutWithdrawalRequestInput, null, ActionTypes.CANCEL_WITHDRAWAL_REQUEST, 'Withdrawal Request cancelled', 'Couldn\'t cancel withdrawal request')
export const getPaywallBalanceAction = applyViewModel(dacastSdk.getPaywallBalance, undefined, formatGetPaywallBalanceOutput, ActionTypes.GET_PAYWALL_BALANCE, null, 'Couldn\'t get paywall balance')
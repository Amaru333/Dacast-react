import axios from 'axios';
import { PaymentMethodRequest, WithdrawalRequest } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPayoutInfos = () => {
    return axios.get(urlBase + 'paywall-payout');
}

const addPaymentMethodRequest = (data: PaymentMethodRequest) => {
    return axios.post(urlBase + 'paywall-payout-payment-method-request', {data: data});
}

const deletePaymentMethodRequest = (data: string) => {
    return axios.delete(urlBase + 'paywall-payout-payment-method-request', {data: data});
}

const addWithdrawalRequest = (data: WithdrawalRequest) => {
    return axios.post(urlBase + 'paywall-payout-withdrawal-request', {data: data});
}

export const PayoutServices = {
    getPayoutInfos,
    addPaymentMethodRequest,
    deletePaymentMethodRequest,
    addWithdrawalRequest
}
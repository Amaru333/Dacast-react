import axios from 'axios';
import { PaymentMethod, WithdrawalRequest } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPaymentMethods = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.API_BASE_URL + '/paywall/payment-methods', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getWithdrawalRequests = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.API_BASE_URL + '/paywall/payment-requests', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const addPaymentMethodRequest = (data: PaymentMethod) => {
    return axios.post(urlBase + 'paywall-payout-payment-method-request', {data: data});
}

const deletePaymentMethodRequest = (data: string) => {
    return axios.delete(urlBase + 'paywall-payout-payment-method-request', {data: data});
}

const addWithdrawalRequest = (data: WithdrawalRequest) => {
    return axios.post(urlBase + 'paywall-payout-withdrawal-request', {data: data});
}

export const PayoutServices = {
    getPaymentMethods,
    getWithdrawalRequests,
    addPaymentMethodRequest,
    deletePaymentMethodRequest,
    addWithdrawalRequest
}
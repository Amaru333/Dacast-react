import axios from 'axios';
import { PaymentMethod, WithdrawalRequest } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

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

const addPaymentMethod = async (data: PaymentMethod) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.post(process.env.API_BASE_URL + '/paywall/payment-methods', 
        {
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const updatePaymentMethod = async (data: PaymentMethod) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.put(process.env.API_BASE_URL + '/paywall/payment-methods/' + data.id, 
        {
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deletePaymentMethod = async (data: PaymentMethod) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.API_BASE_URL + '/paywall/payment-requests/' + data.id, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const addWithdrawalRequest = async (data: WithdrawalRequest) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.post(process.env.API_BASE_URL + '/paywall/payment-requests', 
        {
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const PayoutServices = {
    getPaymentMethods,
    getWithdrawalRequests,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    addWithdrawalRequest
}
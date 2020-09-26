import { PaymentMethod, WithdrawalRequest } from './types';
import { axiosClient } from '../../../../utils/axiosClient';

const getPaymentMethods = async () => {
    return await axiosClient.get('/paywall/payment-methods')
}

const getWithdrawalRequests = async () => {
    return await axiosClient.get('/paywall/payment-requests')
}

const addPaymentMethod = async (data: PaymentMethod) => {
    return await axiosClient.post('/paywall/payment-methods', 
        {
            ...data
        }
    )
}

const updatePaymentMethod = async (data: PaymentMethod) => {
    return await axiosClient.put('/paywall/payment-methods/' + data.id, 
        {
            ...data
        }
    )
}

const deletePaymentMethod = async (data: PaymentMethod) => {
    return await axiosClient.delete('/paywall/payment-methods/' + data.id)
}

const addWithdrawalRequest = async (data: WithdrawalRequest) => {
    let parsedData = {...data}

    delete parsedData.status
    return await axiosClient.post('/paywall/payment-requests', 
        {
            ...parsedData
        }
    )
}

const cancelWithdrawalRequest = async (data: WithdrawalRequest) => {
    return await axiosClient.put(`/paywall/payment-requests/${data.id}`, {
        ...data,
        status: 'cancelled'
    })
}

export const PayoutServices = {
    getPaymentMethods,
    getWithdrawalRequests,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    addWithdrawalRequest,
    cancelWithdrawalRequest
}
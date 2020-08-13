import { axiosClient } from '../../../../utils/axiosClient'

const getTransactions = async () => {
    return await axiosClient.get('/paywall/transactions/')
}

export const TransactionsServices = {
    getTransactions
}
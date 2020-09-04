import { axiosClient } from '../../../../utils/axiosClient'

const getTransactions = async (qs: string) => {
    return await axiosClient.get('/paywall/transactions/')
}

export const TransactionsServices = {
    getTransactions
}
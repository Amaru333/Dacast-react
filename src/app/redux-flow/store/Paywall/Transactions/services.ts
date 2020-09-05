import { axiosClient } from '../../../../utils/axiosClient'

const formatQsToEndpoint = (qs: string) => {
    console.log(Object.fromEntries(new URLSearchParams(qs)))
    let objectFromQs = Object.fromEntries(new URLSearchParams(qs))
    let endpointsQs = `page=${objectFromQs.page}&per-page=${objectFromQs.perPage}&sort-by=${objectFromQs.sortBy}` + (objectFromQs.keyword ? `&keyword=${objectFromQs.keyword}` : '')
    if(objectFromQs.afterDate || objectFromQs.beforeDate) {
        endpointsQs+= `&created-at=${objectFromQs.afterDate ? objectFromQs.afterDate : ''},${objectFromQs.beforeDate ? objectFromQs.beforeDate : ''}`
    }

    return endpointsQs
}

const getTransactions = async (qs: string) => {
    console.log(Object.fromEntries(new URLSearchParams(qs)))
    return await axiosClient.get('/paywall/transactions/')
}

export const TransactionsServices = {
    getTransactions
}
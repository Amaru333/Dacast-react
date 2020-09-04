import { axiosClient } from '../../../../utils/axiosClient'

const formatQsToEndpoint = (qs: string) => {
    console.log(Object.fromEntries(new URLSearchParams(qs)))
    let objectFromQs = Object.fromEntries(new URLSearchParams(qs))
    let endpointsQs = `page=${objectFromQs.page}&per-page=${objectFromQs.perPage}&status=${objectFromQs.status}&sort-by=${objectFromQs.sortBy}` + (objectFromQs.keyword ? `&keyword=${objectFromQs.keyword}` : '') + (objectFromQs.features ? `&features=${objectFromQs.features}` : '')
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
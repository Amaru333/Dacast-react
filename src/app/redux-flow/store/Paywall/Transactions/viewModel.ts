import { TransactionsInfo } from './types'

export const formatGetPaywallTransactionsInput = (qs: string) => {
    let objectFromQs = Object.fromEntries(new URLSearchParams(qs))
    let endpointsQs = `page=${objectFromQs.page - 1}&per-page=${objectFromQs.perPage}&sort-by=${objectFromQs.sortBy}` + (objectFromQs.keyword ? `&note-contains=${objectFromQs.keyword}` : '') + (objectFromQs.type ? `&action-type=${objectFromQs.type}` : '') + (objectFromQs.currency ? `&currencies=${objectFromQs.currency}` : '')
    if(objectFromQs.afterDate || objectFromQs.beforeDate) {
        endpointsQs+= `&created-at=${objectFromQs.afterDate ? objectFromQs.afterDate : ''},${objectFromQs.beforeDate ? objectFromQs.beforeDate : ''}`
    }

    return endpointsQs
}
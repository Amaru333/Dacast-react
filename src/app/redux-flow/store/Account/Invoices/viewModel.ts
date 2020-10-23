import { SearchInvoicesResult } from './types'
import { GetInvoicesOutput } from '../../../../../DacastSdk/account'

export const formatGetInvoicesInput = (qs: string) => {
    let objectFromQs = Object.fromEntries(new URLSearchParams(qs))
    let endpointsQs = `page=${objectFromQs.page ? (objectFromQs.page): 1}&per-page=${objectFromQs.perPage || 20}&sort-by=created-date` + (objectFromQs.sortBy && objectFromQs.sortBy.indexOf('desc') > -1 ? '&sort-order=desc' : '&sort-order=asc') + (objectFromQs.status ? `&status=${objectFromQs.status}` : '')
    if(objectFromQs.afterDate) {
        endpointsQs+= `&created-after=${objectFromQs.afterDate}`
    }

    if(objectFromQs.beforeDate) {
        endpointsQs+= `&created-before=${objectFromQs.beforeDate}`
    }

    return endpointsQs
}

export const formatGetInvoicesOutput = (data: GetInvoicesOutput): SearchInvoicesResult => {
    let formattedData: SearchInvoicesResult = {
        page: data.page,
        perPage: data.perPage,
        total: data.total,
        invoices: data.invoices
    }

    return formattedData
}
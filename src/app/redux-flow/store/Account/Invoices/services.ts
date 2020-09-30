import { userToken } from '../../../../utils/services/token/tokenService'
import { axiosClient } from '../../../../utils/services/axios/axiosClient'

const formatQsToEndpoint = (qs: string) => {
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

const getInvoices = async (qs: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/billing/invoices?' + formatQsToEndpoint(qs))
}

export const InvoicesServices = {
    getInvoices
}
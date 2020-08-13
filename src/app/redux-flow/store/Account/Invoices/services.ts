import { userToken } from '../../../../utils/token'
import { axiosClient } from '../../../../utils/axiosClient'

const getInvoices = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/billing/invoices')
}

export const InvoicesServices = {
    getInvoices
}
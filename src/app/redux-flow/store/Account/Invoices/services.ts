import { userToken } from '../../../../utils/services/token/tokenService'
import { axiosClient } from '../../../../utils/services/axios/axiosClient'

const getInvoices = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/billing/invoices')
}

export const InvoicesServices = {
    getInvoices
}
import { axiosClient } from '../../../../utils/services/axios/adminAxiosClient'

const getWithdrawals = async (qs: string) => {  
    return await axiosClient.get('/payment-requests' + (qs ? '?' + qs : '?page=0&perPage=10'))
}

export const WithdrawalsServices = {
    getWithdrawals
}
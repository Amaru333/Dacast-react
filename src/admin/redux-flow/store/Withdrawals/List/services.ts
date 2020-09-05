import axios from 'axios'
import { axiosClient } from '../../../../utils/adminAxiosClient'

const getWithdrawals = async (qs: string) => {  
    return await axiosClient.get('/payment-requests' + (qs ? qs : '?page=0&perPage=10'))
}

export const WithdrawalsServices = {
    getWithdrawals
}
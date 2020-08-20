import axios from 'axios'
import { axiosClient } from '../../../../utils/adminAxiosClient'

const getWithdrawals = async (accountId: string) => {  
    return await axiosClient.get('/' + (accountId ? ('paywall?accountId=' + accountId) : 'paywall'))
}

export const WithdrawalsServices = {
    getWithdrawals
}
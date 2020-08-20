import axios from 'axios'
import { axiosClient } from '../../../../utils/adminAxiosClient'

const getBalances = (accountId: string) => {  
    return axiosClient.get('/admin/paywall/balances?accountId=' + accountId)
}

export const BalancesServices = {
    getBalances
}
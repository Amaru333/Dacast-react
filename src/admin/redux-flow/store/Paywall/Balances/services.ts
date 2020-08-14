import axios from 'axios'

const getBalances = (accountId: string) => {  
    return axios.get(process.env.ADMIN_API_BASE_URL   + '/admin/paywall/balances?accountId=' + accountId)
}

export const BalancesServices = {
    getBalances
}
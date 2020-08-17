import axios from 'axios'

const getAccountAllowances = (accountId: string) => {  
    return axios.get(process.env.ADMIN_API_BASE_URL   + '/credit/' + accountId)
}

const saveAccountAllowances = (accountInfo: {[key: string]: string}, accountId: string) => {  
    return axios.post(process.env.ADMIN_API_BASE_URL   + '/credit/' + accountId  , {data: accountInfo})
}

export const AccountAllowancesServices = {
    getAccountAllowances,
    saveAccountAllowances
}
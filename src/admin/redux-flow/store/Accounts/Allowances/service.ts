import axios from 'axios'

const adminApiUrlBase = 'https://singularity-api-admin.dacast.com/'

const getAccountAllowances = (accountId: string) => {  
    return axios.get(adminApiUrlBase   + 'credit/' + accountId)
}

const saveAccountAllowances = (accountInfo: {[key: string]: string}, accountId: string) => {  
    return axios.post(adminApiUrlBase   + 'admin/account/' + accountId + '/allowances' , {data: accountInfo})
}

export const AccountAllowancesServices = {
    getAccountAllowances,
    saveAccountAllowances
}
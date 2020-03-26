import axios from 'axios'

const adminApiUrlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/'

const getAccountAllowances = (accountId: string) => {  
    return axios.get(adminApiUrlBase   + 'admin/account/' + accountId + '/allowances')
}

const saveAccountAllowances = (accountInfo: {[key: string]: string}, accountId: string) => {  
    return axios.post(adminApiUrlBase   + 'admin/account/' + accountId + '/allowances' , {data: accountInfo})
}

export const AccountAllowancesServices = {
    getAccountAllowances,
    saveAccountAllowances
}
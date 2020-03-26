import axios from 'axios'
import { AccountInfo } from './types'

const adminApiUrlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/'

const getAccountInfo = (accountId: string) => {  
    return axios.get(adminApiUrlBase   + 'admin/account/' + accountId + '/info')
}

const saveAccountInfo = (accountInfo: AccountInfo) => {  
    return axios.post(adminApiUrlBase   + 'admin/account/' + accountInfo.id + '/info' , {data: accountInfo})
}

export const AccountServices = {
    getAccountInfo,
    saveAccountInfo
}
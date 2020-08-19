import axios from 'axios'
import { PutAllowances } from './types'

const getAccountAllowances = (accountId: string) => {  
    return axios.get(process.env.ADMIN_API_BASE_URL   + '/credits/' + accountId)
}

const saveAccountAllowances = (accountInfo: PutAllowances, accountId: string) => {  
    return axios.post(process.env.ADMIN_API_BASE_URL   + '/credits/' + accountId + '/add'  , {data: accountInfo})
}

export const AccountAllowancesServices = {
    getAccountAllowances,
    saveAccountAllowances
}
import axios from 'axios'
import { PutAllowances } from './types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token'

const getAccountAllowances = async (accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.ADMIN_API_BASE_URL   + '/credits/' + accountId, {
        headers: {
            Authorization: token
        }
    })
}

const saveAccountAllowances = async (accountInfo: PutAllowances, accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.ADMIN_API_BASE_URL   + '/credits/' + accountId + '/add'  , 
    {...accountInfo}, 
    {
        headers: {
            Authorization: token
        }
    })
}

export const AccountAllowancesServices = {
    getAccountAllowances,
    saveAccountAllowances
}
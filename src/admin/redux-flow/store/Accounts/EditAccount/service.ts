import axios from 'axios'
import { PutAccountInfo } from './types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token'

const getAccountInfo = async (accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.ADMIN_API_BASE_URL   + '/accounts/' + accountId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveAccountInfo = async (accountInfo: PutAccountInfo, accountId: string) => { 
    await isTokenExpired()
    let {token} = addTokenToHeader() 
    return await axios.put(process.env.ADMIN_API_BASE_URL   + '/accounts/' + accountId, 
        {
            ...accountInfo
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const AccountServices = {
    getAccountInfo,
    saveAccountInfo
}
import axios from 'axios'
import { AccountInfo } from './types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token'

const getAccountInfo = async (accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.ADMIN_API_BASE_URL   + '/accounts' + accountId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveAccountInfo = async (accountInfo: AccountInfo) => { 
    await isTokenExpired()
    let {token} = addTokenToHeader() 
    return await axios.put(process.env.ADMIN_API_BASE_URL   + '/accounts/' + accountInfo.id, 
        {
            data: accountInfo
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
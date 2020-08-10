import axios from 'axios'
import { AccountInfo } from './types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token'

const adminApiUrlBase = 'https://singularity-api-admin.dacast.com/'

const getAccountInfo = async (accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(adminApiUrlBase   + 'accounts' + accountId, 
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
    return await axios.put(adminApiUrlBase   + 'accounts/' + accountInfo.id, 
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
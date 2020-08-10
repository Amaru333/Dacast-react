import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const adminApiUrlBase = 'https://singularity-api-admin.dacast.com/'

const getAccounts = async (accountId: string) => { 
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(adminApiUrlBase + (accountId ? ('accounts?accountId=' + accountId) : 'accounts'),
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const impersonate = async (accountId: string) => { 
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.post(adminApiUrlBase + `impersonate/${accountId}`,
        {
            
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const AccountsServices = {
    getAccounts,
    impersonate
}
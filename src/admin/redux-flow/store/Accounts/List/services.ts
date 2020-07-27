import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const adminApiUrlBase = 'https://singularity-api-admin.dacast.com/'

const getAccounts = async (accountId: string) => { 
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.get(adminApiUrlBase + (accountId ? ('list-accounts?accountId=' + accountId) : 'list-accounts'),
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const impersonate = async (accountId: string) => { 
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.post(adminApiUrlBase + (accountId ? ('list-accounts?accountId=' + accountId) : 'list-accounts'),
        {
            userEmail: accountId
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
import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getAccounts = async (accountId: string, qs: string) => { 
    await isTokenExpired()
    let {token} = addTokenToHeader()
    let url = accountId ? process.env.ADMIN_API_BASE_URL + '/accounts/' +  accountId : process.env.ADMIN_API_BASE_URL + '/accounts'
    return await axios.get(url + (qs ? '?' + qs :  '?perPage=10&page=0'),
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
    return await axios.post(process.env.ADMIN_API_BASE_URL + '/impersonate',
        {
            userIdentifier: accountId
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
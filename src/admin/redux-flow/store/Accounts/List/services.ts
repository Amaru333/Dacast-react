import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getAccounts = async (accountId: string) => { 
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.ADMIN_API_BASE_URL + '/' + (accountId ? ('accounts?accountId=' + accountId) : 'accounts'),
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
    return await axios.post(process.env.ADMIN_API_BASE_URL + `/impersonate/${accountId}`,
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
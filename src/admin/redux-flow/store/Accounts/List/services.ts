import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const adminApiUrlBase = 'https://x2dp01bwp9.execute-api.us-east-1.amazonaws.com/singularity/'

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

export const AccountsServices = {
    getAccounts
}
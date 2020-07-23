import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const adminApiUrlBase = 'https://singularity-api-admin.dacast.com/'

const getWithdrawals = async (accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.get(adminApiUrlBase + (accountId ? ('paywall?accountId=' + accountId) : 'paywall'), 
    {
        headers: {
            Authorization: token
        }
    }
    )
}

export const WithdrawalsServices = {
    getWithdrawals
}
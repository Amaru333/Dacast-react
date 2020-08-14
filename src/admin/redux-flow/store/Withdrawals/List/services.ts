import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getWithdrawals = async (accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.get(process.env.ADMIN_API_BASE_URL + '/' + (accountId ? ('paywall?accountId=' + accountId) : 'paywall'), 
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
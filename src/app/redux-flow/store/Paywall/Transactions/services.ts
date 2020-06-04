import axios from 'axios';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getTransactions = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/transactions/' , 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const TransactionsServices = {
    getTransactions
}
import axios from 'axios';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getInvoices = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/billing/invoices', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const InvoicesServices = {
    getInvoices
}
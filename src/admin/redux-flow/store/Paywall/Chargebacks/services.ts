import axios from 'axios'
import { Chargeback } from './types'
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token'

const submitChargeback = async (data: Chargeback) => {  
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return await axios.post(process.env.ADMIN_API_BASE_URL   + '/add-transaction/' + userId, 
        {
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const ChargebackServices = {
    submitChargeback
}
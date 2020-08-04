import axios from 'axios'
import { Chargeback } from './types'
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token'

const adminApiUrlBase = 'https://singularity-api-admin.dacast.com/'

const submitChargeback = async (data: Chargeback) => {  
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return await axios.post(adminApiUrlBase   + 'add-transaction/' + userId, 
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
import axios from 'axios'
import { Chargeback } from './types'

const adminApiUrlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/'

const submitChargeback = (data: Chargeback) => {  
    return axios.post(adminApiUrlBase   + 'admin/paywall/chargeback', {...data})
}

export const ChargebackServices = {
    submitChargeback
}
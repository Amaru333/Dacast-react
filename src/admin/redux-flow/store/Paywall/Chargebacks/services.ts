import axios from 'axios'
import { Chargeback } from './types'
import { axiosClient } from '../../../../utils/adminAxiosClient'

const submitChargeback = async (data: Chargeback) => {  
    return await axiosClient.post('/add-transaction/', {...data})
}

export const ChargebackServices = {
    submitChargeback
}
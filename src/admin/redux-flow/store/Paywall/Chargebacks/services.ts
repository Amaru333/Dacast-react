import { Chargeback } from './types'
import { axiosClient } from '../../../../utils/services/axios/adminAxiosClient'

const submitChargeback = async (data: Chargeback) => {  
    return await axiosClient.post('/paywall-transactions', {...data})
}

export const ChargebackServices = {
    submitChargeback
}
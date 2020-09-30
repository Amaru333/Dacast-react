import { axiosClient } from '../../../../utils/services/axios/adminAxiosClient'

const getBalances = (qs: string) => {  
    return axiosClient.get('/paywall-transactions?' + qs)
}

export const BalancesServices = {
    getBalances
}
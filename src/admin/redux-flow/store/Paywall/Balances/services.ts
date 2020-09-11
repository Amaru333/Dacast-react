import { axiosClient } from '../../../../utils/adminAxiosClient'

const getBalances = (qs: string) => {  
    return axiosClient.get('/paywall-transactions?' + qs)
}

export const BalancesServices = {
    getBalances
}
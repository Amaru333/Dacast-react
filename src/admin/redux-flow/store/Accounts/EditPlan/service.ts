import { PlanInfoPut } from './types'
import { axiosClient } from '../../../../utils/adminAxiosClient'

const getAccountPlan = async (accountId: string) => {  
    return await axiosClient.get('/privileges/' + accountId)
}

const saveAccountPlan = async (accountId: string, planInfo: PlanInfoPut) => {  
    return await axiosClient.put('/privileges/' + accountId, {...planInfo})
}

const switchAccountPlan = (accountId: string, newPlan: string) => {  
    return axiosClient.put('admin/accounts/' + accountId + '/plan/switch', {data: newPlan})
}

export const PlansServices = {
    getAccountPlan,
    saveAccountPlan,
    switchAccountPlan
}
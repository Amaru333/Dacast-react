import axios from 'axios'
import { PlanInfoPut } from './types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token'

const getAccountPlan = async (accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.get(process.env.ADMIN_API_BASE_URL   + '/privileges/' + accountId, 
    {
        headers: {
            Authorization: token
        }
    })
}

const saveAccountPlan = async (accountId: string, planInfo: PlanInfoPut) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.put(process.env.ADMIN_API_BASE_URL + '/privileges/' + accountId, 
    {
        ...planInfo
    },
    {
        headers: {
            Authorization: token
        }
    })
}

const switchAccountPlan = (accountId: string, newPlan: string) => {  
    return axios.put(process.env.ADMIN_API_BASE_URL   + 'admin/accounts/' + accountId + '/plan/switch', {data: newPlan})
}

export const PlansServices = {
    getAccountPlan,
    saveAccountPlan,
    switchAccountPlan
}
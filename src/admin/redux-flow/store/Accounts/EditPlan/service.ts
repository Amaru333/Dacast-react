import axios from 'axios'
import { PlanInfo } from './types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token'

const adminApiUrlBase = 'https://singularity-api-admin.dacast.com/'

const getAccountPlan = async (accountId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.get(adminApiUrlBase   + 'privileges/' + accountId, 
    {
        headers: {
            Authorization: token
        }
    })
}

const saveAccountPlan = (accountId: string, planInfo: PlanInfo) => {  
    return axios.put(adminApiUrlBase   + 'admin/accounts/' + accountId + '/plan', {...planInfo})
}

const switchAccountPlan = (accountId: string, newPlan: string) => {  
    return axios.put(adminApiUrlBase   + 'admin/accounts/' + accountId + '/plan/switch', {data: newPlan})
}

export const PlansServices = {
    getAccountPlan,
    saveAccountPlan,
    switchAccountPlan
}
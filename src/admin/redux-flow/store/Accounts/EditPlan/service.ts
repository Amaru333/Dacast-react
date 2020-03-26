import axios from 'axios'
import { PlanInfo } from './types'

const adminApiUrlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/'

const getAccountPlan = (accountId: string) => {  
    return axios.get(adminApiUrlBase   + 'admin/accounts/' + accountId + '/plan')
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
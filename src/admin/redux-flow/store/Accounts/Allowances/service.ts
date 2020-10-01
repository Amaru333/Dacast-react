import axios from 'axios'
import { PutAllowances } from './types'
import { axiosClient } from '../../../../utils/services/axios/adminAxiosClient'

const getAccountAllowances = async (accountId: string) => {  
    return axiosClient.get('/credits/' + accountId)
}

const saveAccountAllowances = async (accountInfo: PutAllowances, accountId: string) => {  
    return axiosClient.post('/credits/' + accountId + '/add',{...accountInfo})
}

export const AccountAllowancesServices = {
    getAccountAllowances,
    saveAccountAllowances
}
import axios from 'axios'
import { PutAccountInfo } from './types'
import { axiosClient } from '../../../../utils/adminAxiosClient'

const getAccountInfo = async (accountId: string) => {  
    return await axiosClient.get('/accounts/' + accountId)
}

const saveAccountInfo = async (accountInfo: PutAccountInfo, accountId: string) => { 
    return await axiosClient.put('/accounts/' + accountId, {...accountInfo})
}

export const AccountServices = {
    getAccountInfo,
    saveAccountInfo
}
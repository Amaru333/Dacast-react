import axios from 'axios'
import { axiosClient } from '../../../../utils/adminAxiosClient';

const getWithdrawalInfo = async (withdrawalId: string) => {  
    return await axiosClient.get('/paywall/withdrawal/' + withdrawalId)
}

const saveWithdrawalStatus = (withdrawalId: string, withdrawalStatus: string) => {  
    return axiosClient.post('/admin/withdrawal/' + withdrawalId + '/info' , {data: withdrawalStatus})
}

export const EditWithdrawalServices = {
    getWithdrawalInfo,
    saveWithdrawalStatus
}
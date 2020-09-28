import axios from 'axios'
import { axiosClient } from '../../../../utils/services/axios/adminAxiosClient';

const getWithdrawalInfo = async (withdrawalId: string) => {  
    return await axiosClient.get('/payment-requests/' + withdrawalId)
}

const saveWithdrawalStatus = (withdrawalId: string, withdrawalStatus: string) => {  
    return axiosClient.put('/payment-requests/' + withdrawalId , {status: withdrawalStatus})
}

export const EditWithdrawalServices = {
    getWithdrawalInfo,
    saveWithdrawalStatus
}
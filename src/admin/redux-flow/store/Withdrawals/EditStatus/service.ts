import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const adminApiUrlBase = 'https://singularity-api-admin.dacast.com/'

const getWithdrawalInfo = async (withdrawalId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.get(adminApiUrlBase   + 'paywall/withdrawal/' + withdrawalId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveWithdrawalStatus = (withdrawalId: string, withdrawalStatus: string) => {  
    return axios.post(adminApiUrlBase   + 'admin/withdrawal/' + withdrawalId + '/info' , {data: withdrawalStatus})
}

export const EditWithdrawalServices = {
    getWithdrawalInfo,
    saveWithdrawalStatus
}
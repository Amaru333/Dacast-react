import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getWithdrawalInfo = async (withdrawalId: string) => {  
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return await axios.get(process.env.ADMIN_API_BASE_URL   + '/paywall/withdrawal/' + withdrawalId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveWithdrawalStatus = (withdrawalId: string, withdrawalStatus: string) => {  
    return axios.post(process.env.ADMIN_API_BASE_URL   + '/admin/withdrawal/' + withdrawalId + '/info' , {data: withdrawalStatus})
}

export const EditWithdrawalServices = {
    getWithdrawalInfo,
    saveWithdrawalStatus
}
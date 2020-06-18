import axios from 'axios'
import { ChangePlan } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getPlanDetailsService = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return await axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/plans', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const changeActivePlanService = async (data: ChangePlan) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.post(process.env.API_BASE_URL + '/accounts/' + userId + '/plans/purchase', 
        {
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const PlansServices = {
    getPlanDetailsService,
    changeActivePlanService
}
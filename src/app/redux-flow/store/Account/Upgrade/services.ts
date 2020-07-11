import axios from 'axios'
import { Plan } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getPlanDetailsService = async () => {
    await isTokenExpired()
    let { token, userId } = addTokenToHeader();
    return await axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/plans',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const purchasePlanService = async (data: Plan, recurlyToken: any, token3Ds?: string) => {
    await isTokenExpired()
    let { token, userId } = addTokenToHeader();
    return await axios.post(process.env.API_BASE_URL + '/accounts/' + userId + '/plans/purchase',
        {
            planCode: data.code,
            token: recurlyToken,
            currency: 'USD',
            couponCode: '',
            allowances: data.allownaceCode,
            threeDSecureToken: token3Ds ? token3Ds : undefined,
            paidPrivileges: data.privileges ? data.privileges.map((privilege) => { return privilege.checked ? { code: privilege.code, quantity: 1 } : null }).filter(f => f) : null
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const UpgradeServices = {
    getPlanDetailsService,
    purchasePlanService
}
import axios from 'axios'
import { Plan } from './types';
import { userToken } from '../../../../utils/services/token/tokenService';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getPlanDetailsService = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/plans')
}

const purchasePlanService = async (data: Plan, recurlyToken: any, token3Ds?: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.post('/accounts/' + userId + '/plans/purchase',
        {
            planCode: data.code,
            token: recurlyToken,
            currency: 'USD',
            couponCode: '',
            allowances: data.allownaceCode,
            threeDSecureToken: token3Ds ? token3Ds : undefined,
            paidPrivileges: data.privileges ? data.privileges.map((privilege) => { return data.selectedPrivileges && data.selectedPrivileges.includes(privilege.code) ? { code: privilege.code, quantity: 1 } : null }).filter(f => f) : null
        }
    )
}

export const UpgradeServices = {
    getPlanDetailsService,
    purchasePlanService
}
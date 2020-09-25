import { PlaybackProtection, Extras } from './types';
import { userToken } from '../../../../utils/token';
import { axiosClient } from '../../../../utils/axiosClient';

const getBillingPagePaymentMethodService = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/billing')
}

const saveBillingPagePaymentMethodService = async (data: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.post('/accounts/' + userId + '/billing/payment-method', 
        {
            token: data
        }
    )
}

const addBillingPagePaymenPlaybackProtectionService = async (enabled: boolean, amount: number) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/billing/playback-protection', 
        {
            enabled: enabled,
            amount: amount
        }
    )
}

const editBillingPagePaymenPlaybackProtectionService = async (enabled: boolean, amount: number) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.put('/accounts/' + userId + '/billing/playback-protection', 
        {
            enabled: enabled,
            amount: amount
        }
    )
}

const deleteBillingPagePaymenPlaybackProtectionService = async (data: PlaybackProtection) => {
    return await axiosClient.delete('billing/playback-protection', {data:{...data}})
}

const addBillingPageExtrasService = async (data: Extras) => {
    return await axiosClient.post('billing/extras', {...data})
}

const getProductDetailsService = async () => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get('/accounts/' + userId + '/products')
}

const purchaseProductsService = async (data: Extras, recurlyToken: string, token3Ds?: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.post('/accounts/' + userId + '/products/purchase',
        {
            code: data.code,
            quantity: data.quantity,
            token: recurlyToken,
            threeDSecureToken: token3Ds ? token3Ds : undefined
        }
    ) 
}


export const BillingServices = {
    getBillingPagePaymentMethodService,
    saveBillingPagePaymentMethodService,
    addBillingPagePaymenPlaybackProtectionService,
    editBillingPagePaymenPlaybackProtectionService,
    deleteBillingPagePaymenPlaybackProtectionService,
    addBillingPageExtrasService,
    getProductDetailsService,
    purchaseProductsService
} 
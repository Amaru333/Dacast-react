import { PaywallSettingsInfos } from './types';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';

const getPaywallSettingsInfos = async () => {
    return await axiosClient.get('/paywall/payment-options/')
}

const savePaywallSettingsInfos = async (data: PaywallSettingsInfos) => {
    return await axiosClient.put('/paywall/payment-options/', 
        {
            ...data
        }
    )
}

export const PaywallSettingsServices = {
    getPaywallSettingsInfos,
    savePaywallSettingsInfos
}
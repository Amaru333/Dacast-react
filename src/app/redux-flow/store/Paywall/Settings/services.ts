import axios from 'axios';
import { PaywallSettingsInfos } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPaywallSettingsInfos = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.get(process.env.API_BASE_URL + '/paywall/payment-options/', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePaywallSettingsInfos = async (data: PaywallSettingsInfos) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return await axios.put(process.env.API_BASE_URL + '/paywall/payment-options/', 
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

export const PaywallSettingsServices = {
    getPaywallSettingsInfos,
    savePaywallSettingsInfos
}
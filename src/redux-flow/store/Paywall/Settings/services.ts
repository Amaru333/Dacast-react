import axios from 'axios';
import { PaywallSettingsInfos } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPaywallSettingsInfos = () => {
    return axios.get(urlBase + 'paywall-settings');
}

const savePaywallSettingsInfos = (data: PaywallSettingsInfos) => {
    return axios.post(urlBase + 'paywall-settings', {data: data})
}

export const PaywallSettingsServices = {
    getPaywallSettingsInfos,
    savePaywallSettingsInfos
}
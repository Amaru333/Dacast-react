import axios from 'axios';
import { PaywallTheme } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPaywallThemes = () => {
    return axios.get(urlBase + 'paywall-themes');
}

const savePaywallTheme = (data: PaywallTheme) => {
    return axios.put(urlBase + 'paywall-theme', {data: data});
}

const createPaywallTheme = (data: PaywallTheme) => {
    return axios.post(urlBase + 'paywall-theme', {data: data});
}

const deletePaywallTheme = (data: PaywallTheme) => {
    return axios.delete(urlBase + 'paywall-theme', {data: data});
}

export const PaywallThemeServices = {
    getPaywallThemes,
    savePaywallTheme,
    createPaywallTheme,
    deletePaywallTheme
}
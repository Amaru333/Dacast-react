import axios from 'axios';
import { Preset, Promo, VodPaywallPageInfos } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodPaywallInfos = () => {
    return axios.get(urlBase + 'vod-paywall');
}

const saveVodPaywallInfos = (data: VodPaywallPageInfos) => {
    return axios.post(urlBase + 'vod-paywall', {data: data})
}

const createVodPricePreset = (data: Preset) => {
    return axios.post(urlBase + 'vod-paywall-preset-price', {data: data})
}

const saveVodPricePreset = (data: Preset) => {
    return axios.put(urlBase + 'vod-paywall-preset-price', {data: data})
}

const deleteVodPricePreset = (data: Preset) => {
    return axios.delete(urlBase + 'vod-paywall-preset-price', {data: data})
}

const createVodPromoPreset = (data: Promo) => {
    return axios.post(urlBase + 'vod-paywall-preset-promo', {data: data})
}

const saveVodPromoPreset = (data: Promo) => {
    return axios.put(urlBase + 'vod-paywall-preset-promo', {data: data})
}

const deleteVodPromoPreset = (data: Promo) => {
    return axios.delete(urlBase + 'vod-paywall-preset-promo', {data: data})
}

export const VodPaywallServices = {
    getVodPaywallInfos,
    saveVodPaywallInfos,
    createVodPricePreset,
    saveVodPricePreset,
    deleteVodPricePreset,
    createVodPromoPreset,
    saveVodPromoPreset,
    deleteVodPromoPreset
}

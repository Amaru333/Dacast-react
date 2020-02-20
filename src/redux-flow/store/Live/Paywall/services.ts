import axios from 'axios';
import { Preset, Promo, LivePaywallPageInfos } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLivePaywallInfos = () => {
    return axios.get(urlBase + 'live-paywall');
}

const saveLivePaywallInfos = (data: LivePaywallPageInfos) => {
    return axios.post(urlBase + 'live-paywall', {data: data})
}

const createLivePricePreset = (data: Preset) => {
    return axios.post(urlBase + 'live-paywall-preset-price', {data: data})
}

const saveLivePricePreset = (data: Preset) => {
    return axios.put(urlBase + 'live-paywall-preset-price', {data: data})
}

const deleteLivePricePreset = (data: Preset) => {
    return axios.delete(urlBase + 'live-paywall-preset-price', {data: data})
}

const createLivePromoPreset = (data: Promo) => {
    return axios.post(urlBase + 'live-paywall-preset-promo', {data: data})
}

const saveLivePromoPreset = (data: Promo) => {
    return axios.put(urlBase + 'live-paywall-preset-promo', {data: data})
}

const deleteLivePromoPreset = (data: Promo) => {
    return axios.delete(urlBase + 'live-paywall-preset-promo', {data: data})
}

export const LivePaywallServices = {
    getLivePaywallInfos,
    saveLivePaywallInfos,
    createLivePricePreset,
    saveLivePricePreset,
    deleteLivePricePreset,
    createLivePromoPreset,
    saveLivePromoPreset,
    deleteLivePromoPreset
}

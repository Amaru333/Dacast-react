import axios from 'axios';
import { Preset, Promo } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPresetsInfos = () => {
    return axios.get(urlBase + 'paywall-presets');
}

const createPricePreset = (data: Preset) => {
    return axios.post(urlBase + 'paywall-price-preset', {data: data})
}

const savePricePreset = (data: Preset) => {
    return axios.put(urlBase + 'paywall-price-preset', {data: data})
}

const deletePricePreset = (data: Preset) => {
    return axios.delete(urlBase + 'paywall-price-preset', {data: data})
}

const createPromoPreset = (data: Promo) => {
    return axios.post(urlBase + 'paywall-promo-preset', {data: data})
}

const savePromoPreset = (data: Promo) => {
    return axios.put(urlBase + 'paywall-promo-preset', {data: data})
}

const deletePromoPreset = (data: Promo) => {
    return axios.delete(urlBase + 'paywall-promo-preset', {data: data})
}

export const PresetsServices = {
    getPresetsInfos,
    createPricePreset,
    savePricePreset,
    deletePricePreset,
    createPromoPreset,
    savePromoPreset,
    deletePromoPreset
}

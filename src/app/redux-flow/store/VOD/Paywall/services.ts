import axios from 'axios';
import { Preset, Promo, ContentPaywallPageInfos } from '../../Paywall/Presets/types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodPaywallInfos = () => {
    return axios.get(urlBase + 'vod-paywall');
}

const getVodPaywallPrices = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/prices?content-id=' + vodId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodPaywallInfos = (data: ContentPaywallPageInfos) => {
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

const getVodPaywallPromos = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/promos?page=1&per-page=100', 
        {
            headers: {
                Authorization: token
            }
        }
    )
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
    getVodPaywallPrices,
    saveVodPaywallInfos,
    createVodPricePreset,
    saveVodPricePreset,
    deleteVodPricePreset,
    getVodPaywallPromos,
    createVodPromoPreset,
    saveVodPromoPreset,
    deleteVodPromoPreset
}

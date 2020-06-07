import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLivePaywallInfos = () => {
    return axios.get(urlBase + 'live-paywall');
}

const saveLivePaywallInfos = (data: ContentPaywallPageInfos) => {
    return axios.post(urlBase + 'live-paywall', {data: data})
}

const getLivePaywallPrices = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/prices?content-id=' + liveId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
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

const getLivePaywallPromos = async () => {
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
    getLivePaywallPrices,
    createLivePricePreset,
    saveLivePricePreset,
    deleteLivePricePreset,
    getLivePaywallPromos,
    createLivePromoPreset,
    saveLivePromoPreset,
    deleteLivePromoPreset
}

import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLivePaywallInfos = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/channels/' + liveId + '/paywall', 
        {
            headers: {
                Authorization: token
            }
        }
    )
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

const createLivePricePreset = async (data: Preset) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/prices', 
        {
            name: data.name,
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveLivePricePreset = async (data: Preset) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/paywall/prices/' + data.id, 
        {
            name: data.name,
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteLivePricePreset = async (data: Preset) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/paywall/prices/' + data.id, 
        {
            headers: {
                Authorization: token
            }
        }
    )
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

const createLivePromoPreset = async (data: Promo, liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/promos' , 
        {
            promo: {
                ...data,
                assignedContentIds: [liveId],
                discountApplied: 'once'
            }  
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveLivePromoPreset = async (data: Promo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/paywall/promos/' + data.id , 
        {
            promo: data  
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteLivePromoPreset = async (data: Promo) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/paywall/promos/' + data.id , 
        {
            headers: {
                Authorization: token
            }
        }
    )
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

import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

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

const saveLivePaywallInfos = async (data: ContentPaywallPageInfos, liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/channels/' + liveId + '/paywall', 
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

const getLivePaywallPrices = async (liveId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + `/paywall/prices?content-id=${userId}-live-${liveId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const createLivePricePreset = async (data: Preset, liveId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/prices', 
        {
            prices: data.prices,
            settings: data.settings,
            contentId: `${userId}-live-${liveId}`
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
    let {token, userId} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/promos' , 
        {
            promo: {
                ...data,
                assignedContentIds: [`${userId}-live-${liveId}`],
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

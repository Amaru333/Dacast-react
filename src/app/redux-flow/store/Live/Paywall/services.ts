import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';
import { parse } from 'path';

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
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            contentId: `${userId}-live-${liveId}`,
            prices: data.prices.map((p) => {return {...p, description: 'price description'}}),
            settings: {
                recurrence: {
                    recurrence: data.settings.recurrence.recurrence === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.recurrence === 'Quarterly' ? 4 : data.settings.recurrence.recurrence === 'Biannual' ? 6 : 1
                }
            }
        }
    } else {
        if(data.settings.startMethod === 'Upon Purchase') {
            parsedPrice = {
                contentId: `${userId}-live-${liveId}`,
                prices: data.prices.map((p) => {return {...p, description: 'price description'}}),
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    }
                }
            }
        } else {
            parsedPrice = {
                contentId: `${userId}-live-${liveId}`,
                prices: data.prices.map((p) => {return {...p, description: 'price description'}}),
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    },
                    startDate: data.settings.startDate
                }
            }
        }
    } 

    return axios.post(process.env.API_BASE_URL + '/paywall/prices', 
        {
            ...parsedPrice
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveLivePricePreset = async (data: Preset, liveId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            price: {value: data.price, currency: data.currency, description: data.description},
            settings: {
                recurrence: {
                    recurrence: data.settings.recurrence.recurrence === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.recurrence === 'Quarterly' ? 4 : data.settings.recurrence.recurrence === 'Biannual' ? 6 : 1
                }
            }
        }
    } else {
        if(data.settings.startMethod === 'Upon Purchase') {
            parsedPrice = {
                price: {value: data.price, currency: data.currency, description: data.description},
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    }
                }
            }
        } else {
            parsedPrice = {
                price: {value: data.price, currency: data.currency, description: data.description},
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase().substr(0, data.settings.duration.unit.length - 1),
                        value: data.settings.duration.value
                    },
                    startDate: data.settings.startDate
                }
            }
        }
    } 
    return axios.put(process.env.API_BASE_URL + '/paywall/prices/' + data.id, 
        {
            id: data.id,
            contentId: `${userId}-live-${liveId}`,
            name: data.name,
            ...parsedPrice
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteLivePricePreset = async (data: Preset, liveId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + `/paywall/prices/${data.id}?content-id=${userId}-live-${liveId}`, 
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
                discountApplied: 'once',
                id: null
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

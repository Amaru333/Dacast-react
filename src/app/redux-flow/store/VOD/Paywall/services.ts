import axios from 'axios';
import { Preset, Promo, ContentPaywallPageInfos } from '../../Paywall/Presets/types'
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodPaywallInfos = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/vods/' + vodId + '/paywall', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodPaywallInfos = async (data: ContentPaywallPageInfos, vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/vods/' + vodId + '/paywall', 
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

const getVodPaywallPrices = async (vodId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + `/paywall/prices?content-id=${userId}-vod-${vodId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const createVodPricePreset = async (data: Preset, vodId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            contentId: `${userId}-vod-${vodId}`,
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
                contentId: `${userId}-vod-${vodId}`,
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
                contentId: `${userId}-vod-${vodId}`,
                prices: data.prices.map((p) => {return {...p, description: 'price description'}}),
                settings: {
                    startDate: Date.now()
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

const saveVodPricePreset = async (data: Preset) => {
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

const deleteVodPricePreset = async (data: Preset) => {
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

const createVodPromoPreset = async (data: Promo, vodId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/promos' , 
        {
            promo: {
                ...data,
                assignedContentIds: [`${userId}-vod-${vodId}`],
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

const saveVodPromoPreset = async (data: Promo) => {
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

const deleteVodPromoPreset = async (data: Promo) => {
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

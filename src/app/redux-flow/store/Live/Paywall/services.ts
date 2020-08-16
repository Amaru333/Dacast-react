import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { axiosClient } from '../../../../utils/axiosClient';
import { userToken } from '../../../../utils/token';

const getLivePaywallInfos = async (liveId: string) => {
    return await axiosClient.get('/channels/' + liveId + '/paywall')
}

const saveLivePaywallInfos = async (data: ContentPaywallPageInfos, liveId: string) => {
    return await axiosClient.put('/channels/' + liveId + '/paywall', 
        {
            ...data
        }
    )
}

const getLivePaywallPrices = async (liveId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get(`/paywall/prices?content-id=${userId}-live-${liveId}`)
}

const createLivePricePreset = async (data: Preset, liveId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            contentId: `${userId}-live-${liveId}`,
            prices: data.prices.map((p) => {return {...p, description: 'price description'}}),
            settings: {
                recurrence: {
                    unit: data.settings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.unit === 'Quarterly' ? 4 : data.settings.recurrence.unit === 'Biannual' ? 6 : 1
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
    return await axiosClient.post('/paywall/prices', 
        {
            ...parsedPrice
        }
    )
}

const saveLivePricePreset = async (data: Preset, liveId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            price: {value: data.price, currency: data.currency, description: data.description},
            settings: {
                recurrence: {
                    unit: data.settings.recurrence.unit === 'Weekly' ? 'week' : 'month',
                    value: data.settings.recurrence.unit === 'Quarterly' ? 4 : data.settings.recurrence.unit === 'Biannual' ? 6 : 1
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
    return await axiosClient.put('/paywall/prices/' + data.id, 
        {
            id: data.id,
            contentId: `${userId}-live-${liveId}`,
            name: data.name,
            ...parsedPrice
        }
    )
}

const deleteLivePricePreset = async (data: Preset, liveId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.delete(`/paywall/prices/${data.id}?content-id=${userId}-live-${liveId}`)
}

const getLivePaywallPromos = async () => {
    return await axiosClient.get('/paywall/promos?page=1&per-page=100')
}

const createLivePromoPreset = async (data: Promo, liveId: string) => {
    return await axiosClient.post('/paywall/promos' , 
        {
            promo: {
                ...data
            }  
        }
    )
}

const saveLivePromoPreset = async (data: Promo) => {
    return await axiosClient.put('/paywall/promos/' + data.id , 
        {
            promo: data  
        }
    )
}

const deleteLivePromoPreset = async (data: Promo) => {
    return await axiosClient.delete('/paywall/promos/' + data.id)
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

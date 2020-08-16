import { Preset, Promo, ContentPaywallPageInfos } from '../../Paywall/Presets/types'
import { axiosClient } from '../../../../utils/axiosClient';
import { userToken } from '../../../../utils/token';


const getVodPaywallInfos = async (vodId: string) => {
    return await axiosClient.get('/vods/' + vodId + '/paywall')
}

const saveVodPaywallInfos = async (data: ContentPaywallPageInfos, vodId: string) => {
    return await axiosClient.put('/vods/' + vodId + '/paywall', 
        {
            ...data
        }
    )
}

const getVodPaywallPrices = async (vodId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get(`/paywall/prices?content-id=${userId}-vod-${vodId}`)
}

const createVodPricePreset = async (data: Preset, vodId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            contentId: `${userId}-vod-${vodId}`,
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

const saveVodPricePreset = async (data: Preset, vodId: string) => {
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
            contentId: `${userId}-vod-${vodId}`,
            name: data.name,
            ...parsedPrice
        }
    )
}

const deleteVodPricePreset = async (data: Preset, vodId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.delete(`/paywall/prices/${data.id}?content-id=${userId}-vod-${vodId}`)
}

const getVodPaywallPromos = async () => {
    return await axiosClient.get('/paywall/promos?page=1&per-page=100')
}

const createVodPromoPreset = async (data: Promo, vodId: string) => {
    return await axiosClient.post('/paywall/promos' , 
        {
            promo: {
                ...data
            }  
        }
    )
}

const saveVodPromoPreset = async (data: Promo) => {
    return await axiosClient.put('/paywall/promos/' + data.id , 
        {
            promo: data  
        }
    )
}

const deleteVodPromoPreset = async (data: Promo) => {
    return await axiosClient.delete('/paywall/promos/' + data.id)
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

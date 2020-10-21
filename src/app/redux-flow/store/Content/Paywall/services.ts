import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { axiosClient } from '../../../../utils/services/axios/axiosClient';
import { userToken } from '../../../../utils/services/token/tokenService';

const getContentPaywallInfos = async (contentId: string, contentType: string) => {
    return await axiosClient.get(`/${contentType}/${contentId}/paywall`)
}

const saveContentPaywallInfos = async (data: ContentPaywallPageInfos, contentId: string, contentType: string) => {
    return await axiosClient.put(`${contentType}/${contentId}/paywall`, 
        {
            ...data
        }
    )
}

const getContentPaywallPrices = async (contentId: string, contentType: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get(`/paywall/prices?content-id=${userId}-${contentType}-${contentId}`)
}

const createContentPricePreset = async (data: Preset, contentId: string, contentType: string) => {
    debugger
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.priceType === 'Subscription') {
        parsedPrice = {
            contentId: `${userId}-${contentType}-${contentId}`,
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
                contentId: `${userId}-${contentType}-${contentId}`,
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
                contentId: `${userId}-${contentType}-${contentId}`,
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

const saveContentPricePreset = async (data: Preset, contentId: string, contentType: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.priceType === 'Subscription') {
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
            contentId: `${userId}-${contentType}-${contentId}`,
            name: data.name,
            ...parsedPrice
        }
    )
}

const deleteContentPricePreset = async (data: Preset, contentId: string, contentType: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.delete(`/paywall/prices/${data.id}?content-id=${userId}-${contentType}-${contentId}`)
}

const getContentPaywallPromos = async () => {
    return await axiosClient.get('/paywall/promos?page=1&per-page=100')
}

const createContentPromoPreset = async (data: Promo, contentId: string) => {
    return await axiosClient.post('/paywall/promos' , 
        {
            promo: {
                ...data
            }  
        }
    )
}

const saveContentPromoPreset = async (data: Promo) => {
    return await axiosClient.put('/paywall/promos/' + data.id , 
        {
            promo: data  
        }
    )
}

const deleteContentPromoPreset = async (data: Promo) => {
    return await axiosClient.delete('/paywall/promos/' + data.id)
}

export const ContentPaywallServices = {
    getContentPaywallInfos,
    saveContentPaywallInfos,
    getContentPaywallPrices,
    createContentPricePreset,
    saveContentPricePreset,
    deleteContentPricePreset,
    getContentPaywallPromos,
    createContentPromoPreset,
    saveContentPromoPreset,
    deleteContentPromoPreset
}

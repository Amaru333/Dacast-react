import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { axiosClient } from '../../../../utils/axiosClient';
import { userToken } from '../../../../utils/token';

const getPlaylistPaywallInfos = async (playlistId: string) => {
    return await axiosClient.get('/playlists/' + playlistId + '/paywall')
}

const savePlaylistPaywallInfos = async (data: ContentPaywallPageInfos, playlistId: string) => {
    return await axiosClient.put('/playlists/' + playlistId + '/paywall', 
        {
            ...data
        }
    )
}

const getPlaylistPaywallPrices = async (playlistId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.get(`/paywall/prices?content-id='${userId}-playlist-${playlistId}`)
}


const createPlaylistPricePreset = async (data: Preset, playlistId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            contentId: `${userId}-playlist-${playlistId}`,
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
                contentId: `${userId}-playlist-${playlistId}`,
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
                contentId: `${userId}-playlist-${playlistId}`,
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

const savePlaylistPricePreset = async (data: Preset, playlistId: string) => {
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
            contentId: `${userId}-playlist-${playlistId}`,
            name: data.name,
            ...parsedPrice
        }
    )
}

const deletePlaylistPricePreset = async (data: Preset, playlistId: string) => {
    const userId = userToken.getUserInfoItem('custom:dacast_user_id')
    return await axiosClient.delete(`/paywall/prices/${data.id}?content-id=${userId}-playlist-${playlistId}`)
}

const getPlaylistPaywallPromos = async () => {
    return await axiosClient.get('/paywall/promos?page=1&per-page=100')
}

const createPlaylistPromoPreset = async (data: Promo, playlistId: string) => {
    return await axiosClient.post('/paywall/promos' , 
        {
            promo: {
                ...data
            }  
        }
    )
}

const savePlaylistPromoPreset = async (data: Promo) => {
    return await axiosClient.put('/paywall/promos/' + data.id , 
        {
            promo: data  
        }
    )
}

const deletePlaylistPromoPreset = async (data: Promo) => {
    return await axiosClient.delete('/paywall/promos/' + data.id)
}

export const PlaylistPaywallServices = {
    getPlaylistPaywallInfos,
    getPlaylistPaywallPrices,
    savePlaylistPaywallInfos,
    createPlaylistPricePreset,
    savePlaylistPricePreset,
    deletePlaylistPricePreset,
    getPlaylistPaywallPromos,
    createPlaylistPromoPreset,
    savePlaylistPromoPreset,
    deletePlaylistPromoPreset
}

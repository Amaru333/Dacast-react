import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getPlaylistPaywallInfos = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/playlists/' + playlistId + '/paywall', 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePlaylistPaywallInfos = async (data: ContentPaywallPageInfos, playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/playlists/' + playlistId + '/paywall', 
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

const getPlaylistPaywallPrices = async (playlistId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + `/paywall/prices?content-id='${userId}-playlist-${playlistId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}


const createPlaylistPricePreset = async (data: Preset, playlistId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    let parsedPrice = null
    if(data.type === 'Subscription') {
        parsedPrice = {
            contentId: `${userId}-playlist-${playlistId}`,
            prices: data.prices,
            settings: {
                recurrence: {
                    recurrence: data.settings.recurrence,
                    value: 1
                }
            }
        }
    } else {
        if(data.settings.startMethod === 'Upon Purchase') {
            parsedPrice = {
                contentId: `${userId}-playlist-${playlistId}`,
                prices: data.prices,
                settings: {
                    duration: {
                        unit: data.settings.duration.unit.toLowerCase(),
                        value: data.settings.duration.value
                    }
                }
            }
        } else {
            parsedPrice = {
                contentId: `${userId}-playlist-${playlistId}`,
                prices: data.prices,
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

const savePlaylistPricePreset = async (data: Preset) => {
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

const deletePlaylistPricePreset = async (data: Preset) => {
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

const getPlaylistPaywallPromos = async () => {
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

const createPlaylistPromoPreset = async (data: Promo, playlistId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/promos' , 
        {
            promo: {
                ...data,
                assignedContentIds: [`${userId}-playlist-${playlistId}`],
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

const savePlaylistPromoPreset = async (data: Promo) => {
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

const deletePlaylistPromoPreset = async (data: Promo) => {
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

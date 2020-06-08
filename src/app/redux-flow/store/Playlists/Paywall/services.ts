import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

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

const savePlaylistPaywallInfos = (data: ContentPaywallPageInfos) => {
    return axios.post(urlBase + 'playlist-paywall', {data: data})
}

const getPlaylistPaywallPrices = async (playlistId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/prices?content-id=' + playlistId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}


const createPlaylistPricePreset = async (data: Preset) => {
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
    let {token} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/paywall/promos' , 
        {
            promo: {
                ...data,
                assignedContentIds: [playlistId],
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

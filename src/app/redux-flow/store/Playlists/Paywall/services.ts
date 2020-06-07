import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlaylistPaywallInfos = () => {
    return axios.get(urlBase + 'playlist-paywall');
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

const savePlaylistPaywallInfos = (data: ContentPaywallPageInfos) => {
    return axios.post(urlBase + 'playlist-paywall', {data: data})
}

const createPlaylistPricePreset = (data: Preset) => {
    return axios.post(urlBase + 'playlist-paywall-preset-price', {data: data})
}

const savePlaylistPricePreset = (data: Preset) => {
    return axios.put(urlBase + 'playlist-paywall-preset-price', {data: data})
}

const deletePlaylistPricePreset = (data: Preset) => {
    return axios.delete(urlBase + 'playlist-paywall-preset-price', {data: data})
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

const createPlaylistPromoPreset = (data: Promo) => {
    return axios.post(urlBase + 'playlist-paywall-preset-promo', {data: data})
}

const savePlaylistPromoPreset = (data: Promo) => {
    return axios.put(urlBase + 'playlist-paywall-preset-promo', {data: data})
}

const deletePlaylistPromoPreset = (data: Promo) => {
    return axios.delete(urlBase + 'playlist-paywall-preset-promo', {data: data})
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

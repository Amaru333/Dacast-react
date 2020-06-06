import axios from 'axios';
import { ContentPaywallPageInfos, Preset, Promo } from '../../Paywall/Presets';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlaylistPaywallInfos = () => {
    return axios.get(urlBase + 'playlist-paywall');
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
    savePlaylistPaywallInfos,
    createPlaylistPricePreset,
    savePlaylistPricePreset,
    deletePlaylistPricePreset,
    createPlaylistPromoPreset,
    savePlaylistPromoPreset,
    deletePlaylistPromoPreset
}

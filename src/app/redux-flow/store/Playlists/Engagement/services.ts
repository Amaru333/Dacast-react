import axios from 'axios';
import { Ad } from '../../Settings/Interactions';
import { PlaylistEngagementSettings } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlaylistEngagementSettings = () => {
    return axios.get(urlBase + 'playlist-engagements')
}

const savePlaylistEngagementSettings = (data: PlaylistEngagementSettings) => {
    return axios.post(urlBase + 'playlist-engagements', {data: data})
}

const savePlaylistAd = (data: Ad) => {
    return axios.put(urlBase + 'playlist-engagement-ad', {data: data})
}

const createPlaylistAd = (data: Ad) => {
    return axios.post(urlBase + 'playlist-engagement-ad', {data: data})
}

const deletePlaylistAd = (data: Ad) => {
    return axios.delete(urlBase + 'playlist-engagement-ad', {data: data})
}

export const playlistEngagementServices = {
    getPlaylistEngagementSettings,
    savePlaylistEngagementSettings,
    savePlaylistAd,
    createPlaylistAd,
    deletePlaylistAd
}
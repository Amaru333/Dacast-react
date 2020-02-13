import axios from 'axios'
import { PlaylistTheme } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPlaylistThemeService = () => {
    return axios.get(urlBase + 'playlist-themes');
}

const savePlaylistThemeService = (data: PlaylistTheme) => {
    return axios.post(urlBase + 'playlist-themes', {data: data})
}

export const PlaylistThemingServices = {
    getPlaylistThemeService,
    savePlaylistThemeService
}
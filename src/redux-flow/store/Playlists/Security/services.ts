import axios from 'axios'
import { SecuritySettings } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getPlaylistSecuritySettingsService = () => {
    return axios.get(urlBase + 'playlist-security');
}

const savePlaylistSecuritySettingsService = (data: SecuritySettings) => {
    return axios.post(urlBase + 'playlist-security', {...data});
}

export const PlaylistSecurityServices = {
    getPlaylistSecuritySettingsService,
    savePlaylistSecuritySettingsService
}
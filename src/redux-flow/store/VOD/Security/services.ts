import axios from 'axios'
import { SecuritySettings } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getVodSecuritySettingsService = () => {
    return axios.get(urlBase + 'vod-security');
}

const saveVodSecuritySettingsService = (data: SecuritySettings) => {
    return axios.post(urlBase + 'vod-security', {...data});
}

export const VodSecurityServices = {
    getVodSecuritySettingsService,
    saveVodSecuritySettingsService
}
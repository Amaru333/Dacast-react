import axios from 'axios'
import { SecuritySettings } from '../Security/types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getLiveSecuritySettingsService = () => {
    return axios.get(urlBase + 'live-security');
}

const saveLiveSecuritySettingsService = (data: SecuritySettings) => {
    return axios.post(urlBase + 'live-security', {...data});
}

export const LiveSecurityServices = {
    getLiveSecuritySettingsService,
    saveLiveSecuritySettingsService
}
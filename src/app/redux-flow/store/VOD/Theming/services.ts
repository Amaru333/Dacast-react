import axios from 'axios'
import { VodTheme } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodThemeService = () => {
    return axios.get(urlBase + 'vod-themes');
}

const saveVodThemeService = (data: VodTheme) => {
    return axios.post(urlBase + 'vod-themes', {data: data})
}

export const VodThemingServices = {
    getVodThemeService,
    saveVodThemeService
}
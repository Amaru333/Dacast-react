import axios from 'axios'

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodThemeService = () => {
    return axios.get(urlBase + 'vod-themes');
}

export const VodThemingServices = {
    getVodThemeService
}
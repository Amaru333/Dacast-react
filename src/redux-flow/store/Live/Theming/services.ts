import axios from 'axios'
import { LiveTheme } from './types';


const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveThemeService = () => {
    return axios.get(urlBase + 'live-themes');
}

const saveLiveThemeService = (data: LiveTheme) => {
    return axios.post(urlBase + 'live-theme', {data: data})
}

export const LiveThemingServices = {
    getLiveThemeService,
    saveLiveThemeService
}
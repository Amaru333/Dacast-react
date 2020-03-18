import axios from 'axios'
import { ThemeOptions } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getThemingList = () => {
    return axios.get(urlBase + 'setting-themes');
}

const  createTheme = (data: ThemeOptions) => {
    return axios.post(urlBase + 'setting-theme', {data: data})
}

const saveTheme = (data: ThemeOptions) => {
    return axios.put(urlBase + 'setting-theme', {data: data})
}

const deleteTheme = (data: ThemeOptions) => {
    return axios.delete(urlBase + 'setting-theme', {data: data})
}

export const themingServices = {
    getThemingList,
    createTheme,
    saveTheme,
    deleteTheme
}
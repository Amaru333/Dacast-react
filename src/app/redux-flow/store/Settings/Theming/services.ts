import axios from 'axios'
import { ThemeOptions } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getThemingList = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/accounts/' + userId + '/settings/themes',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const  createTheme = async (data: ThemeOptions) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.post(process.env.API_BASE_URL + '/accounts/' + userId + '/settings/themes/',
        {...data, offlineMessagePosition: "Top"}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveTheme = async (data: ThemeOptions) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/accounts/' + userId + '/settings/themes/' + data.id,
        {...data, offlineMessagePosition: "Top"}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const deleteTheme = async (data: ThemeOptions) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/accounts/' + userId + '/settings/themes/' + data.id,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const themingServices = {
    getThemingList,
    createTheme,
    saveTheme,
    deleteTheme
}
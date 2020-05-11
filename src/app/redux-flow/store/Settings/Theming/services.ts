import axios from 'axios'
import { ThemeOptions } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const getThemingList = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/themes',
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
    return axios.post('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/themes/',
        {...data, offlineMessagePosition: 1}, 
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
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/themes/' + data.id,
        {...data, offlineMessagePosition: 1}, 
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
    return axios.delete('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/accounts/' + userId + '/settings/themes/' + data.id,
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
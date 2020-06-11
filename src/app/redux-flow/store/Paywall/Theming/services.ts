import axios from 'axios';
import { PaywallTheme } from './types';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getPaywallThemes = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.get(process.env.API_BASE_URL + '/paywall/themes/' , 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const savePaywallTheme = async (data: PaywallTheme) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.put(process.env.API_BASE_URL + '/paywall/themes/' + data.id , 
        {
            ...data
        },
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const createPaywallTheme = async (data: PaywallTheme) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    let parsedData = {
        name: data.name,
        isDefault: data.isDefault,
        splashScreen: data.splashScreen,
        loginScreen: data.loginScreen
    }
    return axios.post(process.env.API_BASE_URL + '/paywall/themes/', 
        {
            ...parsedData
        },
        {
            headers: {
                Authorization: token
            }
        }
    )}

const deletePaywallTheme = async (data: PaywallTheme) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    return axios.delete(process.env.API_BASE_URL + '/paywall/themes/' + data.id , 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const PaywallThemeServices = {
    getPaywallThemes,
    savePaywallTheme,
    createPaywallTheme,
    deletePaywallTheme
}
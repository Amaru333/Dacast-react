import axios from 'axios'
import { EmbedSettingsOptionType } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getEmbedSettingsOptionsService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/settings/embed',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveEmbedSettingsOptionsService = async(data: EmbedSettingsOptionType) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/settings/embed',
        {...data}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const SettingsServices = {
    getEmbedSettingsOptionsService,
    saveEmbedSettingsOptionsService
} 
import axios from 'axios'
import { EmbedSettingsOptionType } from './types';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getEmbedSettingsOptionsService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/settings/embed',
        {headers: {
            'Authorization': token
        }})
}

const saveEmbedSettingsOptionsService = async(data: EmbedSettingsOptionType) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/settings/embed',
        {...data}, 
        {headers: {
            'Authorization': token
        }}
    )
}

export const SettingsServices = {
    getEmbedSettingsOptionsService,
    saveEmbedSettingsOptionsService
} 
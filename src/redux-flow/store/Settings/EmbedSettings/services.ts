import axios from 'axios'
import { EmbedSettingsOptionType } from './types';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getEmbedSettingsOptionsService = () => {
    return axios.get(urlBase + 'getDeliveryAndEmbedOptions');
}

const saveEmbedSettingsOptionsService = (data: EmbedSettingsOptionType) => {
    return axios.post(urlBase + 'saveDeliveryAndEmbedOptions', {...data});
}

export const SettingsServices = {
    getEmbedSettingsOptionsService,
    saveEmbedSettingsOptionsService
} 
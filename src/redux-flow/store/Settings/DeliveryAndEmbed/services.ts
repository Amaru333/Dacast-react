import axios from 'axios'
import { DeliveryAndEmbedOptionType } from '../types';


const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getDeliveryAndEmbedOptionsService = () => {
    return axios.get(urlBase + 'getDeliveryAndEmbedOptions');
}

const saveDeliveryAndEmbedOptionsService = (data: DeliveryAndEmbedOptionType) => {
    return axios.post(urlBase + 'saveDeliveryAndEmbedOptions', {...data});
}

export const SettingsServices = {
    getDeliveryAndEmbedOptionsService,
    saveDeliveryAndEmbedOptionsService
} 
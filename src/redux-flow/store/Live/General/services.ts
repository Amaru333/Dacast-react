import axios from 'axios'
import { LiveDetails } from './types';

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getLiveDetailsService = () => {
    return axios.get(urlBase + 'live-details');
}

const saveLiveDetailsService = (data: LiveDetails) => {
    return axios.post(urlBase + 'live-details', {...data});
}

export const LiveGeneralServices = {
    getLiveDetailsService,
    saveLiveDetailsService
}
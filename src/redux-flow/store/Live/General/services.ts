import axios from 'axios'
import { LiveDetails } from './types';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveDetailsService = () => {
    return axios.get(urlBase + 'live-details');
}

const getLiveList = () => {
    return axios.get(urlBase + 'channels');
}

const saveLiveDetailsService = (data: LiveDetails) => {
    return axios.post(urlBase + 'live-details', {...data});
}

export const LiveGeneralServices = {
    getLiveDetailsService,
    getLiveList,
    saveLiveDetailsService
}
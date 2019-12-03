import axios from 'axios'

const urlBase = 'https://0fb1360f-e2aa-4ae5-a820-c58a4e80bda0.mock.pstmn.io/';

const getVodDetailsService = () => {
    return axios.get(urlBase + 'getVodDetails');
}

export const VodGeneralServices = {
    getVodDetailsService
}
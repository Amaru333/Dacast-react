import axios from 'axios'

const urlBase = 'http://www.mocky.io/v2/5db9a87630000074cc5ee51e';

const getCompanyPageDetailsService = () => {
    return axios.get(urlBase);
}


export const AccountServices = {
    getCompanyPageDetailsService
} 
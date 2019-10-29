import axios from 'axios'

const urlBase = 'https://api.dacast.com/v2/channel?apikey=96941_ddf4b2c299bb1d3ebf01';

const getCompanyPageDetailsService = () => {
    return axios.get(urlBase);
}


export const AccountServices = {
    getCompanyPageDetailsService
} 
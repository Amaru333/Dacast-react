import axios from 'axios'

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getDashboardDetailsService = () => {
    return axios.get(urlBase + 'getDashboardInfo');
}


export const DashboardServices = {
    getDashboardDetailsService
} 
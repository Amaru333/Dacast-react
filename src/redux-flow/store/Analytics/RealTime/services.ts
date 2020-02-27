import axios from 'axios'

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getAnalyticsRealTimeDetailsService = () => {
    return axios.get(urlBase + 'realtime-analytics');
}


export const AnalyticsRealTimeServices = {
    getAnalyticsRealTimeDetailsService
} 
import axios from 'axios'
import { GetAnalyticsDashboardOptions } from '.';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getAnalyticsDashboardDetailsService = (options: GetAnalyticsDashboardOptions) => {
    return axios.get(urlBase + 'dashboard-analytics', {params: {...options} } );
}


export const AnalyticsDashboardServices = {
    getAnalyticsDashboardDetailsService
} 
import axios from 'axios'
import { GetAnalyticsDashboardOptions } from '.';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getAnalyticsDashboardConsumptionTime = (options: GetAnalyticsDashboardOptions) => {
    return axios.get(urlBase + 'dashboard-analytics/consumption-time', {params: {...options} } );
}

const getAnalyticsDashboardPlaysViewersTime = (options: GetAnalyticsDashboardOptions) => {
    return axios.get(urlBase + 'dashboard-analytics/plays-viewers-time', {params: {...options} } );
}

const getAnalyticsDashboardConsumptionDevice = (options: GetAnalyticsDashboardOptions) => {
    return axios.get(urlBase + 'dashboard-analytics/consumption-device', {params: {...options} } );
}

const getAnalyticsDashboardTopContent = (options: GetAnalyticsDashboardOptions) => {
    return axios.get(urlBase + 'dashboard-analytics/top-contents', {params: {...options} } );
}

const getAnalyticsDashboardConsumptionLocation = (options: GetAnalyticsDashboardOptions) => {
    return axios.get(urlBase + 'dashboard-analytics/consumption-location', {params: {...options} } );
}

export const AnalyticsDashboardServices = {
    getAnalyticsDashboardConsumptionTime,
    getAnalyticsDashboardPlaysViewersTime,
    getAnalyticsDashboardConsumptionDevice,
    getAnalyticsDashboardTopContent,
    getAnalyticsDashboardConsumptionLocation
} 
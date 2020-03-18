import axios from 'axios'
import { GetAnalyticsRevenueOptions } from '.';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');

const getAnalyticsRevenueDetailsService = (options?: GetAnalyticsRevenueOptions) => {
    return axios.get(urlBase + 'revenue-analytics', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

export const AnalyticsRevenueServices = {
    getAnalyticsRevenueDetailsService
} 
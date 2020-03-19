import axios from 'axios'
import { GetAnalyticsRevenueOptions } from '.';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');

const getAnalyticsRevenueSalesTimeService = (options?: GetAnalyticsRevenueOptions) => {
    return axios.get(urlBase + 'revenue-analytics/sales-time', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsRevenueRevenueTimeService = (options?: GetAnalyticsRevenueOptions) => {
    return axios.get(urlBase + 'revenue-analytics/revenue-time', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsRevenueSalesCountryService = (options?: GetAnalyticsRevenueOptions) => {
    return axios.get(urlBase + 'revenue-analytics/sales-country', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}


export const AnalyticsRevenueServices = {
    getAnalyticsRevenueSalesTimeService,
    getAnalyticsRevenueRevenueTimeService,
    getAnalyticsRevenueSalesCountryService
} 
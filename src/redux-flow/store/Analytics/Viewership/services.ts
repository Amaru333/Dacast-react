import axios from 'axios'
import { GetAnalyticsViewershipOptions } from '.';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');

const getAnalyticsViewershipDetailsService = (options?: GetAnalyticsViewershipOptions) => {
    return axios.get(urlBase + 'viewership-analytics', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

export const AnalyticsViewershipServices = {
    getAnalyticsViewershipDetailsService
} 
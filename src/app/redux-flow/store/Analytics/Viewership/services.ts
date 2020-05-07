import axios from 'axios'
import { GetAnalyticsViewershipOptions } from '.';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');

const getAnalyticsViewershipConsumptionDomainService = (options?: GetAnalyticsViewershipOptions) => {
    return axios.get(urlBase + 'viewership-consumption-domain', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}


const getAnalyticsViewershipConsumptionDevicesService = (options?: GetAnalyticsViewershipOptions) => {
    return axios.get(urlBase + 'viewership-consumption-device', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsViewershipConsumptionBreakdownService = (options?: GetAnalyticsViewershipOptions) => {
    return axios.get(urlBase + 'viewership-consumption-breakdown', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsViewershipPlaysViewersTimeService = (options?: GetAnalyticsViewershipOptions) => {
    return axios.get(urlBase + 'viewership-plays-viewers-time', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsViewershipViewingTimeBreakdownService = (options?: GetAnalyticsViewershipOptions) => {
    return axios.get(urlBase + 'viewership-viewing-time-breakdown', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsViewershipConcurrentPlaybackService = (options?: GetAnalyticsViewershipOptions) => {
    return axios.get(urlBase + 'viewership-concurrent-playback', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

export const AnalyticsViewershipServices = {
    getAnalyticsViewershipConsumptionDomainService,
    getAnalyticsViewershipConsumptionDevicesService,
    getAnalyticsViewershipConsumptionBreakdownService,
    getAnalyticsViewershipPlaysViewersTimeService,
    getAnalyticsViewershipViewingTimeBreakdownService,
    getAnalyticsViewershipConcurrentPlaybackService
} 
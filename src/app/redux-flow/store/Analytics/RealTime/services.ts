import axios from 'axios'
import { GetAnalyticsRealtimeOptions } from '.';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');


const getAnalyticsRealTimeViewersTimeService = (options?: GetAnalyticsRealtimeOptions) => {
    return axios.get(urlBase + 'realtime-analytics-viewers-time', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsRealTimePlaybackTimeService = (options?: GetAnalyticsRealtimeOptions) => {
    return axios.get(urlBase + 'realtime-analytics-playback-time', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsRealTimeGbTimeService = (options?: GetAnalyticsRealtimeOptions) => {
    return axios.get(urlBase + 'realtime-analytics-gb-time', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

const getAnalyticsRealTimeConsumptionLocationService = (options?: GetAnalyticsRealtimeOptions) => {
    return axios.get(urlBase + 'realtime-analytics-consumption-location', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}

export const AnalyticsRealTimeServices = {
    getAnalyticsRealTimeViewersTimeService,
    getAnalyticsRealTimePlaybackTimeService,
    getAnalyticsRealTimeGbTimeService,
    getAnalyticsRealTimeConsumptionLocationService
} 
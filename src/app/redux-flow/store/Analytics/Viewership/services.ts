import axios from 'axios'
import { GetAnalyticsViewershipOptions } from '.';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';
import { loopUntilCompleted } from '../../../../../utils/LoopHttpServices';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');


const getAnalyticsViewershipJobIds = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/viewership??contentIDs=~' + userId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsViewershipConsumptionDomainService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/domain/fetch?jobID=${jobId}`, token)
    return data;
}


const getAnalyticsViewershipConsumptionDevicesService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/device/fetch?jobID=${jobId}`, token)
    return data;
}


const getAnalyticsViewershipPlaysViewersTimeService = (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    return axios.get(urlBase + 'viewership-plays-viewers-time', {params: {...options}, paramsSerializer: params => {
        return qs.stringify(params);
    } } );
}



const getAnalyticsViewershipConsumptionBreakdownMapService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/location/fetch?jobID=${jobId}`, token)
    return data;
}



const getAnalyticsViewershipConsumptionBreakdownContentService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/content/fetch?jobID=${jobId}`, token)
    return data;
}


const getAnalyticsViewershipConsumptionBreakdownTimeService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/time/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsViewershipViewingTimeBreakdownDeviceService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/viewing-time/device/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsViewershipViewingTimeBreakdownContentService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/viewing-time/content/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsViewershipViewingTimeBreakdownMapService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/viewing-time/location/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsViewershipConcurrentPlaybackDeviceService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/concurrent-playback-sessions/device/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsViewershipConcurrentPlaybackContentService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/concurrent-playback-sessions/content/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsViewershipConcurrentPlaybackMapService = async (jobId: string, options?: GetAnalyticsViewershipOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader()
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/map/fetch?jobID=${jobId}`, token)
    return data;
}


export const AnalyticsViewershipServices = {
    getAnalyticsViewershipJobIds,
    getAnalyticsViewershipConcurrentPlaybackDeviceService,
    getAnalyticsViewershipConcurrentPlaybackContentService,
    getAnalyticsViewershipConcurrentPlaybackMapService,
    getAnalyticsViewershipConsumptionDomainService,
    getAnalyticsViewershipConsumptionDevicesService,
    getAnalyticsViewershipPlaysViewersTimeService,
    getAnalyticsViewershipConsumptionBreakdownMapService,
    getAnalyticsViewershipConsumptionBreakdownContentService,
    getAnalyticsViewershipConsumptionBreakdownTimeService,
    getAnalyticsViewershipViewingTimeBreakdownDeviceService,
    getAnalyticsViewershipViewingTimeBreakdownContentService,
    getAnalyticsViewershipViewingTimeBreakdownMapService


} 
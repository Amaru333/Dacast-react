import axios from 'axios'
import { GetAnalyticsRealtimeOptions } from '.';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';
import { loopUntilCompleted } from '../../../../../utils/LoopHttpServices';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');

const getAnalyticsRealTimeJobIds = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/real-time?contentIDs=~' + userId, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsRealTimeViewersTimeService = async (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/concurrent-viewers/time/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsRealTimePlaybackTimeService = async (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/new-playback-sessions/time/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsRealTimeGbTimeService = async (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/time/fetch?jobID=${jobId}`, token)
    return data;
}

const getAnalyticsRealTimeConsumptionLocationService = async (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/location/fetch?jobID=${jobId}`, token)
    return data;
}

export const AnalyticsRealTimeServices = {
    getAnalyticsRealTimeJobIds,
    getAnalyticsRealTimeViewersTimeService,
    getAnalyticsRealTimePlaybackTimeService,
    getAnalyticsRealTimeGbTimeService,
    getAnalyticsRealTimeConsumptionLocationService
} 
import axios from 'axios'
import { GetAnalyticsRealtimeOptions } from '.';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

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
    return axios.get(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/concurrent-viewers/time/fetch?jobID=${jobId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsRealTimePlaybackTimeService = async (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/new-playback-sessions/time/fetch?jobID=${jobId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsRealTimeGbTimeService = async (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/time/fetch?jobID=${jobId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsRealTimeConsumptionLocationService = async (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/location/fetch?jobID=${jobId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const AnalyticsRealTimeServices = {
    getAnalyticsRealTimeJobIds,
    getAnalyticsRealTimeViewersTimeService,
    getAnalyticsRealTimePlaybackTimeService,
    getAnalyticsRealTimeGbTimeService,
    getAnalyticsRealTimeConsumptionLocationService
} 
import axios from 'axios'
import { GetAnalyticsRealtimeOptions } from '.';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';
import { loopUntilCompleted } from '../../../../../utils/LoopHttpServices';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');

const getAnalyticsRealTime = async (options?: any) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    var stringOption = qs.stringify(options);
    return axios.get(process.env.API_BASE_URL + '/analytics/real-time?'+stringOption, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const AnalyticsRealTimeServices = {
    getAnalyticsRealTime
} 
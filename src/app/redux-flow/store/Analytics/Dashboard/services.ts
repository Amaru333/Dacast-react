import axios from 'axios'
import { GetAnalyticsDashboardOptions } from '.';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';
import { loopUntilCompleted } from '../../../../../utils/LoopHttpServices';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';
var qs = require('qs');

const getAnalyticsDashboardJobIds = async (options?: GetAnalyticsDashboardOptions) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    var stringOption = qs.stringify(options);
    return axios.get(process.env.API_BASE_URL + '/analytics/dashboard?contentIDs=~'+ userId +"&"+stringOption, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsDashboardConsumptionTime = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();

    var stringOption = qs.stringify(options);
    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/consumption/time/fetch?jobID=${jobId}&`+stringOption, token)
    return data
}

const getAnalyticsDashboardPlaysViewersTime = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var stringOption = qs.stringify(options);

    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/plays-and-viewers/time/fetch?jobID=${jobId}&`+stringOption, token)
    return data
}

const getAnalyticsDashboardConsumptionDevice = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var stringOption = qs.stringify(options);

    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/consumption/device/fetch?jobID=${jobId}&`+stringOption, token)
    return data
}

const getAnalyticsDashboardTopContent = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var stringOption = qs.stringify(options);

    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/top-content/content/fetch?jobID=${jobId}&`+stringOption, token)
    return data
}

const getAnalyticsDashboardConsumptionLocation = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var stringOption = qs.stringify(options);

    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/consumption/location/fetch?jobID=${jobId}&`+stringOption, token)
    return data
}

export const AnalyticsDashboardServices = {
    getAnalyticsDashboardJobIds,
    getAnalyticsDashboardConsumptionTime,
    getAnalyticsDashboardPlaysViewersTime,
    getAnalyticsDashboardConsumptionDevice,
    getAnalyticsDashboardTopContent,
    getAnalyticsDashboardConsumptionLocation
} 
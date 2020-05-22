import axios from 'axios'
import { GetAnalyticsDashboardOptions } from '.';
import { addTokenToHeader, isTokenExpired } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getAnalyticsDashboardJobIds = async () => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/dashboard?contentIDs=~' + userId, 
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
    return axios.get(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/time/fetch?jobID=${jobId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsDashboardPlaysViewersTime = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/plays-and-viewers/time/fetch?jobID=${jobId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsDashboardConsumptionDevice = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/consumption/device/fetch?jobID=${jobId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsDashboardTopContent = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(`https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/top-content/content/fetch?jobID=${jobId}`, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getAnalyticsDashboardConsumptionLocation = async (options: GetAnalyticsDashboardOptions, jobId: string) => {
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

export const AnalyticsDashboardServices = {
    getAnalyticsDashboardJobIds,
    getAnalyticsDashboardConsumptionTime,
    getAnalyticsDashboardPlaysViewersTime,
    getAnalyticsDashboardConsumptionDevice,
    getAnalyticsDashboardTopContent,
    getAnalyticsDashboardConsumptionLocation
} 
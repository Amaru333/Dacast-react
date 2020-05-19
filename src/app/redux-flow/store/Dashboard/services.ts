import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getDashboardDetailsService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/dashboard',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getDashboardVodPlayRateService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/vod-play-rate/time/fetch?jobID=' + jobID,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getDashboardVodPlayService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/analytics/vod-play/time/fetch?jobID=' + jobID,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getDashboardImpressionsService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('/analytics/impressions/time/fetch?jobID=' + jobID,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getDashboardLiveViewersService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('/analytics/live-viewers/time/fetch?jobID=' + jobID,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getDashboardTopVodService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('/analytics/top-vod/content/fetch?jobID=' + jobID,
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const getDashboardTopLiveService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('/analytics/top-live/content/fetch?jobID=' + jobID,
        {
            headers: {
                Authorization: token
            }
        }
    )
}


export const DashboardServices = {
    getDashboardDetailsService,
    getDashboardVodPlayRateService,
    getDashboardVodPlayService,
    getDashboardImpressionsService,
    getDashboardLiveViewersService,
    getDashboardTopVodService,
    getDashboardTopLiveService
} 
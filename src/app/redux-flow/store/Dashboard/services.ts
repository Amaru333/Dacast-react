import axios from 'axios'
import { isTokenExpired, addTokenToHeader } from '../../../utils/token';
import { loopUntilCompleted } from '../../../../utils/LoopHttpServices';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getDashboardDetailsService = async () => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/dashboard',
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
    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/vod-play-rate/time/fetch?jobID=${jobID}`, token)
    return data
}

const getDashboardVodPlayService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/vod-play/time/fetch?jobID=${jobID}`, token)
    return data
}

const getDashboardImpressionsService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/impressions/time/fetch?jobID=${jobID}`, token)
    return data
}

const getDashboardLiveViewersService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/live-viewers/time/fetch?jobID=${jobID}`, token)
    return data
}

const getDashboardTopVodService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/top-vod/content/fetch?jobID=${jobID}`, token)
    return data
}

const getDashboardTopLiveService = async (jobID: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    var data = await loopUntilCompleted(process.env.API_BASE_URL+`/analytics/top-channels/content/fetch?jobID=${jobID}`, token)
    return data
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
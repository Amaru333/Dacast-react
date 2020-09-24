import { loopUntilCompleted } from '../../../../utils/services/axios/LoopHttpServices';
import { axiosClient } from '../../../utils/services/axios/axiosClient';

const getDashboardDetailsService = async () => {
    return await axiosClient.get('/dashboard')
}

const getDashboardVodPlayRateService = async (jobID: string) => {
    var data = await loopUntilCompleted(`/analytics/vod-play-rate/time/fetch?jobID=${jobID}`)
    return data
}

const getDashboardVodPlayService = async (jobID: string) => {
    var data = await loopUntilCompleted(`/analytics/vod-plays/time/fetch?jobID=${jobID}`)
    return data
}

const getDashboardImpressionsService = async (jobID: string) => {
    var data = await loopUntilCompleted(`/analytics/impressions/time/fetch?jobID=${jobID}`)
    return data
}

const getDashboardLiveViewersService = async (jobID: string) => {
    var data = await loopUntilCompleted(`/analytics/live-viewers/time/fetch?jobID=${jobID}`)
    return data
}

const getDashboardTopVodService = async (jobID: string) => {
    var data = await loopUntilCompleted(`/analytics/top-vods/content/fetch?jobID=${jobID}`)
    return data
}

const getDashboardTopLiveService = async (jobID: string) => {
    var data = await loopUntilCompleted(`/analytics/top-channels/content/fetch?jobID=${jobID}`)
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
import axios from 'axios';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveEngagementSettings = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/engagement',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveLiveEngagementSettings = async (data: ContentEngagementSettings) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/channels/' + data.contentId + '/settings/engagement',
        {...data.engagementSettings}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveLiveAd = (data: Ad) => {
    return axios.put(urlBase + 'live-engagement-ad', {data: data})
}

const createLiveAd = (data: Ad) => {
    return axios.post(urlBase + 'live-engagement-ad', {data: data})
}

const deleteLiveAd = (data: Ad) => {
    return axios.delete(urlBase + 'live-engagement-ad', {data: data})
}

export const liveEngagementServices = {
    getLiveEngagementSettings,
    saveLiveEngagementSettings,
    saveLiveAd,
    createLiveAd,
    deleteLiveAd
}
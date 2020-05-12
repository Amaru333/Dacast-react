import axios from 'axios';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getLiveEngagementSettings = async (liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/channels/' + liveId + '/settings/engagement',
        {
            headers: {
                Authorization: token
            }
        }
    )}

const saveLiveEngagementSettings = (data: ContentEngagementSettings) => {
    return axios.put(urlBase + 'live-engagements', {data: data})
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
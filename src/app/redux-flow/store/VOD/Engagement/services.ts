import axios from 'axios';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodEngagementSettings = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get('https://wkjz21nwg5.execute-api.us-east-1.amazonaws.com/dev/vods/' + vodId + '/settings/engagement',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodEngagementSettings = (data: ContentEngagementSettings) => {
    return axios.post(urlBase + 'vod-engagements', {data: data})
}

const saveVodAd = (data: Ad) => {
    return axios.put(urlBase + 'vod-engagement-ad', {data: data})
}

const createVodAd = (data: Ad) => {
    return axios.post(urlBase + 'vod-engagement-ad', {data: data})
}

const deleteVodAd = (data: Ad) => {
    return axios.delete(urlBase + 'vod-engagement-ad', {data: data})
}

export const vodEngagementServices = {
    getVodEngagementSettings,
    saveVodEngagementSettings,
    saveVodAd,
    createVodAd,
    deleteVodAd
}
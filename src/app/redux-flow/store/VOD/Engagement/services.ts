import axios from 'axios';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { isTokenExpired, addTokenToHeader } from '../../../../utils/token';

const urlBase = 'https://ca282677-31e5-4de4-8428-6801321ac051.mock.pstmn.io/';

const getVodEngagementSettings = async (vodId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.get(process.env.API_BASE_URL + '/vods/' + vodId + '/settings/engagement',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodEngagementSettings = async (data: ContentEngagementSettings) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/vods/' + data.contentId + '/settings/engagement',
        {...data.engagementSettings}, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

const saveVodAd = async (data: Ad[], adsId: string, vodId: string) => {
    debugger
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/vods/' + vodId + '/settings/engagement/ads',
        {
            ads: data.map((ad:Ad) => {return {timestamp: ad.timestamp, url: ad.url, ["ad-type"]: ad["ad-type"]}}),
            adsId: adsId
        }, 
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const vodEngagementServices = {
    getVodEngagementSettings,
    saveVodEngagementSettings,
    saveVodAd
}
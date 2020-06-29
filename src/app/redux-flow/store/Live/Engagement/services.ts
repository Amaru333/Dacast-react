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

const saveLiveAd = async (data: Ad[], adsId: string, liveId: string) => {
    await isTokenExpired()
    let {token} = addTokenToHeader();
    return axios.put(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/engagement/ads',
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

const getUploadUrl = async (data: string, liveId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader()
    return axios.post(process.env.API_BASE_URL + '/uploads/signatures/singlepart/' + data,
        {
            liveID: liveId
        },
        {
            headers: {
                Authorization: token
            }
        })
}

const uploadFile = (data: File, uploadUrl: string) => {
    return axios.put(uploadUrl, data)
}

const deleteFile = async (liveId: string) => {
    await isTokenExpired()
    let {token, userId} = addTokenToHeader();
    return axios.delete(process.env.API_BASE_URL + '/channels/' + liveId + '/settings/engagement/brand-image',
        {
            headers: {
                Authorization: token
            }
        }
    )
}

export const liveEngagementServices = {
    getLiveEngagementSettings,
    saveLiveEngagementSettings,
    saveLiveAd,
    getUploadUrl,
    uploadFile,
    deleteFile
}
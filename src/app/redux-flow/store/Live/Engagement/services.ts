import axios from 'axios';
import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { axiosClient } from '../../../../utils/axiosClient';

const getLiveEngagementSettings = async (liveId: string) => {
    return await axiosClient.get('/channels/' + liveId + '/settings/engagement')
}

const saveLiveEngagementSettings = async (data: ContentEngagementSettings) => {
    return await axiosClient.put('/channels/' + data.contentId + '/settings/engagement',
        {...data.engagementSettings}
    )
}

const saveLiveAd = async (data: Ad[], adsId: string, liveId: string) => {
    return await axiosClient.put('/channels/' + liveId + '/settings/engagement/ads',
        {
            ads: data.map((ad:Ad) => {return {timestamp: ad.timestamp, url: ad.url, ["ad-type"]: ad["ad-type"]}}),
            adsId: adsId
        }
    )
}

const getUploadUrl = async (data: string, liveId: string) => {
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            liveID: liveId
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}


const deleteLiveAd = async (data: Ad[], adsId: string, liveId: string) => {
    return await axiosClient.delete('/channels/' + liveId + '/settings/engagement/ads')
}

const deleteFile = async (liveId: string) => {
    return await axiosClient.delete('/channels/' + liveId + '/settings/engagement/brand-image')
}

export const liveEngagementServices = {
    getLiveEngagementSettings,
    saveLiveEngagementSettings,
    saveLiveAd,
    getUploadUrl,
    uploadFile,
    deleteFile,
    deleteLiveAd
}
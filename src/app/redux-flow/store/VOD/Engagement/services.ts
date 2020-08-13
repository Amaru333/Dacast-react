import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { axiosClient } from '../../../../utils/axiosClient';

const getVodEngagementSettings = async (vodId: string) => {
    return await axiosClient.get('/vods/' + vodId + '/settings/engagement')
}

const saveVodEngagementSettings = async (data: ContentEngagementSettings) => {
    return await axiosClient.put('/vods/' + data.contentId + '/settings/engagement',
        {
            ...data.engagementSettings
        }
    )
}

const saveVodAd = async (data: Ad[], adsId: string, vodId: string) => {
    return await axiosClient.put('/vods/' + vodId + '/settings/engagement/ads',
        {
            ads: data.map((ad:Ad) => {return {timestamp: ad.timestamp, url: ad.url, ["ad-type"]: ad["ad-type"]}}),
            adsId: adsId
        }
    )
}

const getUploadUrl = async (data: string, vodId: string) => {
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            vodID: vodId
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}

const deleteVodAd = async (vodId: string) => {
    return await axiosClient.delete('/vods/' + vodId + '/settings/engagement/ads')
}

const deleteFile = async (vodId: string) => {
    return await axiosClient.delete('/vods/' + vodId + '/settings/engagement/brand-image')
}

export const vodEngagementServices = {
    getVodEngagementSettings,
    saveVodEngagementSettings,
    saveVodAd,
    getUploadUrl,
    uploadFile,
    deleteFile,
    deleteVodAd
}
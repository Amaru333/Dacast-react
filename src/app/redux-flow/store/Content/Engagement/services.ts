import { Ad, ContentEngagementSettings } from '../../Settings/Interactions';
import { axiosClient } from '../../../../utils/axiosClient';

const getContentEngagementSettings = async (contentId: string, contentType: string) => {
    return await axiosClient.get(`${contentType}/${contentId}/settings/engagement`)
}

const saveContentEngagementSettings = async (data: ContentEngagementSettings, contentType: string) => {
    return await axiosClient.put(`${contentType}/${data.contentId}/settings/engagement`,
        {...data.engagementSettings}
    )
}

const lockSection = async (lockedSection: string, contentId: string, contentType: string, unlock?: boolean) => {
    let action = unlock ? 'unlock' : 'lock'
    return await axiosClient.put(`${contentType}/${contentId}/settings/engagement/${lockedSection}/${action}`)
}

const saveContentAd = async (data: Ad[], contentId: string, contentType: string) => {
    return await axiosClient.put(`${contentType}/${contentId}/settings/engagement/ads`,
        {
            ads: data.map((ad:Ad) => {return {timestamp: ad.timestamp, url: ad.url, ["ad-type"]: ad["ad-type"]}}),
        }
    )
}

const getUploadUrl = async (data: string, contentId: string) => {
    return await axiosClient.post('/uploads/signatures/singlepart/' + data,
        {
            contentID: contentId
        }
    )
}

const uploadFile = async (data: File, uploadUrl: string) => {
    return await axiosClient.put(uploadUrl, data, {authRequired: false})
}


const deleteContentAd = async (data: Ad[], adsId: string, contentId: string, contentType: string) => {
    return await axiosClient.delete(`${contentType}/${contentId}/settings/engagement/ads`)
}

const deleteFile = async (contentId: string, contentType: string) => {
    return await axiosClient.delete(`${contentType}/${contentId}/settings/brand-image`)
}

export const contentEngagementServices = {
    getContentEngagementSettings,
    saveContentEngagementSettings,
    lockSection,
    saveContentAd,
    getUploadUrl,
    uploadFile,
    deleteFile,
    deleteContentAd
}
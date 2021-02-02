import { PostUploadUrlInput, PostUploadUrlOutput, PutContentAdsInput, PutContentEngagementSettingsInput, PutContentLockEngagementSettingsInput } from "../../../../../DacastSdk/common";
import { AdEnpoint, AdTypeEndpoint, EngagementSettingsEndoint } from "../../../../../DacastSdk/settings";
import { capitalizeFirstLetter } from "../../../../../utils/utils";
import { ContentType } from "../../Common/types";
import { Ad, AdType, ContentEngagementSettings, EngagementInfo } from "../../Settings/Engagement/types";
import { EngagementSectionsLock } from "./types";

export const formatGetContentEngagementSettingsInput = (data: string): string => data

export const formatGetContentEngagementSettingsOutput = (contentType: ContentType) => (data: EngagementSettingsEndoint, dataReact: string): ContentEngagementSettings & {contentType: ContentType} => {
    let formattedData: ContentEngagementSettings & {contentType: ContentType} = {
        contentId: dataReact,
        engagementSettings: {
            ...data,
            adsSettings: {
                ...data.adsSettings,
                ads: data.adsSettings.ads.map((ad: AdEnpoint): Ad => {
                    return {
                        timestamp: ad.timestamp,
                        url: ad.url,
                        type: capitalizeFirstLetter(ad["ad-type"]) as AdType,
                        id: ad.url + ad.timestamp + ad["ad-type"]
                    }
                })
            }
        },
        contentType: contentType
    }
    // contentId: contentId, contentType: contentType, engagementSettings: {...response.data.data, adsId: response.data.data.adsID}}
    return formattedData
}

export const formatPutContentEngagementInput = (data: ContentEngagementSettings): PutContentEngagementSettingsInput => {
    let formattedData: PutContentEngagementSettingsInput = {
        adsSettings: {
            ...data.engagementSettings.adsSettings,
            ads: data.engagementSettings.adsSettings && data.engagementSettings.adsSettings.ads ? data.engagementSettings.adsSettings.ads.map((ad: Ad): AdEnpoint => {
                return {
                    timestamp: ad.timestamp,
                    url: ad.url,
                    ["ad-type"]: ad.type as AdTypeEndpoint,
                }
            })
            : null
        },
        brandImageSettings: {
            ...data.engagementSettings.brandImageSettings
        },
        brandTextSettings: {
            ...data.engagementSettings.brandTextSettings
        },
        endScreenSettings: {
            ...data.engagementSettings.endScreenSettings
        },
        id: data.contentId
    }

    return formattedData
}

export const formatPutContentEngagementOutput = (contentType: ContentType) => (endpointResponse: null, data: ContentEngagementSettings): ContentEngagementSettings & {contentType: ContentType} => {
    let formattedData: ContentEngagementSettings & {contentType: ContentType} = {
        ...data,
        contentType: contentType
    }

    return formattedData
}

export const formatPutContentLockEngagementSettingsInput = (data: {contentId: string; section: EngagementSectionsLock; action: boolean}): PutContentLockEngagementSettingsInput => {
    let formattedData: PutContentLockEngagementSettingsInput = {
        id: data.contentId,
        section: data.section,
        action: data.action ? 'unlock' : 'lock'
    }

    return formattedData
}

export const formatPutContentAdsSettingsInput = (data: {ads: Ad[], contentId: string}): PutContentAdsInput => {
    let formattedData: PutContentAdsInput = {
        ads: data.ads.map(ad => {
            return {
                "ad-type": ad.type.toLowerCase() as AdTypeEndpoint,
                timestamp: ad.timestamp,
                url: ad.url
            }
        }),
        id: data.contentId
    }

    return formattedData
}

export const formatPostVodBrandImageUrlInput = (contentId: string): PostUploadUrlInput => {

    let formattedData: PostUploadUrlInput = {
        uploadType: 'player-watermark',
        uploadRequestBody: {
            vodID: contentId
        }
    }
    return formattedData
}

export const formatPostLiveBrandImageUrlInput = (contentId: string): PostUploadUrlInput => {

    let formattedData: PostUploadUrlInput = {
        uploadType: 'player-watermark',
        uploadRequestBody: {
            channelID: contentId
        }
    }
    return formattedData
}

export const formatPostContentBrandImageUrlOutput = (contentType: ContentType) => (data: PostUploadUrlOutput, dataReact: string): {presignedURL: string, contentId: string; contentType: string} => {
    let formattedData: {presignedURL: string, contentId: string; contentType: string} = {
        presignedURL: data.presignedURL,
        contentId: dataReact,
        contentType: contentType
    }

    return formattedData
}
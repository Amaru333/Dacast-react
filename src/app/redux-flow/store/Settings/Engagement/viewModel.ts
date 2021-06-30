import { PostUploadUrlInput } from '../../../../../DacastSdk/common';
import { AdEnpoint, AdTypeEndpoint, EngagementSettingsEndpoint, PutAdInput } from '../../../../../DacastSdk/settings';
import { capitalizeFirstLetter } from '../../../../../utils/utils';
import { userToken } from '../../../../utils/services/token/tokenService';
import { Ad, AdType, EngagementInfo } from './types';

export const formatGetEngagementOutput = (data: EngagementSettingsEndpoint): EngagementInfo => {
    let formattedData: EngagementInfo = {
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
    }

    return formattedData
}

export const formatPutEngagementInput = (data: EngagementInfo): EngagementSettingsEndpoint => {
    let formattedData: EngagementSettingsEndpoint = {
        adsSettings: {
            ...data.adsSettings,
            ads: data.adsSettings.ads.map((ad: Ad): AdEnpoint => {
                return {
                    timestamp: ad.timestamp,
                    url: ad.url,
                    ["ad-type"]: ad.type as AdTypeEndpoint,
                }
            })
        },
        brandImageSettings: {
            ...data.brandImageSettings
        },
        brandTextSettings: {
            ...data.brandTextSettings,
            brandText: data.brandTextSettings && data.brandTextSettings.brandText ? data.brandTextSettings.brandText : null,
            brandTextLink: data.brandTextSettings && data.brandTextSettings.brandTextLink ? data.brandTextSettings.brandTextLink : null,
        },
        endScreenSettings: {
            ...data.endScreenSettings,
            endScreenText: data.endScreenSettings && data.endScreenSettings.endScreenText ? data.endScreenSettings.endScreenText : null,
            endScreenTextLink: data.endScreenSettings && data.endScreenSettings.endScreenTextLink ? data.endScreenSettings.endScreenTextLink : null,
        },
        googleAnalyticsSettings: {
            ...data.googleAnalyticsSettings
        }
    }

    return formattedData
}

export const formatPutAdsSettingsInput = (data: Ad[]): PutAdInput => {
    let formattedData: PutAdInput = {
        ads: data.map(ad => {
            return {
                "ad-type": ad.type.toLowerCase() as AdTypeEndpoint,
                timestamp: ad.timestamp,
                url: ad.url
            }
        })
    }

    return formattedData
}

export const formatPostUserBrandImageUrlInput = (): PostUploadUrlInput => {
    let formattedData: PostUploadUrlInput = {
        uploadType: 'player-watermark',
        uploadRequestBody: {
            userID: userToken.getUserInfoItem('user-id')
        }
    }
    return formattedData
}
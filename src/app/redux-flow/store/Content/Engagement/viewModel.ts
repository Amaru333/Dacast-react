import { AdEnpoint, EngagementSettingsEndoint } from "../../../../../DacastSdk/settings";
import { capitalizeFirstLetter } from "../../../../../utils/utils";
import { ContentType } from "../../Common/types";
import { Ad, AdType, ContentEngagementSettings } from "../../Settings/Engagement/types";

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
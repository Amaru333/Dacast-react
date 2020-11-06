import { AdEnpoint, EngagementSettingsEndoint } from '../../../../../DacastSdk/settings';
import { capitalizeFirstLetter } from '../../../../../utils/utils';
import { Ad, AdType, EngagementInfo } from './types';

export const formatGetEngagementOutput = (data: EngagementSettingsEndoint): EngagementInfo => {
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
import { GetAnalyticsInput, GetAnalyticsOutput } from '../../../../../DacastSdk/analytics'
import { formatWatchResults } from '../../../../shared/Analytics/viewModel';
import { AccountAnalyticsParameters } from '../types';
import { AccountAnalyticsEngagement, AccountAnalyticsEngagementState } from './types';


export const formatGetAccountAnalyticsEngagementOutput = (response: GetAnalyticsOutput, data: AccountAnalyticsParameters): AccountAnalyticsEngagementState => {

    var audienceData: AccountAnalyticsEngagement = formatWatchResults(response, data);
    return {
        data: Object.keys(audienceData).length === 0 && audienceData.constructor === Object ? undefined : audienceData
    }
}

export const formatGetAccountAnalyticsInput = (data: AccountAnalyticsParameters): GetAnalyticsInput => {
    let formattedData: GetAnalyticsInput = {
        id: null,
        dimension: data.dimension,
        time_range: data.timeRange,
        type: 'account',
        start: data.start ? Math.floor(data.start / 1000) : undefined,
        end: data.end ? Math.floor(data.end / 1000) : undefined
    }
    return formattedData
}


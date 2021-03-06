import { AudienceAnalyticsState, ContentAnalyticsFinalState } from '.'
import { GetAnalyticsInput, GetAnalyticsOutput } from '../../../../../DacastSdk/analytics'
import { formatAudienceResults, formatRealTimeResults, formatSalesResults, formatWachResults } from '../../../../shared/Analytics/viewModel';
import { ContentAnalyticsParameters, RealTimeAnalyticsState, SalesAnalyticsState, WatchAnalyticsState } from './types';


export const formatGetContentAnalyticsOutput = (response: GetAnalyticsOutput, data: ContentAnalyticsParameters): { contentId: string; contentType: string; data: ContentAnalyticsFinalState } => {

    var audienceData: AudienceAnalyticsState = {};
    var salesData: SalesAnalyticsState = {};
    var watchData: WatchAnalyticsState = {};
    var realTimeData: RealTimeAnalyticsState = {};

    if ((data.timeRange.includes('MINUTE') || data.timeRange.includes('HOUR')) && data.timeRange !== 'LAST_24_HOURS') {
        realTimeData =  formatRealTimeResults(response, data)
    } else {
        audienceData = formatAudienceResults(response, data)
        watchData = formatWachResults(response, data)
        salesData = formatSalesResults(response, data)
    }

    return {
        contentId: data.id,
        contentType: data.type,
        data: {
            audience: Object.keys(audienceData).length === 0 && audienceData.constructor === Object ? undefined : audienceData,
            sales: Object.keys(salesData).length === 0 && salesData.constructor === Object ? undefined : salesData,
            watch: Object.keys(watchData).length === 0 && watchData.constructor === Object ? undefined : watchData,
            realtime: Object.keys(realTimeData).length === 0 && realTimeData.constructor === Object ? undefined : realTimeData,
        }
    }
}

export const formatGetContentAnalyticsInput = (data: ContentAnalyticsParameters): GetAnalyticsInput => {
    let formattedData: GetAnalyticsInput = {
        id: data.id,
        dimension: data.dimension,
        time_range: data.timeRange,
        type: data.type,
        start: data.start ? Math.floor(data.start / 1000) : undefined,
        end: data.end ? Math.floor(data.end / 1000) : undefined
    }
    return formattedData
}


import { GetAnalyticsInput, GetAnalyticsOutput, GetAnalyticsTopContentInput, GetAnalyticsTopContentOutput } from "../../../../../DacastSdk/analytics"
import { formatTimeToUnit } from "../../../../../utils/formatUtils"
import { formatAudienceResults, formatDataConsumptionResults, formatSalesResults, formatWatchResults } from "../../../../shared/Analytics/viewModel"
import { AccountAnalyticsParameters } from "../types"
import { AnalyticsDashboardNewInfo, AnalyticsTopContentInfo, AnalyticsTopContentParams } from "./types"

export const formatGetDashboardNewAnalyticsOuput = (response: GetAnalyticsOutput, data: AccountAnalyticsParameters): AnalyticsDashboardNewInfo => {
    let audienceData = formatAudienceResults(response, data)
    let paywallData = formatSalesResults(response, data)
    let engagementData = formatWatchResults(response, data)
    let dataConsumpationdata = formatDataConsumptionResults(response, data)

    let formattedData: AnalyticsDashboardNewInfo = {
        audienceLocation: audienceData.plays.location.data,
        engagement: formatTimeToUnit(engagementData.time.data.reduce((acc, next) => acc + next, 0), 'h'),
        paywall: paywallData.revenue.time.data.reduce((acc, next) => acc + next, 0),
        dataConsumption: dataConsumpationdata.dataConsumptionByTime.data.reduce((acc, next) => acc + next, 0),
        plays: audienceData.plays.time.data.reduce((acc, next) => acc + next, 0)
    }

    return formattedData
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

export const formatGetAnalyticsTopContentInput = (data: AnalyticsTopContentParams): GetAnalyticsTopContentInput => {
    let formattedData: GetAnalyticsTopContentInput = {
        type: 'account',
        metrics: data.metrics,
        sort_by: data.sortBy,
        start_at: data.startAt
    }

    return formattedData
}

export const formatGetAnalyticsTopContentOutput = (data: GetAnalyticsTopContentOutput): AnalyticsTopContentInfo[] => {

    let tempArray = data.contents.length > 10 ? data.contents.slice(0, 10) : data.contents
    let formattedData: AnalyticsTopContentInfo[] = tempArray.map(content => {
        return {
            id: content.id,
            title: content.title && content.title.length > 0 ? content.title : 'Deleted Content' ,
            type: content.type,
            total: content.metrics.impressions ? content.metrics.impressions : 0
        }
    })
    return formattedData
}
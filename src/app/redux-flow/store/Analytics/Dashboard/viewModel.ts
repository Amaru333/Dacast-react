import { GetAnalyticsInput, GetAnalyticsOutput } from "../../../../../DacastSdk/analytics"
import { formatTimeToUnit } from "../../../../../utils/formatUtils"
import { formatAudienceResults, formatDataConsumptionResults, formatSalesResults, formatWatchResults } from "../../../../shared/Analytics/viewModel"
import { AccountAnalyticsParameters } from "../types"
import { AnalyticsDashboardNewInfo } from "./types"

export const formatGetDashboardNewAnalyticsOuput = (response: GetAnalyticsOutput, data: AccountAnalyticsParameters): AnalyticsDashboardNewInfo => {
    let audienceData = formatAudienceResults(response, data)
    let paywallData = formatSalesResults(response, data)
    let engagementData = formatWatchResults(response, data)
    let dataConsumpationdata = formatDataConsumptionResults(response, data)

    let formattedData: AnalyticsDashboardNewInfo = {
        audienceLocation: audienceData.playsImpressionsByLocation.data,
        engagement: formatTimeToUnit(engagementData.watchByTime.data.reduce((acc, next) => acc + next, 0), 'h'),
        paywall: paywallData.salesRevenuesByTime.revenues.reduce((acc, next) => acc + next, 0),
        dataConsumption: dataConsumpationdata.dataConsumptionByTime.data.reduce((acc, next) => acc + next, 0),
        plays: audienceData.playsImpressionsByTime.plays.reduce((acc, next) => acc + next, 0)
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

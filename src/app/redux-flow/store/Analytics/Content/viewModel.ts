import { GetAnalyticsOutput, GetAnalyticsTopContentOutput } from "../../../../../DacastSdk/analytics";
import { formatAudienceResults, formatWatchResults } from "../../../../shared/Analytics/viewModel";
import { ContentAnalyticsParameters } from "../../Content/Analytics/types";
import { AnalyticsContent, AnalyticsContentData } from "./types";

export const formatGetAnalyticsContentListOutput = (data: GetAnalyticsTopContentOutput): AnalyticsContent[] => {
    let formattedData: AnalyticsContent[] = data.contents.map(content => {
        return {
            title: content.title,
            type: content.type,
            id: content.id,
            metrics: (content.metrics.impressions || content.metrics.plays) ? {impressions: content.metrics.impressions, plays: content.metrics.plays} : {watchtime: content.metrics.watchtime}
        }
    })

    return formattedData
}

export const formatGetSpecificContentAnalyticsOutput = (response: GetAnalyticsOutput, data: ContentAnalyticsParameters): AnalyticsContentData => {
    if(data.dimension.some(d => d.indexOf('IMPRESSIONS') !== -1 || d.indexOf('PLAYS') !== -1)) {
        let audienceData = formatAudienceResults(response, data)
        return audienceData
    }

    let watchData = formatWatchResults(response, data)

    return watchData
}
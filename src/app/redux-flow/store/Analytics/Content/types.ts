import { ContentType } from "../../Common/types";
import { AudienceAnalyticsState, WatchAnalyticsState } from "../../Content/Analytics";
import { AnalyticsTopContentDimensions } from "../Dashboard/types";

export enum ActionTypes {
    GET_ANALYTICS_CONTENT_LIST = "@@ANALYTICS_CONTENT/GET_ANALYTICS_CONTENT_LIST",
    GET_ANALYTICS_CONTENT_DATA = "@@ANALYTICS_CONTENT/GET_ANALYTICS_CONTENT_DATA",
}

export interface AnalyticsContent{
    id: string
    title: string
    type: ContentType
    metrics: {
        [key in AnalyticsTopContentDimensions]: number
    }
}

export type AnalyticsContentData = AudienceAnalyticsState | WatchAnalyticsState

export interface AnalyticsContentState {
    contentList: AnalyticsContent[]
    contentData: AnalyticsContentData
}

export const defaultAnalyticsContentState: AnalyticsContentState = {
    contentList: [],
    contentData: null
}


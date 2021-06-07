import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { applyViewModel } from "../../../../utils/utils";
import { formatGetContentAnalyticsInput } from "../../Content/Analytics/viewModel";
import { formatGetAnalyticsTopContentInput } from "../Dashboard/viewModel";
import { ActionTypes, AnalyticsContent, AnalyticsContentData } from "./types";
import { formatGetAnalyticsContentListOutput, formatGetSpecificContentAnalyticsOutput } from "./viewModel";

export interface GetAnalyticsContentList {
    type: ActionTypes.GET_ANALYTICS_CONTENT_LIST;
    payload: AnalyticsContent[]
}

export interface GetSpecificContentAnalytics {
    type: ActionTypes.GET_ANALYTICS_CONTENT_DATA
    payload: AnalyticsContentData
}

export type Action = GetAnalyticsContentList | GetSpecificContentAnalytics

export const getAnalyticsContentListAction = applyViewModel(dacastSdk.getTopContentAnalytics, formatGetAnalyticsTopContentInput, formatGetAnalyticsContentListOutput, ActionTypes.GET_ANALYTICS_CONTENT_LIST, null, 'Couldn\'t get top content list')
export const getSpecificContentAnalyticsAction = applyViewModel(dacastSdk.getContentAnalytics, formatGetContentAnalyticsInput, formatGetSpecificContentAnalyticsOutput, ActionTypes.GET_ANALYTICS_CONTENT_DATA, null, 'Couldn\'t get analytics for this content')

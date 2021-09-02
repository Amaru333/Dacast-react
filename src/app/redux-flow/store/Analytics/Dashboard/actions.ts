import { ActionTypes, AnalyticsDashboardNewInfo, AnalyticsTopContentInfo} from "./types";
import { applyViewModel } from "../../../../utils/utils";
import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { formatGetAccountAnalyticsInput, formatGetAnalyticsTopContentInput, formatGetAnalyticsTopContentOutput, formatGetDashboardNewAnalyticsOuput } from "./viewModel";

export interface GetAnalyticsDashboardNew {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD_NEW;
    payload: AnalyticsDashboardNewInfo;
}

export interface GetAnalyticsTopContent {
    type: ActionTypes.GET_ANALYTICS_TOP_CONTENT;
    payload: AnalyticsTopContentInfo[];
}

export const getAnalyticsDashboardNewAction = applyViewModel(dacastSdk.getAccountAnalytics, formatGetAccountAnalyticsInput, formatGetDashboardNewAnalyticsOuput, ActionTypes.GET_ANALYTICS_DASHBOARD_NEW, null, 'Couldn\'t get dashboard analytics')
export const getAnalyticsTopContentAction = applyViewModel(dacastSdk.getTopContentAnalytics, formatGetAnalyticsTopContentInput, formatGetAnalyticsTopContentOutput, ActionTypes.GET_ANALYTICS_TOP_CONTENT, null, 'Couldn\'t get top content')

export type Action = GetAnalyticsDashboardNew | GetAnalyticsTopContent;
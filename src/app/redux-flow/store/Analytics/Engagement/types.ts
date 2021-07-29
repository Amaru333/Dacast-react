import { WatchAnalyticsState } from "../../Content/Analytics"

export enum ActionTypes {
    GET_ACCOUNT_ANALYTICS_ENGAGEMENT = "@@analytics/GET_ACCOUNT_ANALYTICS_ENGAGEMENT",
}

export type AccountAnalyticsEngagement = WatchAnalyticsState

export interface AccountAnalyticsEngagementState {
    data?: AccountAnalyticsEngagement
}

export type AnalyticsDimensionsEngagement = 'WATCHTIME_BY_TIME_ACCT' | 'WATCHTIME_BY_DEVICE_ACCT' | 'WATCHTIME_BY_COUNTRY_ACCT'

export const AccountEngagementDimension: AnalyticsDimensionsEngagement[] = ['WATCHTIME_BY_TIME_ACCT', 'WATCHTIME_BY_DEVICE_ACCT','WATCHTIME_BY_COUNTRY_ACCT']

export const defaultStateAccountAnalyticsEngagement: AccountAnalyticsEngagementState = {}

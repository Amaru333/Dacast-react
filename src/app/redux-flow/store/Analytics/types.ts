import { combineReducers, Reducer } from 'redux';
import { AnalyticsDashboardReducer, AnalyticsDashboardState, AnalyticsDashboardInitialState } from './Dashboard';
import { AnalyticsRealTimeState, AnalyticsRealTimeReducer, AnalyticsRealTimeInitialState } from './RealTime';
import { AnalyticsViewershipReducer, AnalyticsViewershipState, AnalyticsViewershipInitialState } from './Viewership';
import { AnalyticsRevenueInfos, AnalyticsRevenueReducer, AnalyticsRevenueInitialState } from './Revenue';
import { AccountAnalyticsAudienceState, defaultStateAccountAnalyticsAudience } from './Audience/types';
import { AudienceReducer } from './Audience/reducer';
import { AccountAnalyticsPaywallState, defaultStateAccountAnalyticsPaywall } from './Paywall/types';
import { AnalyticsPaywallReducer } from './Paywall/reducer';
import { AnalyticsEngagementReducer } from './Engagement/reducer';
import { AccountAnalyticsEngagementState, defaultStateAccountAnalyticsEngagement } from './Engagement/types';

export interface  AnalyticsState {
    dashboard: AnalyticsDashboardState;
    realTime: AnalyticsRealTimeState;
    viewership: AnalyticsViewershipState;
    revenue: AnalyticsRevenueInfos;
    audience: AccountAnalyticsAudienceState;
    paywall: AccountAnalyticsPaywallState;
    engagement: AccountAnalyticsEngagementState;
}

export const analyticsInitialState: AnalyticsState = {
    dashboard: AnalyticsDashboardInitialState,
    realTime: AnalyticsRealTimeInitialState,
    viewership: AnalyticsViewershipInitialState,
    revenue: AnalyticsRevenueInitialState,
    audience: defaultStateAccountAnalyticsAudience,
    paywall: defaultStateAccountAnalyticsPaywall,
    engagement: defaultStateAccountAnalyticsEngagement
}

export const AnalyticsReducer: Reducer<AnalyticsState> = combineReducers({
    dashboard: AnalyticsDashboardReducer,
    realTime: AnalyticsRealTimeReducer,
    viewership: AnalyticsViewershipReducer,
    revenue: AnalyticsRevenueReducer,
    audience: AudienceReducer,
    paywall: AnalyticsPaywallReducer,
    engagement: AnalyticsEngagementReducer
})

export interface AccountAnalyticsParameters {
    id: string;
    dimension: AnalyticsAccountDimensions[];
    timeRange: TimeRangeAccountAnalytics,
    type: 'account',
    start?: number,
    end?: number
}

export type TimeRangeAccountAnalytics = 'LAST_24_HOURS' | 'LAST_WEEK' | 'LAST_MONTH' | 'LAST_6_MONTHS' | 'YEAR_TO_DATE' | 'CUSTOM'
export type AnalyticsAccountDimensions = 'SALES_BY_TIME_ACCT' | 'SALES_BY_COUNTRY_ACCT' | 'REVENUES_BY_TIME_ACCT' | 'REVENUES_BY_COUNTRY_ACCT' | 'PLAYS_BY_TIME_ACCT' | 'PLAYS_BY_DEVICE_ACCT' | 'PLAYS_BY_COUNTRY_ACCT' | 'IMPRESSIONS_BY_TIME_ACCT' | 'IMPRESSIONS_BY_DEVICE_ACCT' | 'IMPRESSIONS_BY_COUNTRY_ACCT' | 'WATCHTIME_BY_TIME_ACCT' | 'WATCHTIME_BY_DEVICE_ACCT' | 'WATCHTIME_BY_COUNTRY_ACCT'
import { combineReducers, Reducer } from 'redux';
import { AnalyticsDashboardReducer, AnalyticsDashboardState, AnalyticsDashboardInitialState } from './Dashboard';
import { AnalyticsRealTimeState, AnalyticsRealTimeReducer, AnalyticsRealTimeInitialState } from './RealTime';
import { AnalyticsViewershipReducer, AnalyticsViewershipState, AnalyticsViewershipInitialState } from './Viewership';
import { AnalyticsRevenueInfos, AnalyticsRevenueReducer, AnalyticsRevenueInitialState } from './Revenue';
import { AccountAnalyticsAudienceState, defaultStateAccountAnalyticsAudience } from './Audience/types';
import { AudienceReducer } from './Audience/reducer';

export interface  AnalyticsState {
    dashboard: AnalyticsDashboardState;
    realTime: AnalyticsRealTimeState;
    viewership: AnalyticsViewershipState;
    revenue: AnalyticsRevenueInfos;
    audience: AccountAnalyticsAudienceState;
}

export const analyticsInitialState: AnalyticsState = {
    dashboard: AnalyticsDashboardInitialState,
    realTime: AnalyticsRealTimeInitialState,
    viewership: AnalyticsViewershipInitialState,
    revenue: AnalyticsRevenueInitialState,
    audience: defaultStateAccountAnalyticsAudience
}

export const AnalyticsReducer: Reducer<AnalyticsState> = combineReducers({
    dashboard: AnalyticsDashboardReducer,
    realTime: AnalyticsRealTimeReducer,
    viewership: AnalyticsViewershipReducer,
    revenue: AnalyticsRevenueReducer,
    audience: AudienceReducer
})
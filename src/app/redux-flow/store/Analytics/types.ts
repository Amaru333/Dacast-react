import { combineReducers, Reducer } from 'redux';
import { AnalyticsDashboardReducer, AnalyticsDashboardState, AnalyticsDashboardInitialState } from './Dashboard';
import { AnalyticsRealTimeState, AnalyticsRealTimeReducer, AnalyticsRealTimeInitialState } from './RealTime';
import { AnalyticsViewershipReducer, AnalyticsViewershipState, AnalyticsViewershipInitialState } from './Viewership';
import { AnalyticsRevenueState, AnalyticsRevenueReducer, AnalyticsRevenueInitialState } from './Revenue';

export interface  AnalyticsState {
    dashboard: AnalyticsDashboardState;
    realTime: AnalyticsRealTimeState;
    viewership: AnalyticsViewershipState;
    revenue: AnalyticsRevenueState;
}

export const analyticsInitialState: AnalyticsState = {
    dashboard: AnalyticsDashboardInitialState,
    realTime: AnalyticsRealTimeInitialState,
    viewership: AnalyticsViewershipInitialState,
    revenue: AnalyticsRevenueInitialState
}

export const AnalyticsReducer: Reducer<AnalyticsState> = combineReducers({
    dashboard: AnalyticsDashboardReducer,
    realTime: AnalyticsRealTimeReducer,
    viewership: AnalyticsViewershipReducer,
    revenue: AnalyticsRevenueReducer
})

import { combineReducers, Reducer } from 'redux';
import { AnalyticsDashboardReducer, AnalyticsDashboardState } from './Dashboard';
import { AnalyticsRealTimeState, AnalyticsRealTimeReducer } from './RealTime';
import { AnalyticsViewershipReducer, AnalyticsViewershipState } from './Viewership';
import { AnalyticsRevenueState, AnalyticsRevenueReducer, AnalyticsRevenueInitialState } from './Revenue';

export interface  AnalyticsState {
    dashboard: false | AnalyticsDashboardState;
    realTime: false | AnalyticsRealTimeState;
    viewership: false | AnalyticsViewershipState;
    revenue: AnalyticsRevenueState;
}

export const analyticsInitialState: AnalyticsState = {
    dashboard: false,
    realTime: false,
    viewership: false,
    revenue: AnalyticsRevenueInitialState
}

export const AnalyticsReducer: Reducer<AnalyticsState> = combineReducers({
    dashboard: AnalyticsDashboardReducer,
    realTime: AnalyticsRealTimeReducer,
    viewership: AnalyticsViewershipReducer,
    revenue: AnalyticsRevenueReducer
})

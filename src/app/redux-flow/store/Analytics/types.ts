import { combineReducers, Reducer } from 'redux';
import { AnalyticsDashboardReducer, AnalyticsDashboardState } from './Dashboard';
import { AnalyticsRealTimeState, AnalyticsRealTimeReducer } from './RealTime';

export interface  AnalyticsState {
    dashboard: false | AnalyticsDashboardState;
    realTime: false | AnalyticsRealTimeState;
}

export const analyticsInitialState: AnalyticsState = {
    dashboard: false,
    realTime: false
}

export const AnalyticsReducer: Reducer<AnalyticsState> = combineReducers({
    dashboard: AnalyticsDashboardReducer,
    realTime: AnalyticsRealTimeReducer
})

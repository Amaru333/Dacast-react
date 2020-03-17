import { combineReducers, Reducer } from 'redux';
import { AnalyticsDashboardReducer, AnalyticsDashboardState } from './Dashboard';
import { AnalyticsRealTimeState, AnalyticsRealTimeReducer } from './RealTime';
import { AnalyticsViewershipReducer, AnalyticsViewershipState } from './Viewership';

export interface  AnalyticsState {
    dashboard: false | AnalyticsDashboardState;
    realTime: false | AnalyticsRealTimeState;
    viewership: false | AnalyticsViewershipState;
}

export const analyticsInitialState: AnalyticsState = {
    dashboard: false,
    realTime: false,
    viewership: false
}

export const AnalyticsReducer: Reducer<AnalyticsState> = combineReducers({
    dashboard: AnalyticsDashboardReducer,
    realTime: AnalyticsRealTimeReducer,
    viewership: AnalyticsViewershipReducer
})

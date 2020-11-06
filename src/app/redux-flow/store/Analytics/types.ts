import { ContentAnalyticsFinalState } from '../Content/Analytics';


export enum ActionTypes {
    GET_REVENUE_ANALYTICS = "@@analytics/GET_REVENUE_ANALYTICS",
    GET_DATA_ANALYTICS = "@@analytics/GET_DATA_ANALYTICS",
    GET_AUDIENCE_ANALYTICS = "@@analytics/GET_AUDIENCE_ANALYTICS",
}

export type AnalyticsState = {} | ContentAnalyticsFinalState ;

export const analyticsInitialState: AnalyticsState = {};

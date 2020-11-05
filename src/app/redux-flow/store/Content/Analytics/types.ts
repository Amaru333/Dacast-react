import { LocationItem } from '../../Analytics/Dashboard';

export enum ActionTypes {
    GET_CONTENT_ANALYTICS = "@@content_analytics/GET_CONTENT_ANALYTICS",
}

export interface AudienceAnalyticsState {
    playsImpressionsByTime: {
        labels: string[];
        plays: number[];
        impressions: number[];
    };
    playsImpressionsByDevice: {
        labels: string[];
        plays: number[];
        impressions: number[];
    };
    playsImpressionsByLocation: LocationItem[];
}

export interface SalesAnalyticsState {
    salesRevenuesByTime: {
        labels: string[];
        sales: number[];
        revenues: number[];
    };
    salesRevenuesByDevice: {
        labels: string[];
        sales: number[];
        revenues: number[];
    };
    salesRevenuesByLocation: LocationItem[];
}

export interface DataAnalyticsState {
    dataByTime: {
        labels: string[];
        data: number[];
    },
    dataByDevice: {
        labels: string[];
        data: number[];
    },
    dataByLocation: LocationItem[];
}

export interface ContentAnalyticsFinalState { 
    audience: AudienceAnalyticsState,
    sales: SalesAnalyticsState,
    data: DataAnalyticsState
}

export type ContentAnalyticsState = {} | {'channel'?: ContentAnalyticsFinalState, 'vod'?: ContentAnalyticsFinalState } ;

export const defaultStateContentAnalytics: ContentAnalyticsState = {};

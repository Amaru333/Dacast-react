import { LocationItem } from '../../Analytics/Dashboard';

export enum ActionTypes {
    GET_CONTENT_ANALYTICS = "@@content_analytics/GET_CONTENT_ANALYTICS",
}

export interface AudienceAnalyticsState {
    playsImpressionsByTime: {
        labels: string[];
        plays: number[];
        impressions: number[];
        table: {plays: number; impressions: number; label: string}[]
    };
    playsImpressionsByDevice: {
        labels: string[];
        plays: number[];
        impressions: number[];
        table: {plays: number; impressions: number; label: string}[]
    };
    playsImpressionsByLocation: {
        data: LocationItem[];
        table: {plays: number; label: string}[];
    }
}

export interface SalesAnalyticsState {
    salesRevenuesByTime: {
        labels: string[];
        sales: number[];
        revenues: number[];
        table: {sales: number; revenues: number; label: string}[]
    };
    salesRevenuesByDevice: {
        labels: string[];
        sales: number[];
        revenues: number[];
        table: {sales: number; revenues: number; label: string}[]
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

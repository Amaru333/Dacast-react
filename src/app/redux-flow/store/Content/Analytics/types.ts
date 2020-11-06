export enum ActionTypes {
    GET_CONTENT_ANALYTICS = "@@content_analytics/GET_CONTENT_ANALYTICS",
}

export type LocationItem = {
    city: string;
    position: {
        latitude: number;
        longitude: number;
    };
    value: number;
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
    salesRevenuesByLocation: { 
        data: LocationItem[];
        table: {revenues: number; label: string}[]
    }
}

export interface DataAnalyticsState {
    dataByTime: {
        labels: string[];
        data: number[];
        table: {data: number; label: string}[];
    },
    dataByDevice: {
        labels: string[];
        data: number[];
        table: {data: number; label: string}[];
    },
    dataByLocation: { 
        data: LocationItem[];
        table: {data: number; label: string}[];
    }
}

export interface ContentAnalyticsFinalState { 
    audience: AudienceAnalyticsState,
    sales: SalesAnalyticsState,
    data: DataAnalyticsState
}

export type ContentAnalyticsState = {} | {'channel'?: ContentAnalyticsFinalState, 'vod'?: ContentAnalyticsFinalState } ;

export const defaultStateContentAnalytics: ContentAnalyticsState = {};

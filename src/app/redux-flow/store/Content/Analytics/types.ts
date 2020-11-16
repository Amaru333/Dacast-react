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
    },
    error?: boolean
}

export interface SalesAnalyticsState {
    salesRevenuesByTime: {
        labels: string[];
        sales: number[];
        revenues: number[];
        table: {sales: number; revenues: number; label: string}[]
    };
    // salesRevenuesByDevice: {
    //     labels: string[];
    //     sales: number[];
    //     revenues: number[];
    //     table: {sales: number; revenues: number; label: string}[]
    // };
    salesRevenuesByLocation: { 
        data: LocationItem[];
        table: {revenues: number; label: string}[]
    }
}

export interface WatchAnalyticsState {
    watchByTime: {
        labels: string[];
        data: number[];
        table: {data: number; label: string}[];
    },
    watchByDevice: {
        labels: string[];
        data: number[];
        table: {data: number; label: string}[];
    },
    watchByLocation: { 
        data: LocationItem[];
        table: {data: number; label: string}[];
    }
}

export interface ContentAnalyticsFinalState { 
    audience: AudienceAnalyticsState,
    sales: SalesAnalyticsState,
    watch: WatchAnalyticsState
}

export type ContentAnalyticsState = {'live'?: { [index:string] : ContentAnalyticsFinalState }, 'vod'?: { [index:string] : ContentAnalyticsFinalState } } ;

export const defaultStateContentAnalytics: ContentAnalyticsState = {'live': {}, 'vod': {} };

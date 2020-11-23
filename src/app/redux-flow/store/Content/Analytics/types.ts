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
        table: {plays: number; impressions: number; label: string}[];
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

export interface RealTimeAnalyticsState {
    viewersByTime: {
        labels: string[];
        data: number[];
    },
    playsByTime: {
        labels: string[];
        data: number[];
    },
    watchByDevice: { 
        labels: string[];
        data: number[];
    },
    playsByLocation: { 
        data: LocationItem[];
    },
}

export interface ContentAnalyticsFinalState { 
    audience: AudienceAnalyticsState,
    sales: SalesAnalyticsState,
    watch: WatchAnalyticsState,
    realtime?: RealTimeAnalyticsState
}

export interface ContentAnalyticsParameters {
    id: string;
    dimension: AnalyticsDimensions[];
    timeRange: TimeRangeAnalytics,
    type: 'live' | 'vod',
    start?: number,
    end?: number
}

export type TimeRangeAnalytics = 'LAST_DAY' | 'LAST_WEEK' | 'LAST_MONTH' | 'LAST_6_MONTHS' | 'YEAR_TO_DATE' | 'CUSTOM' | RealTimeRange


export type RealTimeRange = 'LAST_5_MINUTES' | 'LAST_15_MINUTES' | 'LAST_30_MINUTES' | 'LAST_45_MINUTES' | 'LAST_HOUR' | 'LAST_90_MINUTES' | 'LAST_2_HOURS';

export type AnalyticsDimensions = 'PLAYS_BY_TIME' | 'PLAYS_BY_DEVICE' | 'PLAYS_BY_COUNTRY' | 'IMPRESSIONS_BY_TIME' 
| 'IMPRESSIONS_BY_DEVICE' | 'IMPRESSIONS_BY_COUNTRY' | 'SALES_BY_TIME' | 'SALES_BY_COUNTRY' | 'REVENUES_BY_TIME' | 'REVENUES_BY_COUNTRY' | 'WATCHTIME_BY_TIME' | 'WATCHTIME_BY_DEVICE' | 'WATCHTIME_BY_COUNTRY'

export type ContentAnalyticsState = {'live'?: { [index:string] : ContentAnalyticsFinalState }, 'vod'?: { [index:string] : ContentAnalyticsFinalState } } ;

export const defaultStateContentAnalytics: ContentAnalyticsState = {'live': {}, 'vod': {} };

export enum ActionTypes {
    GET_CONTENT_ANALYTICS = "@@content_analytics/GET_CONTENT_ANALYTICS",
}

export type LocationItem = {
    city: string;
    position: {
        latitude: number;
        longitude: number;
    };
    value: number[];
    label?: string[];
}

interface AnalyticsTableInfo {
    data: number
    label: string
}

export type MetricKey = 'location' | 'device' | 'time'

export interface AnalyticsMetricInfo {
    'time': {
        labels: string[]
        data: number[]
        table: AnalyticsTableInfo[]
    }
    'location': {
        data: LocationItem[]
        table: AnalyticsTableInfo[]
    }
    'device': {
        labels: string[]
        data: number[]
        table: AnalyticsTableInfo[]
    }
}

export type AudienceKeys = 'plays' | 'impressions'

export type AudienceAnalyticsState  = {
    [key in AudienceKeys]: AnalyticsMetricInfo
}

export type SalesKeys = 'sales' | 'revenue'

export type SalesAnalyticsState  = {
    [key in SalesKeys]: AnalyticsMetricInfo
}

export type WatchAnalyticsState = AnalyticsMetricInfo

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

export type TimeRangeAnalytics = 'LAST_24_HOURS' | 'LAST_WEEK' | 'LAST_MONTH' | 'LAST_6_MONTHS' | 'YEAR_TO_DATE' | 'CUSTOM' | RealTimeRange


export type RealTimeRange = 'LAST_5_MINUTES' | 'LAST_15_MINUTES' | 'LAST_30_MINUTES' | 'LAST_45_MINUTES' | 'LAST_HOUR' | 'LAST_90_MINUTES' | 'LAST_2_HOURS';

export type AnalyticsDimensions = 'VIEWERS_BY_TIME' | 'PLAYS_BY_TIME' | 'PLAYS_BY_DEVICE' | 'PLAYS_BY_COUNTRY' | 'IMPRESSIONS_BY_TIME' 
| 'IMPRESSIONS_BY_DEVICE' | 'IMPRESSIONS_BY_COUNTRY' | 'SALES_BY_TIME' | 'SALES_BY_COUNTRY' | 'REVENUES_BY_TIME' | 'REVENUES_BY_COUNTRY' | 'WATCHTIME_BY_TIME' | 'WATCHTIME_BY_DEVICE' | 'WATCHTIME_BY_COUNTRY'

export type ContentAnalyticsState = {'live'?: { [index:string] : ContentAnalyticsFinalState }, 'vod'?: { [index:string] : ContentAnalyticsFinalState } } ;

export const defaultStateContentAnalytics: ContentAnalyticsState = {'live': {}, 'vod': {} };

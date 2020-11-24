export type GetContentAnalyticsOutput = GetContentAnalyticsResultItemOutput

export interface GetContentAnalyticsResultItemOutput {
    results: GetContentAnalyticsOutputItem[]
}

export interface GetContentAnalyticsOutputItem {
    data_dimension: AnalyticsDimensionsEndpoint;
    data: GetContentAnalyticsOutputDataItem[]
}

export interface GetContentAnalyticsOutputDataItem {
    dimension_sum : number;
    dimension_type: { type: DimensionItemType; value: string | number; }
}

export type DimensionItemType = 'HOURLY' | 'DAY' | 'MONTH' | 'DEVICE' | 'COUNTRY' | '5_MINUTES';

export interface GetContentAnalyticsInput {
    id: string;
    dimension: AnalyticsDimensionsEndpoint[];
    time_range: TimeRangeAnalyticsEndpoint,
    type: 'live' | 'vod',
    start?: number,
    end?: number
}

export type TimeRangeAnalyticsEndpoint = 'LAST_24_HOURS' | 'LAST_WEEK' | 'LAST_MONTH' | 'LAST_6_MONTHS' | 'YEAR_TO_DATE' |  'CUSTOM' | RealTimeRangeEndpoint


export type RealTimeRangeEndpoint = 'LAST_5_MINUTES' | 'LAST_15_MINUTES' | 'LAST_30_MINUTES' | 'LAST_45_MINUTES' | 'LAST_HOUR' | 'LAST_90_MINUTES' | 'LAST_2_HOURS';

export type AnalyticsDimensionsEndpoint = 'VIEWERS_BY_TIME' | 'PLAYS_BY_TIME' | 'PLAYS_BY_DEVICE' | 'PLAYS_BY_COUNTRY' | 'IMPRESSIONS_BY_TIME' 
| 'IMPRESSIONS_BY_DEVICE' | 'IMPRESSIONS_BY_COUNTRY' | 'SALES_BY_TIME' | 'SALES_BY_COUNTRY' | 'REVENUES_BY_TIME' | 'REVENUES_BY_COUNTRY' | 'WATCHTIME_BY_TIME' | 'WATCHTIME_BY_DEVICE' | 'WATCHTIME_BY_COUNTRY'
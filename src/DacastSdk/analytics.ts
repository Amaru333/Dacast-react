export type GetContentAnalyticsOutput = GetContentAnalyticsResultItemOutput[]

export interface GetContentAnalyticsResultItemOutput {
    results: GetContentAnalyticsOutputItem[]
}

export interface GetContentAnalyticsOutputItem {
    dimension: AnalyticsDimensionsOutput;
    data: GetContentAnalyticsOutputDataItem[]
}

export interface GetContentAnalyticsOutputDataItem {
    dimensionSum : number;
    dimensionType: { type: DimensionItemType; value: string; }
}

export type AnalyticsDimensionsOutput = 'plays' | 'watchtime' | 'impressions' | 'sales' | 'revenues';

export type DimensionItemType = 'HOURLY' | 'DAY' | 'MONTH' | 'DEVICE' | 'COUNTRY';

export interface GetContentAnalyticsInput {
    id: string;
    dimension: AnalyticsDimensions[];
    timeRange: TimeRangeAnalytics,
    type: 'live' | 'vod'
}

export type TimeRangeAnalytics = 'LAST_DAY' | 'LAST_WEEK' | 'LAST_MONTH' | 'LAST_6_MONTHS' | 'YEAR_TO_DATE' | RealTimeRange


export type RealTimeRange = 'LAST_5_MINUTES' | 'LAST_15_MINUTES' | 'LAST_30_MINUTES' | 'LAST_45_MINUTES' | 'LAST_HOUR' | 'LAST_90_MINUTES' | 'LAST_2_HOURS';

export type AnalyticsDimensions = 'PLAYS_BY_TIME' | 'PLAYS_BY_DEVICE' | 'PLAYS_BY_COUNTRY' | 'IMPRESSIONS_BY_TIME' 
| 'IMPRESSIONS_BY_DEVICE' | 'IMPRESSIONS_BY_COUNTRY' | 'SALES_BY_TIME' | 'SALES_BY_COUNTRY' | 'REVENUES_BY_TIME' | 'REVENUES_BY_COUNTRY' | 'WATCHTIME_BY_TIME' | 'WATCHTIME_BY_DEVICE' | 'WATCHTIME_BY_COUNTRY'
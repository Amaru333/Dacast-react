export interface GetContentAnalyticsOutput {
    results: GetContentAnalyticsOutputItem[]
}

export interface GetContentAnalyticsOutputItem {
    dimension: AnalyticsDimensionChannel[];
    data: {
        dimensionSum : number;
        dimensionType: { type: DimensionItemType; value: string; }
    }
}

export type DimensionItemType = 'HOURLY' | 'DAY' | 'MONTH' | 'DEVICE' | 'COUNTRY';

export interface GetContentAnalyticsInput {
    id: string;
    dimension: AnalyticsDimensionChannel[];
    timeRange: 'LAST_DAY' | 'LAST_WEEK' | 'LAST_MONTH' | 'LAST_6_MONTHS' | 'YEAR_TO_DATE',
    type: 'channel' | 'vod'
}

export type AnalyticsDimensionChannel = 'PLAYS_BY_TIME' | 'PLAYS_BY_DEVICE' | 'PLAYS_BY_COUNTRY' | 'IMPRESSIONS_BY_TIME' 
| 'IMPRESSIONS_BY_DEVICE' | 'IMPRESSIONS_BY_COUNTRY' | 'SALES_BY_TIME' | 'SALES_BY_COUNTRY' | 'REVENUES_BY_TIME' | 'REVENUES_BY_COUNTRY'

//TODO: Find type for these
export type GetRevenueAnalyticsOutput = any;
export type GetRevenueAnalyticsInput = any;

export type GetDataAnalyticsOutput = any;
export type GetDataAnalyticsInput = any;

export type GetAudienceAnalyticsOutput = any;
export type GetAudienceAnalyticsInput = any;
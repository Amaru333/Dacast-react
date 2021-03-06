export enum ActionTypes {
    GET_ACCOUNT_ANALYTICS_AUDIENCE = "@@analytics/GET_ACCOUNT_ANALYTICS_AUDIENCE",
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

export interface AccountAnalyticsAudience {
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

export interface AccountAnalyticsAudienceState {
    data?: AccountAnalyticsAudience
}


export interface AccountAnalyticsParameters {
    id: string;
    dimension: AnalyticsDimensions[];
    timeRange: TimeRangeAnalytics,
    type: 'account',
    start?: number,
    end?: number
}

export type TimeRangeAnalytics = 'LAST_24_HOURS' | 'LAST_WEEK' | 'LAST_MONTH' | 'LAST_6_MONTHS' | 'YEAR_TO_DATE' | 'CUSTOM'

export type AnalyticsDimensions = 'PLAYS_BY_TIME_ACCT' | 'PLAYS_BY_DEVICE_ACCT' | 'PLAYS_BY_COUNTRY_ACCT' | 'IMPRESSIONS_BY_TIME_ACCT' | 'IMPRESSIONS_BY_DEVICE_ACCT' | 'IMPRESSIONS_BY_COUNTRY_ACCT'

export const AccountAudienceDimension: AnalyticsDimensions[] = ['PLAYS_BY_TIME_ACCT','PLAYS_BY_DEVICE_ACCT','PLAYS_BY_COUNTRY_ACCT', 'IMPRESSIONS_BY_TIME_ACCT', 'IMPRESSIONS_BY_DEVICE_ACCT','IMPRESSIONS_BY_COUNTRY_ACCT']

export const defaultStateAccountAnalyticsAudience: AccountAnalyticsAudienceState = {}

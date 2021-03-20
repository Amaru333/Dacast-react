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

export type AnalyticsAudienceDimensions = 'PLAYS_BY_TIME_ACCT' | 'PLAYS_BY_DEVICE_ACCT' | 'PLAYS_BY_COUNTRY_ACCT' | 'IMPRESSIONS_BY_TIME_ACCT' | 'IMPRESSIONS_BY_DEVICE_ACCT' | 'IMPRESSIONS_BY_COUNTRY_ACCT'

export const AccountAudienceDimension: AnalyticsAudienceDimensions[] = ['PLAYS_BY_TIME_ACCT','PLAYS_BY_DEVICE_ACCT','PLAYS_BY_COUNTRY_ACCT', 'IMPRESSIONS_BY_TIME_ACCT', 'IMPRESSIONS_BY_DEVICE_ACCT','IMPRESSIONS_BY_COUNTRY_ACCT']

export const defaultStateAccountAnalyticsAudience: AccountAnalyticsAudienceState = {}

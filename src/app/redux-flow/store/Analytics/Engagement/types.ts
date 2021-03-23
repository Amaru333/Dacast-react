export enum ActionTypes {
    GET_ACCOUNT_ANALYTICS_ENGAGEMENT = "@@analytics/GET_ACCOUNT_ANALYTICS_ENGAGEMENT",
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

export interface AccountAnalyticsEngagement {
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

export interface AccountAnalyticsEngagementState {
    data?: AccountAnalyticsEngagement
}

export type AnalyticsDimensionsEngagement = 'WATCHTIME_BY_TIME_ACCT' | 'WATCHTIME_BY_DEVICE_ACCT' | 'WATCHTIME_BY_COUNTRY_ACCT'

export const AccountEngagementDimension: AnalyticsDimensionsEngagement[] = ['WATCHTIME_BY_TIME_ACCT', 'WATCHTIME_BY_DEVICE_ACCT','WATCHTIME_BY_COUNTRY_ACCT']

export const defaultStateAccountAnalyticsEngagement: AccountAnalyticsEngagementState = {}

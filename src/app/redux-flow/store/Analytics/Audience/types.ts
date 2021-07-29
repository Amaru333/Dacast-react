import { AudienceAnalyticsState } from "../../Content/Analytics/types"

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

export type AccountAnalyticsAudience = AudienceAnalyticsState

export interface AccountAnalyticsAudienceState {
    data?: AccountAnalyticsAudience
}

export type AnalyticsAudienceDimensions = 'PLAYS_BY_TIME_ACCT' | 'PLAYS_BY_DEVICE_ACCT' | 'PLAYS_BY_COUNTRY_ACCT' | 'IMPRESSIONS_BY_TIME_ACCT' | 'IMPRESSIONS_BY_DEVICE_ACCT' | 'IMPRESSIONS_BY_COUNTRY_ACCT'

export const AccountAudienceDimension: AnalyticsAudienceDimensions[] = ['PLAYS_BY_TIME_ACCT','PLAYS_BY_DEVICE_ACCT','PLAYS_BY_COUNTRY_ACCT', 'IMPRESSIONS_BY_TIME_ACCT', 'IMPRESSIONS_BY_DEVICE_ACCT','IMPRESSIONS_BY_COUNTRY_ACCT']

export const defaultStateAccountAnalyticsAudience: AccountAnalyticsAudienceState = {}

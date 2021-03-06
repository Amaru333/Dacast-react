export enum ActionTypes {
    GET_ACCOUNT_ANALYTICS_PAYWALL = "@@analytics/GET_ACCOUNT_ANALYTICS_PAYWALL",
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

export interface AccountAnalyticsPaywall {
    salesRevenuesByTime: {
        labels: string[];
        sales: number[];
        revenues: number[];
        table: {sales: number; revenues: number; label: string}[]
    };
    salesRevenuesByLocation: { 
        data: LocationItem[];
        table: {revenues: number; sales: number; label: string}[]
    }
}

export interface AccountAnalyticsPaywallState {
    data?: AccountAnalyticsPaywall
}

export type AnalyticsDimensionsPaywall = 'SALES_BY_TIME_ACCT' | 'SALES_BY_COUNTRY_ACCT' | 'REVENUES_BY_TIME_ACCT' | 'REVENUES_BY_COUNTRY_ACCT'

export const AccountPaywallDimension: AnalyticsDimensionsPaywall[] = ['SALES_BY_TIME_ACCT','SALES_BY_COUNTRY_ACCT', 'REVENUES_BY_TIME_ACCT', 'REVENUES_BY_COUNTRY_ACCT']

export const defaultStateAccountAnalyticsPaywall: AccountAnalyticsPaywallState = {}

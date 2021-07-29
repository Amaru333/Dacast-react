import { SalesAnalyticsState } from "../../Content/Analytics"

export enum ActionTypes {
    GET_ACCOUNT_ANALYTICS_PAYWALL = "@@analytics/GET_ACCOUNT_ANALYTICS_PAYWALL",
}

export type AccountAnalyticsPaywall = SalesAnalyticsState

export interface AccountAnalyticsPaywallState {
    data?: AccountAnalyticsPaywall
}

export type AnalyticsDimensionsPaywall = 'SALES_BY_TIME_ACCT' | 'SALES_BY_COUNTRY_ACCT' | 'REVENUES_BY_TIME_ACCT' | 'REVENUES_BY_COUNTRY_ACCT'

export const AccountPaywallDimension: AnalyticsDimensionsPaywall[] = ['SALES_BY_TIME_ACCT','SALES_BY_COUNTRY_ACCT', 'REVENUES_BY_TIME_ACCT', 'REVENUES_BY_COUNTRY_ACCT']

export const defaultStateAccountAnalyticsPaywall: AccountAnalyticsPaywallState = {}

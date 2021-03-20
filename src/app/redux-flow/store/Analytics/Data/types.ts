export enum ActionTypes {
    GET_ACCOUNT_ANALYTICS_DATA = "@@analytics/GET_ACCOUNT_ANALYTICS_DATA",
}

export interface AccountAnalyticsData {
    dataConsumptionByTime: {
        labels: string[];
        data: number[];
        table: {data: number; label: string}[]
    };
}

export interface AccountAnalyticsDataState {
    data?: AccountAnalyticsData
}

export type AnalyticsDimensionsData = 'DATA_CONSUMPTION_ACCT'

export const AccountDataDimension: AnalyticsDimensionsData[] = ['DATA_CONSUMPTION_ACCT']

export const defaultStateAccountAnalyticsData: AccountAnalyticsDataState = {}

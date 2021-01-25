export enum ActionTypes {
    GET_ANALYTICS_REVENUE = "@@ANALYTICSREVENUE/GET_ANALYTICS_REVENUE",
    GET_ANALYTICS_REVENUE_SALES_BY_TIME = "@@ANALYTICSREVENUE/GET_ANALYTICS_REVENUE_SALES_BY_TIME",
    GET_ANALYTICS_REVENUE_REVENUE_BY_TIME = "@@ANALYTICSREVENUE/GET_ANALYTICS_REVENUE_REVENUE_BY_TIME",
    GET_ANALYTICS_REVENUE_SALES_PER_COUNTRY = "@@ANALYTICSREVENUE/GET_ANALYTICS_REVENUE_SALES_PER_COUNTRY",
}

export interface AnalyticsRevenueInfos {
    salesTime?: AnalyticsRevenueSalesByTime & {failed?: boolean | null};
    revenueTime?: AnalyticsRevenueRevenueByTime & {failed?: boolean | null};
    salesCountries?: AnalyticsRevenueSalesPerCountry & {failed?: boolean | null};
}

export interface AnalyticsRevenueSalesByTime {
    data: number[];
    time: number[];
};

export interface AnalyticsRevenueRevenueByTime {
    currency: string;
    data: number[];
    time: number[];
};

export interface AnalyticsRevenueSalesPerCountry {
    countries: string[];
    data: number[];
};

export const AnalyticsRevenueInitialState: AnalyticsRevenueInfos = null

export interface GetAnalyticsRevenueOptions {
    startDate?: number;
    endDate?: number;
    selectedContents: string[];
}
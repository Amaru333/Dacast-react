export enum ActionTypes {
    GET_ANALYTICS_REVENUE_SALES_BY_TIME = "@@ANALYTICSREVENUE/GET_ANALYTICS_REVENUE_SALES_BY_TIME",
    GET_ANALYTICS_REVENUE_REVENUE_BY_TIME = "@@ANALYTICSREVENUE/GET_ANALYTICS_REVENUE_REVENUE_BY_TIME",
    GET_ANALYTICS_REVENUE_SALES_PER_COUNTRY = "@@ANALYTICSREVENUE/GET_ANALYTICS_REVENUE_SALES_PER_COUNTRY",
}

export interface AnalyticsRevenueInfos {
    salesByTime: AnalyticsRevenueSalesByTime | false;
    revenueByTime: AnalyticsRevenueRevenueByTime | false;
    salesPerCountry: AnalyticsRevenueSalesPerCountry | false;
}

export interface AnalyticsRevenueSalesByTime {
    data: number[];
    time: number[];
};

export interface AnalyticsRevenueRevenueByTime {
    data: number[];
    time: number[];
};

export interface AnalyticsRevenueSalesPerCountry {
    data: {
        city: string;
        position: {
            latitude: number;
            longitude: number;
        };
        consumedMB: number;
    }[];
};

export const AnalyticsRevenueInitialState: AnalyticsRevenueState = {
    data: {
        salesByTime: false,
        revenueByTime: false,
        salesPerCountry: false
    },
};

export interface AnalyticsRevenueState {
    readonly data: AnalyticsRevenueInfos;
}

export interface GetAnalyticsRevenueOptions {
    startDate: number;
    endDate: number;
    selectedContents: string[];
}



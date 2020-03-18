export enum ActionTypes {
    GET_ANALYTICS_DASHBOARD_DETAILS = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_DETAILS",
}

export interface GetAnalyticsDashboardOptions {
    startDate: number;
    endDate: number;
}

export interface AnalyticsDashboardInfos {
    consumptionPerTime: {
        time: number[];
        data: number[];
    };
    playsViewersPerTime:
    {
        plays: {
            time: number[];
            data: number[];
        };
        viewers: {
            time: number[];
            data: number[];
        };
    };
    consumptionPerDevice: {
        labels: string[];
        data: number[];
    };
    topContents: {
        data: TopContentData[];
    };
    consumptionPerLocation:
    {
        data: {
            city: string;
            position: {
                latitude: number;
                longitude: number;
            };
            consumedMB: number;
        }[];
    };
}

interface TopContentData {
    content: string;
    watchTime: number;
    views: number;
    revenueUsd: number;
    revenueEur: number;
}


export const AnalyticsDashboardInitialState: AnalyticsDashboardState = {
    data: false,
};

export interface AnalyticsDashboardState {
    readonly data: false | AnalyticsDashboardInfos;
}



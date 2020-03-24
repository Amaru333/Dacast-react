export enum ActionTypes {
    GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME",
    GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME",
    GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE",
    GET_ANALYTICS_DASHBOARD_TOP_CONTENTS = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_TOP_CONTENTS",
    GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION",

}

export interface GetAnalyticsDashboardOptions {
    startDate: number;
    endDate: number;
}


export interface AnalyticsDashboardConsumptionPerTime {
    time: number[];
    data: number[];
};

export interface AnalyticsDashboardPlaysViewersPerTime {
    plays: {
        time: number[];
        data: number[];
    };
    viewers: {
        time: number[];
        data: number[];
    };
};

export interface AnalyticsDashboardConsumptionPerDevice {
    labels: string[];
    data: number[];
};

export interface AnalyticsDashboardTopContents {
    data: TopContentData[];
};

export interface AnalyticsDashboardConsumptionPerLocation {
    data: {
        city: string;
        position: {
            latitude: number;
            longitude: number;
        };
        consumedMB: number;
    }[];
};


export interface AnalyticsDashboardInfos {
    consumptionPerTime: AnalyticsDashboardConsumptionPerTime | false;
    playsViewersPerTime: AnalyticsDashboardPlaysViewersPerTime | false;
    consumptionPerDevice: AnalyticsDashboardConsumptionPerDevice | false;
    topContents: AnalyticsDashboardConsumptionPerDevice | false;
    consumptionPerLocation: AnalyticsDashboardConsumptionPerLocation | false;
}

interface TopContentData {
    content: string;
    watchTime: number;
    views: number;
    revenueUsd: number;
    revenueEur: number;
}


export const AnalyticsDashboardInitialState: AnalyticsDashboardState = {
    data: {
        consumptionPerTime: false,
        playsViewersPerTime: false,
        consumptionPerDevice: false,
        topContents: false,
        consumptionPerLocation: false
    },
};

export interface AnalyticsDashboardState {
    readonly data: AnalyticsDashboardInfos;
}
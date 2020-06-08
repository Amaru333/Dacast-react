export enum ActionTypes {
    GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_CONSUMPTION_TIME",
    GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_PLAYS_VIEWERS_TIME",
    GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_CONSUMPTION_DEVICE",
    GET_ANALYTICS_DASHBOARD_TOP_CONTENTS = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_TOP_CONTENTS",
    GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD_CONSUMPTION_LOCATION",
    GET_ANALYTICS_DASHBOARD_JOB_IDS = "@@analytics_dashboard/GET_ANALYTICS_DASHBOARD_JOB_IDS"
}

export interface GetAnalyticsDashboardOptions {
    start: number;
    end: number;
}


export interface AnalyticsDashboardConsumptionPerTime {
    time: number[];
    data: number[];
    failed?: boolean;
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
    failed?: boolean;
};

export interface AnalyticsDashboardConsumptionPerDevice {
    labels: string[];
    data: number[];
    failed?: boolean;
};

export interface AnalyticsDashboardTopContents {
    data: TopContentData[];
    failed?: boolean;
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
    failed?: boolean;
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

export interface DashboardJobIDs {
    consumptionPerTime: {
        jobID: string;
        error?: string;
        status?: string;
    };
    playsViewersPerTime: {
        jobID: string;
        error?: string;
        status?: string;
    };
    consumptionPerDevice: {
        jobID: string;
        error?: string;
        status?: string;
    };
    consumptionPerLocation: {
        jobID: string;
        error?: string;
        status?: string;
    };
    topContents: {
        jobID: string;
        error?: string;
        status?: string;
    };
    errors?: boolean;
}


export const AnalyticsDashboardInitialState: AnalyticsDashboardState = {
    data: {
        consumptionPerTime: false,
        playsViewersPerTime: false,
        consumptionPerDevice: false,
        topContents: false,
        consumptionPerLocation: false
    },
    jobIds: null
};

export interface AnalyticsDashboardState {
    readonly data: AnalyticsDashboardInfos;
    jobIds: DashboardJobIDs;
}
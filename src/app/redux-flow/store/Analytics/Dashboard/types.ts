export enum ActionTypes {
    GET_ANALYTICS_DASHBOARD = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD"
}

export interface GetAnalyticsDashboardOptions {
    start: number;
    end: number;
}


export interface AnalyticsDashboardConsumptionPerTime {
    time: number[];
    data: number[];
    csv: {header: Object, data: Object[]},
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
    csv: {header: Object, data: Object[]},
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

export interface LocationItem {
    city: string;
    position: {
        latitude: number;
        longitude: number;
    };
    value: number;
}
export interface AnalyticsDashboardConsumptionPerLocation {
    data: LocationItem[];
    failed?: boolean;
};


export interface AnalyticsDashboardInfos {
    playtimePerTime: AnalyticsDashboardConsumptionPerTime | false;
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
        playtimePerTime: false,
        playsViewersPerTime: false,
        consumptionPerDevice: false,
        topContents: false,
        consumptionPerLocation: false
    },
};

export interface AnalyticsDashboardState {
    readonly data: AnalyticsDashboardInfos;
}
import { ContentType } from "../../Common/types";
import { LocationItem } from "../Audience/types";

export enum ActionTypes {
    GET_ANALYTICS_DASHBOARD = "@@ANALYTICSDASHBOARD/GET_ANALYTICS_DASHBOARD",
    GET_ANALYTICS_DASHBOARD_NEW = "@@ANALYTICS_DASHBOARD/GETANALYTICS_DASHBOARD_NEW",
    GET_ANALYTICS_TOP_CONTENT = "@@ANALYTICS_DASHBOARD/GET_ANALYTICS_TOP_CONTENT"
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

export interface AnalyticsDashboardNewInfo {
    dataConsumption: number;
    engagement: number;
    plays: number;
    paywall: number | null;
    audienceLocation: LocationItem[]
}

export interface AnalyticsTopContentParams {
    metrics: AnalyticsTopContentDimensions[]
    sortBy: AnalyticsTopContentDimensions
    startAt?: number
}

export interface AnalyticsTopContentInfo {
    id: string
    title: string
    type: ContentType
    total: number
}

export const AnalyticsDashboardInitialState: AnalyticsDashboardState = {
    data: {
        playtimePerTime: false,
        playsViewersPerTime: false,
        consumptionPerDevice: false,
        topContents: false,
        consumptionPerLocation: false
    },
    newDashboardInfo: null,
    topContent: []
};

export type AnalyticsTopContentDimensions = 'plays' | 'plays-clicks' | 'viewer-sessions' | 'playtime' | 'watchtime' | 'impressions'

export type AnalyticsDashboardDimensions = 'PLAYS_BY_TIME_ACCT' | 'PLAYS_BY_COUNTRY_ACCT' | 'WATCHTIME_BY_TIME_ACCT' | 'REVENUES_BY_TIME_ACCT' | 'DATA_CONSUMPTION_ACCT'

export const AnalyticsDashboardDimension: AnalyticsDashboardDimensions[] = ['PLAYS_BY_TIME_ACCT', 'PLAYS_BY_COUNTRY_ACCT', 'WATCHTIME_BY_TIME_ACCT', 'REVENUES_BY_TIME_ACCT', 'DATA_CONSUMPTION_ACCT']

export interface AnalyticsDashboardState {
    readonly data: AnalyticsDashboardInfos;
    readonly newDashboardInfo: AnalyticsDashboardNewInfo,
    topContent: AnalyticsTopContentInfo[]
}
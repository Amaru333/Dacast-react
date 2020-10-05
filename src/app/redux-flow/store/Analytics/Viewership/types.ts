import { LocationItem } from '../Dashboard';

export enum ActionTypes {
    GET_ANALYTICS_VIEWERSHIP = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP",
    
}

export interface AnalyticsViewershipConsumptionDevices {
    labels: string[];
    data: number[];
    csv: {header: Object, data: Object[]},
    failed?: boolean;
}

export interface AnalyticsViewershipPlaytimePerLocation {
    data: false | LocationItem[],
    csv: {header: Object, data: Object[]},
}

export interface AnalyticsViewershipInfos {
    playtimePerDevices: AnalyticsViewershipConsumptionDevices | false;
    playtimePerLocation: AnalyticsViewershipPlaytimePerLocation | false;
}

export const AnalyticsViewershipInitialState: AnalyticsViewershipState = false;

export interface AnalyticsViewershipState {
    readonly data: AnalyticsViewershipInfos | false ;
}

export interface GetAnalyticsViewershipOptions {
    start: number;
    end: number;
    selectedContents: string[];
}



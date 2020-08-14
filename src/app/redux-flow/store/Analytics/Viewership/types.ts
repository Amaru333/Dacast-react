export enum ActionTypes {
    GET_ANALYTICS_VIEWERSHIP = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP",
    
}

export interface AnalyticsViewershipConsumptionDomain {
    domain: string[]; 
    value: number[];
    failed?: boolean;
}

export interface AnalyticsViewershipConsumptionDevices {
    labels: string[];
    data: number[];
    failed?: boolean;
}

export interface AnalyticsViewershipPlaytimePerLocation {
    time: false | {
        time: number[];
        data: number[];
        failed?: boolean;
    };
    content: false | {
        labels: string[];
        data: number[];
        failed?: boolean;
    };
    data: false | {
        city: string;
        position: {
            latitude: number;
            longitude: number;
        };
        consumedMB: number;
    }[];
}

export interface AnalyticsViewershipPlaysViewersTime {
    plays: {
        time: number[];
        data: number[];
    };
    viewers: {
        time: number[];
        data: number[];
    };
    failed?: boolean;
}

export interface AnalyticsViewershipViewingTimeBreakdown {
    content: false |  {
        labels: string[];
        data: number[];
        failed?: boolean;
    };
    map: false | {
        city: string;
        position: {
            latitude: number;
            longitude: number;
        };
        consumedMB: number;
    }[];
    device: false | {
        failed?: boolean;
        labels: string[];
        data: number[];
    };
}

export interface AnalyticsViewershipConcurrentPlayback {
    content: false | {
        labels: string[];
        data: number[];
    };
    map: false | {
        city: string;
        position: {
            latitude: number;
            longitude: number;
        };
        consumedMB: number;
    }[];
    device: false |  {
        labels: string[];
        data: number[];
    };
};

export interface AnalyticsViewershipInfos {
    consumptionPerDomain: AnalyticsViewershipConsumptionDomain | false;
    playtimePerDevices: AnalyticsViewershipConsumptionDevices | false;
    playsViewersPerTime: AnalyticsViewershipPlaysViewersTime | false;
    playtimePerLocation: AnalyticsViewershipPlaytimePerLocation;
    viewingTimeBreakdown: AnalyticsViewershipViewingTimeBreakdown;
    concurrentPlayback: AnalyticsViewershipConcurrentPlayback;
}


export const AnalyticsViewershipInitialState: AnalyticsViewershipState = false;

export interface AnalyticsViewershipState {
    readonly data: AnalyticsViewershipInfos | false;
}

export interface GetAnalyticsViewershipOptions {
    start: number;
    end: number;
    selectedContents: string[];
}



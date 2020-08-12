export enum ActionTypes {
    GET_ANALYTICS_VIEWERSHIP = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP",
    
}

export interface AnalyticsViewershipConsumptionDomain {
    domain: string[]; 
    value: number[];
    failed?: boolean;
}

export interface ViewershipJobIDs {
    consumptionPerContent: {
        jobID: string;
        error?: string;
        status?: string;
    };
    consumptionPerLocation: {
        jobID: string;
        error?: string;
        status?: string;
    };
    consumptionPerTime: {
        jobID: string;
        error?: string;
        status?: string;
    };
    concurrentPlaybackPerDevice: {
        jobID: string;
        error?: string;
        status?: string;
    };
    concurrentPlaybackPerLocation: {
        jobID: string;
        error?: string;
        status?: string;
    };
    concurrentPlaybackPerContent: {
        jobID: string;
        error?: string;
        status?: string;
    };
    viewingTimePerDevice: {
        jobID: string;
        error?: string;
        status?: string;
    };
    viewingTimePerContent: {
        jobID: string;
        error?: string;
        status?: string;
    };
    viewingTimePerLocation: {
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
    consumptionPerDomain: {
        jobID: string;
        error?: string;
        status?: string;
    };
    errors?: boolean;
}

export interface AnalyticsViewershipConsumptionDevices {
    labels: string[];
    data: number[];
    failed?: boolean;
}

export interface AnalyticsViewershipConsumptionBreakdown {
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
    map: false | {
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
    consumptionPerDevices: AnalyticsViewershipConsumptionDevices | false;
    playsViewersPerTime: AnalyticsViewershipPlaysViewersTime | false;
    consumptionBreakdown: AnalyticsViewershipConsumptionBreakdown;
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



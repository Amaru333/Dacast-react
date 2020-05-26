export enum ActionTypes {
    GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN",
    GET_ANALYTICS_VIEWERSHIP_JOB_IDS = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_JOB_IDS",
    GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE",
    GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME",
    GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_DEVICE = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_DEVICE",
    GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_CONTENT = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_CONTENT",
    GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_MAP = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN_MAP",
    GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_TIME = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_TIME",
    GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_CONTENT = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_CONTENT",
    GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_MAP = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN_MAP",
    GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_DEVICE = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_DEVICE",
    GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_CONTENT = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_CONTENT",
    GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_MAP = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK_MAP",
}

export interface AnalyticsViewershipConsumptionDomain {
    domain: string[]; 
    value: number[];
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
}

export interface AnalyticsViewershipConsumptionBreakdown {
    time: false | {
        time: number[];
        data: number[];
    };
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
}

export interface AnalyticsViewershipViewingTimeBreakdown {
    content: false |  {
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
    device: false | {
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


export const AnalyticsViewershipInitialState: AnalyticsViewershipState = {
    data: {
        consumptionPerDomain: false,
        consumptionPerDevices:  false,
        playsViewersPerTime:  false,
        consumptionBreakdown: {
            time: false,
            content: false,
            map: false
        },
        viewingTimeBreakdown: {
            content: false,
            device: false,
            map: false
        },
        concurrentPlayback: {
            content: false ,
            map: false ,
            device: false
        }
    },
    jobIds: null
};

export interface AnalyticsViewershipState {
    readonly data: AnalyticsViewershipInfos;
    jobIds: ViewershipJobIDs;
}

export interface GetAnalyticsViewershipOptions {
    start: number;
    end: number;
    selectedContents: string[];
}



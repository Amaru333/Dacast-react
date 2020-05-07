export enum ActionTypes {
    GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DOMAIN",
    GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_DEVICE",
    GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_PLAYS_VIEWERS_TIME",
    GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONSUMPTION_BREAKDOWN",
    GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_VIEWING_TIME_BREAKDOWN",
    GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_CONCURRENT_PLAYBACK",

}

export interface AnalyticsViewershipConsumptionDomain {
    domain: string[]; 
    value: number[];
}

export interface AnalyticsViewershipConsumptionDevices {
    labels: string[];
    data: number[];
}

export interface AnalyticsViewershipConsumptionBreakdown {
    time: {
        time: number[];
        data: number[];
    };
    content: {
        labels: string[];
        data: number[];
    };
    map: {
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
    content: {
        labels: string[];
        data: number[];
    };
    map: {
        city: string;
        position: {
            latitude: number;
            longitude: number;
        };
        consumedMB: number;
    }[];
    device: {
        labels: string[];
        data: number[];
    };
}

export interface AnalyticsViewershipConcurrentPlayback {
    content: {
        labels: string[];
        data: number[];
    };
    map: {
        city: string;
        position: {
            latitude: number;
            longitude: number;
        };
        consumedMB: number;
    }[];
    device: {
        labels: string[];
        data: number[];
    };
};

export interface AnalyticsViewershipInfos {
    consumptionPerDomain: AnalyticsViewershipConsumptionDomain | false;
    consumptionPerDevices: AnalyticsViewershipConsumptionDevices | false;
    playsViewersPerTime: AnalyticsViewershipPlaysViewersTime | false;
    consumptionBreakdown: AnalyticsViewershipConsumptionBreakdown | false;
    viewingTimeBreakdown: AnalyticsViewershipViewingTimeBreakdown | false;
    concurrentPlaybackDevice: AnalyticsViewershipConcurrentPlayback | false;
}


export const AnalyticsViewershipInitialState: AnalyticsViewershipState = {
    data: {
        consumptionPerDomain: false,
        consumptionPerDevices:  false,
        playsViewersPerTime:  false,
        consumptionBreakdown: false,
        viewingTimeBreakdown: false,
        concurrentPlaybackDevice: false
    },
};

export interface AnalyticsViewershipState {
    readonly data: AnalyticsViewershipInfos;
}

export interface GetAnalyticsViewershipOptions {
    startDate: number;
    endDate: number;
    selectedContents: string[];
}



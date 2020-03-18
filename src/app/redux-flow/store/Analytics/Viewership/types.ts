export enum ActionTypes {
    GET_ANALYTICS_VIEWERSHIP_DETAILS = "@@ANALYTICSVIEWERSHIP/GET_ANALYTICS_VIEWERSHIP_DETAILS",
}

export interface AnalyticsViewershipInfos {
    consumptionPerDomain: {
        domain: string[]; 
        value: number[];
    };
    consumptionPerDevices: {
        labels: string[];
        data: number[];
    };
    playsViewersPerTime: {
        plays: {
            time: number[];
            data: number[];
        };
        viewers: {
            time: number[];
            data: number[];
        };
    };
    consumptionBreakdown: {
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
    };
    viewingTimeBreakdown: {
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
    concurrentPlaybackDevice: {
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
}


export const AnalyticsViewershipInitialState: AnalyticsViewershipState = {
    data: false,
};

export interface AnalyticsViewershipState {
    readonly data: false | AnalyticsViewershipInfos;
}

export interface GetAnalyticsViewershipOptions {
    startDate: number;
    endDate: number;
    selectedContents: string[];
}



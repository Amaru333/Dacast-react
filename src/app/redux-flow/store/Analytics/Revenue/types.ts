export enum ActionTypes {
    GET_ANALYTICS_REVENUE_DETAILS = "@@ANALYTICSREVENUE/GET_ANALYTICS_REVENUE_DETAILS",
}

export interface AnalyticsRevenueInfos {
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


export const AnalyticsRevenueInitialState: AnalyticsRevenueState = {
    data: false,
};

export interface AnalyticsRevenueState {
    readonly data: false | AnalyticsRevenueInfos;
}

export interface GetAnalyticsRevenueOptions {
    startDate: number;
    endDate: number;
    selectedContents: string[];
}



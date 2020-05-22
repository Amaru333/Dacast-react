export enum ActionTypes {
    GET_DASHBOARD_DETAILS = "@@dashboard/GET_DASHBOARD_DETAILS",
    GET_DASHBOARD_VOD_PLAY_RATE = "@@dashboard/GET_DASHBOARD_VOD_PLAY_RATE",
    GET_DASHBOARD_VOD_PLAY = "@@dasboard/GET_DASHBOARD_VOD_PLAY"
}

export interface DashboardInfos {
    vod: false | DashboardVod;
    isTrial: false | DashboardTrial;
    isPayingPlan: false | DashboardPayingPlan;
    isPaywall: false | DashboardPaywall;
    live: false | DashboardLive;
    generalInfos: DashboardGeneral;
}

export interface DashboardTrial {
    daysLeft: number; 
}
export interface DashboardPayingPlan {
    displayName: string;
    price: number;
    nextBill: number;
    lastBill: number;
}
export interface DashboardGeneral {
    bandwidth: {
        limit: number;
        consumed: number;
    };
    storage: {
        limit: number;
        consumed: number;
    };
    encoding: {
        limit: number;
        consumed: number;
    };
    overage: {
        enabled: boolean;
        value: number;
    };
}

interface TopContent { name: string; viewers: number }

export interface DashboardVod {
    totalVideos: number;
    videoPlays: {jobID: string; data: number};
    impressions: {jobID: string; data: number};
    topVideos:{ jobID: string; data: TopContent[]};
    'play-rate': {jobID: string; data: any;}
}

export interface DashboardLive {
    activeChannels: number;
    totalChannels: number;
    liveViewers: {jobID: string;data: number};
    topChannels:{jobID: string; data: TopContent[]};
}

export interface DashboardPaywall {
    balance: number;
    revenue: number;
}

export const dashboardInitialState: DashboardState = {
    data: false,
};

export interface DashboardState {
    readonly data: DashboardInfos | false;
}



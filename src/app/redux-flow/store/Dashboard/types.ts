import { PlanSummary, PlaybackProtection } from '../Account/Plan';

export enum ActionTypes {
    GET_DASHBOARD_DETAILS = "@@dashboard/GET_DASHBOARD_DETAILS",
    GET_DASHBOARD_VOD_PLAY_RATE = "@@dashboard/GET_DASHBOARD_VOD_PLAY_RATE",
    GET_DASHBOARD_VOD_TOP_CONTENTS = "@@dashboard/GET_DASHBOARD_VOD_TOP_CONTENTS",
    GET_DASHBOARD_VOD_IMPRESSIONS = "@@dashboard/GET_DASHBOARD_VOD_IMPRESSIONS",
    GET_DASHBOARD_VOD_PLAY = "@@dasboard/GET_DASHBOARD_VOD_PLAY",
    GET_DASHBOARD_LIVE_VIEWERS = "@@dasboard/GET_DASHBOARD_LIVE_VIEWERS",
    GET_DASHBOARD_LIVE_TOP= "@@dasboard/GET_DASHBOARD_LIVE_TOP"
}

export interface DashboardInfos {
    vod: DashboardVod;
    isTrial: false | DashboardTrial;
    isPayingPlan: false | DashboardPayingPlan;
    paywall: DashboardPaywall;
    live:  DashboardLive;
    generalInfos: DashboardGeneral;
    currentPlan: PlanSummary;
    playbackProtection: PlaybackProtection
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
    videoPlays: number;
    impressions: number;
    topVideos: TopContent[];
    playRate: {jobID: string; data: any; loading?: boolean; failed?: boolean};
}

export interface DashboardLive {
    activeChannels: number;
    totalChannels: number;
    liveViewers: number;
    topChannels: {name: string; viewers: number; }[];
}

export interface DashboardPaywall {
    balance: number;
    revenue: {currency: string; total: number}[];
}

export const dashboardInitialState: DashboardState = {
    data: false,
};

export interface DashboardState {
    readonly data: DashboardInfos | false;
}



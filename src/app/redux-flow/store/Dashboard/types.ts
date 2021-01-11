import { PlanSummary, PlaybackProtection } from '../Account/Plan';

export enum ActionTypes {
    GET_DASHBOARD_DETAILS = "@@dashboard/GET_DASHBOARD_DETAILS",
    GET_DASHBOARD_GENERAL_DETAILS = "@@dashboard/GET_DASHBOARD_GENERAL_DETAILS",
    GET_DASHBOARD_LIVE = "@@dashboard/GET_DASHBOARD_LIVE",
    GET_DASHBOARD_VOD = "@@dashboard/GET_DASHBOARD_VOD",
    GET_DASHBOARD_PAYWALL = "@@dashboard/GET_DASHBOARD_PAYWALL",
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
}

export interface DashboardGeneralInfo {
    generalInfos: DashboardGeneral
    currentPlan: PlanSummary
    playbackProtection: PlaybackProtection
}

interface TopContent { name: string; viewers: number }

export interface DashboardVod {
    totalVideos: number;
    videoPlays?: number;
    impressions?: number;
    topVideos?: TopContent[];
    playRate?: number;
}

export interface DashboardLive {
    activeChannels: number;
    totalChannels: number;
    liveViewers?: number;
    topChannels?: {name: string; viewers: number; }[];
}

export interface DashboardPaywall {
    balance: number;
    revenue: {currency: string; total: number}[];
}

export const dashboardInitialState: DashboardState = {
    info: false,
};

export interface DashboardState {
    info: DashboardInfos | false;
}



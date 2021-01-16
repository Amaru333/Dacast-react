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
    isTrial?: false | DashboardTrial;
    isPayingPlan?: false | DashboardPayingPlan;
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
    info: {
        generalInfos: {
            bandwidth: {
                limit: 0,
                consumed: 0,
            },
            storage: {
                limit: 0,
                consumed: 0
            },
        },
        vod: {
            totalVideos: 0,
            videoPlays: 0,
            impressions: 0,
            topVideos: [],
            playRate: 0,
        },
        live: {
            activeChannels: 0,
            totalChannels: 0,
            liveViewers: 0,
            topChannels: [],
        },
        paywall: {
            balance: 0,
            revenue: null
        },
        currentPlan: null,
        playbackProtection: null,
        isPayingPlan: false,
        isTrial: false
    },
};

export interface DashboardState {
    info: DashboardInfos | false;
}



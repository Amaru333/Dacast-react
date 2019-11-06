export enum ActionTypes {
    GET_DASHBOARD_DETAILS = "@@dashboard/GET_DASHBOARD_DETAILS",
}

export interface DashboardInfos {
    isVod: false | DashboardVod;
    isTrial: false | DashboardTrial;
    isPayingPlan: false | DashboardPayingPlan;
    isPaywall: false | DashboardPaywall;
    isLive: false | DashboardLive;
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
    videoPlays: number;
    impressions: number;
    topVideos: TopContent[];
}

export interface DashboardLive {
    activeChannels: number;
    totalChannels: number;
    liveViewers: number;
    topChannels: TopContent[];
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



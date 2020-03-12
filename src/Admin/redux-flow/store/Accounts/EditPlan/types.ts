export enum ActionTypes  {
    GET_ACCOUNT_PLAN = "@@admin/GET_ACCOUNT_PLAN",
    SAVE_ACCOUNT_PLAN = "@@admin/SAVE_ACCOUNT_PLAN",
    SWITCH_ACCOUNT_PLAN = "@@admin/SWITCH_ACCOUNT_PLAN"
}

export interface PlanInfo {
    name: string;
    uploadSize: number;
    itemLimit: number;
    folderDepth: number;
    renditions: number;
    liveStreams: boolean;
    compatibleStreams: boolean;
    chinaStremas: boolean;
    dvr: boolean;
    recording: boolean;
    vod: boolean;
    folders: boolean;
    playlists: boolean;
    aes: boolean;
    signedKeys: boolean;
    api: boolean;
    webDownload: boolean;
    playerDownload: boolean;
    paywall: boolean;
    advertising: boolean;
    emailCatcher: boolean;
}

export const editPlanDefaultState: PlanInfo = null
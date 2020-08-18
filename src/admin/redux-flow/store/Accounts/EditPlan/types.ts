export enum ActionTypes  {
    GET_ACCOUNT_PLAN = "@@admin_accounts/GET_ACCOUNT_PLAN",
    SAVE_ACCOUNT_PLAN = "@@admin_accounts/SAVE_ACCOUNT_PLAN",
    SWITCH_ACCOUNT_PLAN = "@@admin_accounts/SWITCH_ACCOUNT_PLAN"
}

interface PlanSetting {
    planValue: boolean;
    currentValue: boolean | null;
}

export interface PlanInfo {
    name: string;
    uploadSize: number;
    itemLimit: number;
    folderDepth: number;
    renditions: number;
    liveStreams: PlanSetting;
    compatibleStreams: PlanSetting;
    chinaStreams: PlanSetting;
    dvr: PlanSetting;
    recording: PlanSetting;
    vod: PlanSetting;
    folders: PlanSetting;
    playlists: PlanSetting;
    aes: PlanSetting;
    signedKeys: PlanSetting;
    api: PlanSetting;
    webDownload: PlanSetting;
    playerDownload: PlanSetting;
    paywall: PlanSetting;
    advertising: PlanSetting;
    emailCatcher: PlanSetting;
}

export const editPlanDefaultState: PlanInfo = null
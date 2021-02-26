export enum ActionTypes  {
    GET_ACCOUNT_PLAN = "@@admin_accounts/GET_ACCOUNT_PLAN",
    SAVE_ACCOUNT_PLAN = "@@admin_accounts/SAVE_ACCOUNT_PLAN",
    EXTEND_TRIAL = "@@admin_accounts/EXTEND_TRIAL"
}

interface PlanSetting {
    planValue: boolean;
    userValue: boolean | null;
}

export interface PlanInfo {
    name: string;
    expiresAt: string;
    uploadSize: number;
    itemLimit: number;
    folderDepth: number;
    renditionsPerRecipe: number;
    liveStream: PlanSetting;
    compatibleStreams: PlanSetting;
    chinaStreams: PlanSetting;
    dvr: PlanSetting;
    recording: PlanSetting;
    vod: PlanSetting;
    folders: PlanSetting;
    playlists: PlanSetting;
    analytics: PlanSetting;
    aes: PlanSetting;
    signedKeys: PlanSetting;
    api: PlanSetting;
    webDownload: PlanSetting;
    playerDownload: PlanSetting;
    paywall: PlanSetting;
    advertising: PlanSetting;
    emailCatcher: PlanSetting;
    admin: PlanSetting;
    expo: PlanSetting;
    ultraSecureChannel: PlanSetting;
    phoneSupport: PlanSetting;
}

export interface PlanInfoPut {
    privileges: {
        key: string;
        value: number | boolean;
    }[];
}

export const editPlanDefaultState: PlanInfo = null
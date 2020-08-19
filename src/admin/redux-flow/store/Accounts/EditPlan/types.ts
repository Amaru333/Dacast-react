export enum ActionTypes  {
    GET_ACCOUNT_PLAN = "@@admin_accounts/GET_ACCOUNT_PLAN",
    SAVE_ACCOUNT_PLAN = "@@admin_accounts/SAVE_ACCOUNT_PLAN",
    SWITCH_ACCOUNT_PLAN = "@@admin_accounts/SWITCH_ACCOUNT_PLAN"
}

interface PlanSetting {
    planValue: boolean;
    userValue: boolean | null;
}

export interface PlanInfo {
    name: string;
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
    aes: PlanSetting;
    signedKeys: PlanSetting;
    api: PlanSetting;
    webDownload: PlanSetting;
    playerDownload: PlanSetting;
    paywall: PlanSetting;
    advertising: PlanSetting;
    emailCatcher: PlanSetting;
}

export interface PlanInfoPut {
    privileges: {
        key: string;
        value: number | boolean;
    }[];
}

export const editPlanDefaultState: PlanInfo = null
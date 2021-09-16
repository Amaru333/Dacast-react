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
    maxSeats: number;
    liveStream: PlanSetting;
    compatibleStreams: PlanSetting;
    chinaStreams: PlanSetting;
    advancedStreaming: PlanSetting;
    dvr: PlanSetting;
    recording: PlanSetting;
    vod: PlanSetting;
    folders: PlanSetting;
    playlists: PlanSetting;
    analytics: PlanSetting;
    aes: PlanSetting;
    aesBeta: PlanSetting;
    signedKeys: PlanSetting;
    api: PlanSetting;
    apiBeta: PlanSetting;
    webDownload: PlanSetting;
    paywall: PlanSetting;
    advertising: PlanSetting;
    emailCatcher: PlanSetting;
    admin: PlanSetting;
    expo: PlanSetting;
    ultraSecureChannel: PlanSetting;
    phoneSupport: PlanSetting;
    multiUserAccess: PlanSetting;
    multiUserAccessBeta: PlanSetting;
    paymentRequest: PlanSetting;
    unsecureVod: PlanSetting;
}

export interface PlanInfoPut {
    privileges: {
        key: string;
        value: number | boolean;
    }[];
}

export const editPlanDefaultState: PlanInfo = null

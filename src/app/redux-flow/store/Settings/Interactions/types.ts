export enum ActionTypes {
    GET_SETTINGS_INTERACTIONS_INFOS = "@@settings_interactions/GET_SETTINGS_INTERACTIONS_INFOS",
    SAVE_SETTINGS_INTERACTIONS_INFOS = "@@settings_interactions/SAVE_SETTINGS_INTERACTIONS_INFOS",
    SAVE_AD = "@@settings_interactions/SAVE_AD",
    CREATE_AD = "@@settings_interactions/CREATE_AD",
    DELETE_AD = "@@settings_interactions/DELETE_AD",
    SAVE_MAIL_CATCHER = "@@settings_interactions/SAVE_MAIL_CATCHER",
    CREATE_MAIL_CATCHER = "@@settings_interactions/CREATE_MAIL_CATCHER",
    DELETE_MAIL_CATCHER = "@@settings_interactions/DELETE_MAIL_CATCHER",
    GET_UPLOAD_URL = "@@live_general/GET_UPLOAD_URL",
    UPLOAD_IMAGE = "@@live_general/UPLOAD_IMAGE",
    DELETE_IMAGE = "@@live_general/DELETE_IMAGE",
}

export interface MailCatcher {
    type: string;
    isDefault: boolean;
    placement: string;
    position: string;
}

export type AdType = 'Pre-roll' | 'Mid-roll' | 'Post-roll' 

export interface Ad {
    id?: string;
    "ad-type"?: string;
    timestamp: number;
    url: string;
    type?: AdType
}


export const interactionsDefaultState: EngagementInfo = {
    brandTextSettings: null,
    endScreenSettings: null,
    brandImageSettings: null,
    adsSettings: null,
    uploadurl: null,
}

interface BrandTextSettings {
    brandText: string;
    brandTextLink: string;
    isBrandTextAsTitle: boolean;
    locked: boolean;
}

interface EndScreenSettings {
    endScreenText: string;
    endScreenTextLink: string;
    locked: boolean;
}

interface BrandImageSettings {
    brandImagePadding: number;
    brandImageSize: number;
    brandImagePosition: string;
    brandImageLink: string;
    locked: boolean;
    brandImageURL: string;
}

interface AdsSettings {
    adsEnabled: boolean;
    ads: Ad[];
    locked: boolean;
}

export interface EngagementInfo {
    brandTextSettings?: BrandTextSettings;
    endScreenSettings?: EndScreenSettings;
    brandImageSettings?: BrandImageSettings;
    adsSettings?: AdsSettings;
    mailCatcher?: MailCatcher;
    uploadurl?: string;
}

export interface ContentEngagementSettings {
    contentId: string;
    engagementSettings: EngagementInfo;
}

export interface ContentEngagementSettingsState {[key: string]: ContentEngagementSettings};

export const contentEngagementDefaultState: ContentEngagementSettingsState = {}
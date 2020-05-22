export enum ActionTypes {
    GET_SETTINGS_INTERACTIONS_INFOS = "@@settings_interactions/GET_SETTINGS_INTERACTIONS_INFOS",
    SAVE_SETTINGS_INTERACTIONS_INFOS = "@@settings_interactions/SAVE_SETTINGS_INTERACTIONS_INFOS",
    SAVE_AD = "@@settings_interactions/SAVE_AD",
    CREATE_AD = "@@settings_interactions/CREATE_AD",
    DELETE_AD = "@@settings_interactions/DELETE_AD",
    SAVE_MAIL_CATCHER = "@@settings_interactions/SAVE_MAIL_CATCHER",
    CREATE_MAIL_CATCHER = "@@settings_interactions/CREATE_MAIL_CATCHER",
    DELETE_MAIL_CATCHER = "@@settings_interactions/DELETE_MAIL_CATCHER"

}

export interface MailCatcher {
    type: string;
    isDefault: boolean;
    placement: string;
    position: string;
}

export interface Ad {
    id?: string;
    "ad-type": string;
    timestamp: number;
    url: string;
}

export interface InteractionsInfos {
    adsId?: string;
    adsEnabled: boolean;
    ads: Ad[];
    mailCatcher?: MailCatcher[];
    selectedMailCatcher?: string;
    brandText: string;
    brandTextLink: string;
    isBrandTextAsTitle: boolean;
    endScreenText: string;
    endScreenTextLink: string;
    brandImagePosition: string;
    brandImagePadding: number;
    brandImageText: string;
    brandImageLink?: string;
    brandImageSize: number;
}

export const interactionsDefaultState: InteractionsInfos = {
    adsEnabled: false,
    ads: [],
    mailCatcher: [],
    brandText: null,
    brandTextLink: null,
    isBrandTextAsTitle: false,
    endScreenText: null,
    endScreenTextLink: null,
    brandImagePosition: null,
    brandImagePadding: 0,
    brandImageText: null,
    brandImageLink: null,
    brandImageSize: 0
}

export interface ContentEngagementSettings {
    contentId: string;
    engagementSettings: InteractionsInfos;
}

export interface ContentEngagementSettingsState {[key: string]: ContentEngagementSettings};

export const contentEngagementDefaultState: ContentEngagementSettingsState = {}
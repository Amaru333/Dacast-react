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

export interface BrandImage {
    placement: string;
    size: number;
    padding: number;
    link?: string;
}

export interface InteractionsInfos {
    adsId?: string;
    adEnabled: boolean;
    ads: Ad[];
    mailCatcher?: MailCatcher[];
    selectedMailCatcher?: string;
    brandText: string;
    brandTextLink: string;
    isBrandTextAsTitle: boolean;
    endScreenText: string;
    endScreenTextLink: string;
    brandImage: BrandImage;
}

export const interactionsDefaultState: InteractionsInfos = {
    adEnabled: false,
    ads: [],
    mailCatcher: [],
    brandText: null,
    brandTextLink: null,
    isBrandTextAsTitle: false,
    endScreenText: null,
    endScreenTextLink: null,
    brandImage: null
}

export interface ContentEngagementSettings {
    contentId: string;
    engagementSettings: InteractionsInfos;
}

export const contentEngagementDefaultState: ContentEngagementSettings = {
    contentId: "-1",
    engagementSettings: interactionsDefaultState
}
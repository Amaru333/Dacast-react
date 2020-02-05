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
}

export interface Ad {
    id: string;
    placement: string;
    position: string;
    url: string;
}

export interface InteractionsInfos {
    adEnabled: boolean;
    adList: Ad[];
    mailCatcher: MailCatcher[];
    brandText: string;
    brandTextLink: string;
    isBrandTextAsTitle: boolean;
    endScreenText: string;
    endScreenTextLink: string;
}

export const interactionsDefaultState: InteractionsInfos = {
    adEnabled: false,
    adList: [],
    mailCatcher: [],
    brandText: null,
    brandTextLink: null,
    isBrandTextAsTitle: false,
    endScreenText: null,
    endScreenTextLink: null,
}
export enum ActionTypes {
    GET_CONTENT_THEME = "@@content_theming/GET_CONTENT_THEME",
    SAVE_CONTENT_THEME = "@@content_theming/SAVE_CONTENT_THEME"
}

export interface ExposThemingState {
    darkModeEnable: boolean;
    coverBackgroundEnable: boolean;
    coverBackgroundUrl?: string;
    coverBackgroundColor?: string;
    contentDescriptions: boolean;
    featuredContentEnable: boolean;
    featuredContentId?: string;
}
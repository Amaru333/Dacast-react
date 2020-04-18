import { ThemeOptions, defaultTheme } from "../../Settings/Theming/types"

export enum ActionTypes {
    GET_VOD_THEME = "@@vod_theming/GET_VOD_THEME",
    SAVE_VOD_THEME = "@@vod_theming/SAVE_VOD_THEME"
}

export interface VodTheme {
    vodId: string;
    selectedTheme: ThemeOptions;
}



export const defaultVodTheme: VodTheme = {
    vodId: null,
    selectedTheme: defaultTheme
}
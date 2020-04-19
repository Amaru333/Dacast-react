import { defaultTheme, ContentTheme } from "../../Settings/Theming/types"

export enum ActionTypes {
    GET_VOD_THEME = "@@vod_theming/GET_VOD_THEME",
    SAVE_VOD_THEME = "@@vod_theming/SAVE_VOD_THEME"
}



export const defaultVodTheme: ContentTheme = {
    id: null,
    selectedTheme: defaultTheme
}
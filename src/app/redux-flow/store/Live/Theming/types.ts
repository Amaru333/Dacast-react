import { ContentTheme, defaultTheme } from "../../Settings/Theming/types"

export enum ActionTypes {
    GET_LIVE_THEME = "@@live_theming/GET_LIVE_THEME",
    SAVE_LIVE_THEME = "@@live_theming/SAVE_LIVE_THEME"
}


export const defaultLiveTheme: ContentTheme = {
    id: null,
    selectedTheme: defaultTheme
}
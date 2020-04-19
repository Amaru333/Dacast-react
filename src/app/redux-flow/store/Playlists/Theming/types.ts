import { defaultTheme, ContentTheme } from "../../Settings/Theming/types"

export enum ActionTypes {
    GET_PLAYLIST_THEME = "@@playlist_theming/GET_PLAYLIST_THEME",
    SAVE_PLAYLIST_THEME = "@@playlist_theming/SAVE_PLAYLIST_THEME"
}

export const defaultPlaylistTheme: ContentTheme = {
    id: null,
    selectedTheme: defaultTheme
}
import { ThemeOptions } from "../../Settings/Theming/types"
import { defaultTheme } from '../../VOD/Theming/types';

export enum ActionTypes {
    GET_LIVE_THEME = "@@live_theming/GET_LIVE_THEME",
    SAVE_LIVE_THEME = "@@live_theming/SAVE_LIVE_THEME"
}

export interface LiveTheme {
    liveId: string;
    selectedTheme: ThemeOptions;
}

export const defaultLiveTheme: LiveTheme = {
    liveId: null,
    selectedTheme: defaultTheme
}
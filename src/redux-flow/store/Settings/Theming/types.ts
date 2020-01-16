export enum ActionTypes {
    GET_SETTING_THEMING_LIST = "@@settings_theming/GET_SETTINGS_THEMING_LIST",
    SAVE_SETTING_THEME = "@@settings_theming/SAVE_SETTINGS_THEME",
    CREATE_SETTING_THEME = "@@settings_theming/CREATE_SETTINGS_THEME",
    DELETE_SETTING_THEME = "@@settings_theming/DELETE_SETTINGS_THEME",
}
type ThemeType = 'vod' | 'live' | 'playlist';

type DeliveryMethod = 'compatible' | 'secure';

type RegionSetting = 'standard' | 'premium';

export interface ThemeOptions {
    themeName: string;
    isDefault: boolean;
    createdDate: string;
    themeType: ThemeType;
    bigPlayButton: boolean;
    playPause: boolean;
    scrubber: boolean;
    scrubbingThumbnail: boolean;
    timeCode: boolean;
    speedControls: boolean;
    qualityOptions: boolean;
    volume: boolean;
    fullscreen: boolean;
    thumbnailPosition: string;
    isViewerCounterEnabled: boolean;
    viewerCounterLimit: number;
    downloadButton: boolean;
    socialSharing: boolean;
    embedCode: boolean;
    autoplay: boolean;
    startVideoMuted: boolean;
    looping: boolean;
    continuousPlay: boolean;
    skipVideos: boolean;
    mailCatcher: MailCatcher[];
    endScreenText: string;
    endScreenTextLink: string;
    isTitleAsBrandText: boolean;
    brandText: string;
    brandTextLink: string;
    offlineMessage: string;
    deliveryMethod: DeliveryMethod;
    regionSettings: RegionSetting;
}

export interface MailCatcher {
    type: string;
    isDefault: boolean;
}

export interface ThemesData {
    themes: ThemeOptions[];
}

export const defaultStateThemesType: ThemesData = {
    themes: []
}
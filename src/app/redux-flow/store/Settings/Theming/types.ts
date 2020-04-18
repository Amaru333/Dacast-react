

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
    id: string;
    themeName: string;
    isDefault: boolean;
    createdDate: number;
    themeType: ThemeType;
    playerControls: boolean;
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
    playerTransparency: boolean;
    customOverlayColor: string;
    customMenuColor: string;
    autoplay: boolean;
    startVideoMuted: boolean;
    looping: boolean;
    continuousPlay: boolean;
    skipVideos: boolean;
    offlineMessage: string;
    offlineMessagePosition: string;
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

export interface ContentTheme {
    contentId: string;
    selectedTheme: ThemeOptions;
}

export const defaultStateThemesType: ThemesData = {
    themes: []
}

export const defaultTheme: ThemeOptions = {
    id: "-1",
    themeName: '',
    isDefault: false,
    createdDate: '',
    themeType: 'vod',
    bigPlayButton: false,
    playPause: false,
    scrubber: false,
    scrubbingThumbnail: false,
    timeCode: false,
    speedControls: false,
    qualityOptions: false,
    volume: false,
    fullscreen: false,
    thumbnailPosition: 'left',
    isViewerCounterEnabled: false,
    viewerCounterLimit: 100,
    downloadButton: false,
    socialSharing: false,
    embedCode: false,
    playerTransparency: false,
    hasCustomColor: false,
    customColor: '',
    autoplay: false,
    startVideoMuted: false,
    looping: false,
    continuousPlay: false,
    skipVideos: false,
    offlineMessage: '',
    deliveryMethod: 'compatible',
    regionSettings: 'standard'
}

export const defaultStateContentTheme: ContentTheme = {
    contentId: null,
    selectedTheme: defaultTheme
}
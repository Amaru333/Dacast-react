

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
    isCustom: boolean;
    createdDate: number;
    themeType: ThemeType;
    playerControls: boolean;
    bigPlayButton: 'visible' | 'hidden';
    scrubbingThumbnail: boolean;
    thumbnailPosition: string;
    isViewerCounterEnabled: boolean;
    viewerCounterLimit: number;
    downloadButton: boolean;
    socialSharing: boolean;
    embedCode: boolean;
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
    contentThemeId: string;
    themes: ThemeOptions[];
}


export interface ContentThemeState { [key: string]: ContentTheme }

export const defaultStateThemesType: ThemesData = {
    themes: []
}

export const defaultTheme: ThemeOptions = {
    id: "-1",
    themeName: '',
    isDefault: false,
    createdDate: 980989080,
    themeType: 'vod',
    isCustom: false,
    bigPlayButton: 'visible',
    playerControls: true,
    scrubbingThumbnail: true,
    thumbnailPosition: 'Top',
    isViewerCounterEnabled: false,
    viewerCounterLimit: 100,
    downloadButton: false,
    socialSharing: false,
    embedCode: false,
    customOverlayColor: '#000000',
    customMenuColor: '#ffffff',
    autoplay: false,
    startVideoMuted: false,
    looping: false,
    continuousPlay: false,
    skipVideos: false,
    offlineMessage: 'Sorry this media is offline',
    offlineMessagePosition: 'Top',
    deliveryMethod: 'compatible',
    regionSettings: 'standard'
}

export const defaultStateContentTheme: ContentThemeState = {}
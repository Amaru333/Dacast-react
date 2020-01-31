import { ThemeOptions } from "../../Settings/Theming/types"

export enum ActionTypes {
    GET_VOD_THEME = "@@vod_theming/GET_VOD_THEME",
    SAVE_VOD_THEME = "@@vod_theming/SAVE_VOD_THEME"
}

export interface VodTheme {
    vodId: string;
    selectedTheme: ThemeOptions;
}

const defaultTheme: ThemeOptions = {
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

export const defaultVodTheme: VodTheme = {
    vodId: null,
    selectedTheme: defaultTheme
}
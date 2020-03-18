import { ThemeOptions } from "../../Settings/Theming/types"

export enum ActionTypes {
    GET_PLAYLIST_THEME = "@@playlist_theming/GET_PLAYLIST_THEME",
    SAVE_PLAYLIST_THEME = "@@playlist_theming/SAVE_PLAYLIST_THEME"
}

export interface PlaylistTheme {
    playlistId: string;
    selectedTheme: ThemeOptions;
}

export const defaultTheme: ThemeOptions = {
    id: "-1",
    themeName: '',
    isDefault: false,
    createdDate: '',
    themeType: 'playlist',
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

export const defaultPlaylistTheme: PlaylistTheme = {
    playlistId: null,
    selectedTheme: defaultTheme
}
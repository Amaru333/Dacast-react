export enum ActionTypes {
    GET_PLAYLIST_DETAILS = "@@playlist_general/GET_PLAYLIST_DETAILS",
    EDIT_PLAYLIST_DETAILS = "@@playlist_general/EDIT_PLAYLIST_DETAILS",
    CHANGE_PLAYLIST_THUMBNAIL = "@@playlist_general/CHANGE_PLAYLIST_THUMBNAIL",
    CHANGE_PLAYLIST_SPLASHSCREEN = "@@playlist_general/CHANGE_PLAYLIST_SPLASHSCREEN",
    CHANGE_PLAYLIST_POSTER = "@@playlist_general/CHANGE_PLAYLIST_POSTER"
}

export interface PlaylistDetails {
    id: string;
    online: boolean;
    title: string;
    folder: string;
    description: string;
    thumbnail: string;
    splashscreen: string;
    poster?: string;
}

export interface ThumbnailUpload {
    thumbnail: File | string;
}

export interface SplashscreenUpload {
    splashscreen: File | string;
}

export interface PosterUpload {
    poster: File | string;
}
export enum ActionTypes {
    GET_VOD_DETAILS = "@@vod_general/GET_VOD_DETAILS",
    EDIT_VOD_DETAILS = "@@vod_general/EDIT_VOD_DETAILS",
    ADD_VOD_SUBTITLE = "@@vod_general/ADD_VOD_SUBTITLE",
    EDIT_VOD_SUBTITLE = "@@vod_general/EDIT_VOD_SUBTITLE",
    DELETE_VOD_SUBTITLE = "@@vod_general/DELETE_VOD_SUBTITLE",
    CHANGE_VOD_THUMBNAIL = "@@vod_general/CHANGE_VOD_THUMBNAIL"
}

export interface VodDetails {
    id: string;
    online: boolean;
    title: string;
    folder: string;
    description: string;
    thumbnail: Thumbnail
    subtitles: SubtitleInfo[]
}

export interface SubtitleInfo {
    id: string;
    fileName: string;
    language: string
}

export interface Thumbnail {
    thumbnail: File | string;
}

export enum ActionTypes {
    GET_VOD_DETAILS = "@@vod_general/GET_VOD_DETAILS",
    ADD_VOD_SUBTITLE = "@@vod_general/ADD_VOD_SUBTITLE",
    EDIT_VOD_SUBTITLE = "@@vod_general/EDIT_VOD_SUBTITLE"
}

export interface VodDetails {
    id: string;
    title: string;
    folder: string;
    description: string;
    thumbnail: File | string;
    subtitles: SubtitleInfo[]
}

export interface SubtitleInfo {
    id: string;
    fileName: string;
    language: string
}


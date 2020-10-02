
export enum ActionTypes {
    POST_CONTENT_SETUP = "@@contents/POST_CONTENT_SETUP",
    GET_CONTENT_SETUP = "@@contents/GET_CONTENT_SETUP",
}

export interface Content {
    'content-type': 'vod' | 'live';
    title: string;
    thumbnailURL: string;
    'vod-id': string;
    'live-channel-id': string;
}

export type ContentSelector = 'content' | 'folder';

export interface ContentSetupObject {
    contentList: Content[];
    folderId: string;
    id: string;
    maxItems: number;
    expoType?: ContentSelector;
    playlistType?: ContentSelector;
    sortType: "custom" | "A-to-Z" | "Z-to-A" | "date-desc"| "date-asc";
    title: string;
}

export interface ContentSetupState { 
    [key: string]: {
        [key: string] : ContentSetupObject 
    }
}


export const contentDefaultState: ContentSetupState = {}
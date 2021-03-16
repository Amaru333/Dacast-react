
export enum ActionTypes {
    POST_CONTENT_SETUP = "@@contents/POST_CONTENT_SETUP",
    GET_CONTENT_SETUP = "@@contents/GET_CONTENT_SETUP",
}

export interface Content {
    contentType: 'vod' | 'live';
    title: string;
    thumbnailURL: string;
    id: string
}

export type ContentSelectorType = 'content' | 'folder';

export type SetupSortType = "custom" | "A-to-Z" | "Z-to-A" | "date-desc"| "date-asc"

export interface ContentSetupObject {
    contentList: Content[];
    folderId: string;
    id: string;
    maxItems: number;
    type: ContentSelectorType;
    sortType: SetupSortType;
    title: string;
}

export interface ContentSetupState { 
    [key: string]: {
        [key: string] : ContentSetupObject 
    }
}


export const contentDefaultState: ContentSetupState = {}
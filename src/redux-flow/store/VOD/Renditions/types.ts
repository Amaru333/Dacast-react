export enum ActionTypes {
    GET_VOD_RENDITIONS = "@@vod_renditions/GET_VOD_RENDITIONS"
}

export interface RenditionsList {
    renditionsList: Rendition[];
    encodedRenditions: Rendition[];
}

export interface Rendition {
    id: string;
    rendition: string;
    size: string;
    bitrateCap: string;
    encoded?: boolean;
}
import { FeaturesList } from '../../../../shared/Common/Features';

export enum ActionTypes {
    DELETE_CONTENT = "@@content_list/DELETE_CONTENT",
    GET_CONTENT_LIST = "@@content_list/GET_CONTENT_LIST",
}


export interface ContentItem {
    ownerID: string;
    objectID: string;
    type: string;
    status: string;
    title: string;
    size: number;
    views?: number;
    duration: number;
    thumbnail?: string;
    createdAt: number;
    featuresList?: FeaturesList;
}

export interface SearchResult {
    results: ContentItem[];
    perPage: number;
    totalResults: number;
    pageNumber: number;
}

export interface SubtitleInfo {
    targetID: string;
    name: string;
    languageLongName: string;
    languageShortName: string;
    url?: string;
    convertToUTF8?: boolean;
}

export interface ContentListState { 
    [contentType: string]: SearchResult
}

export const initialContentList: ContentListState =  {}
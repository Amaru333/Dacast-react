import { FeaturesList } from '../../../../shared/Common/Features';
import { ContentStatus, ContentType } from '../../Common/types';

export enum ActionTypes {
    DELETE_CONTENT = "@@content_list/DELETE_CONTENT",
    GET_CONTENT_LIST = "@@content_list/GET_CONTENT_LIST",
}


export interface ContentItem {
    objectID: string;
    type: ContentType;
    status: ContentStatus;
    title: string;
    createdAt: number;
    size: number;
    duration: number;
    views?: number;
    thumbnail?: string;
    featuresList?: FeaturesList;
}

export interface SearchResult {
    results: ContentItem[];
    perPage: number;
    totalResults: number;
    pageNumber: number;
    countTotal?: number;
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
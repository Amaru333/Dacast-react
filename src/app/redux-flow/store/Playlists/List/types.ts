import { FeaturesList } from '../../../../shared/Common/Features';

export enum ActionTypes {
    GET_PLAYLIST_LIST = "@@playlists/GET_PLAYLIST_LIST",
    DELETE_PLAYLIST = '@@playlists/DELETE_PLAYLIST'
}


export interface PlaylistItem {
    ownerID: string;
    objectID: string;
    type: string;
    status: string;
    title: string;
    thumbnail?: string;
    createdAt: number;
    featuresList?: FeaturesList;
}

export interface SearchResult {
    results: PlaylistItem[];
    perPage: number;
    totalResults: number;
    pageNumber: number;
}
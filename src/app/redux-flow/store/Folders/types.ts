import { FeaturesList } from '../../../shared/Common/Features';
import { ContentStatus, FolderContentType } from '../Common/types';

export enum ActionTypes {
    GET_FOLDERS = "@@folders/GET_FOLDERS",
    GET_FOLDER_CONTENT = "@@folders/GET_FOLDER_CONTENT",
    MOVE_ITEMS_TO_FOLDER = "@@folders/MOVE_ITEMS_TO_FOLDER",
    ADD_FOLDER = "@@folders/ADD_FOLDER",
    DELETE_FOLDER = "@@folders/DELETE_FOLDER",
    DELETE_CONTENT = "@@folders/DELETE_CONTENT",
    RESTORE_CONTENT = "@@folders/RESTORE_CONTENT",
    RENAME_FOLDER = "@@folders/RENAME_FOLDER"
}

export interface ContentType {
    id: string;
    type: 'channel' | 'vod' | 'playlist' | 'folder' | 'live' | 'rendition' | 'expo';
    fullPath?: string;
    name?: string;
}
export interface SubFolder {
    [childPath: string]: FolderTreeNode;
}

export interface FolderTreeNode {
    id: string;
    name: string;
    path: string;
    hasChild: boolean;
    fullPath: string;
    loadingStatus: 'not-loaded' | 'loading' | 'loaded';
    nbChildren: number;
    subfolders: number;
    children: SubFolder;
    isExpanded: boolean;
}

export interface FolderAsset {
    objectID: string;
    title: string;
    type: FolderContentType;
    createdAt: number;
    featuresList: FeaturesList;
    duration?: string;
    size?: number;
    thumbnail?: string;
    status?: ContentStatus;
    splitPath?: string[];
    path?: string;
}

export interface SearchResult {
    results: FolderAsset[];
    perPage: number;
    totalResults: number;
    pageNumber: number;
}

export interface FoldersInfos {
    requestedFolder: SubFolder;
    requestedContent: SearchResult;
}

export interface FoldersState {
    data: FoldersInfos;
}

export const foldersInitialState: FoldersState = {
    data: {
        requestedContent: {
            results: [],
            perPage: 0,
            totalResults: 0,
            pageNumber: 0
        },
        requestedFolder: null
    }
}
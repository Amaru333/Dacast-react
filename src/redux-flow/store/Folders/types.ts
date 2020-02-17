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

export interface FolderTreeNode {
    fullPath: string;
    loadingStatus: 'not-loaded' | 'loading' | 'loaded';
    nbChildren: number;
    subfolders: number;
    children: {
        [childPath: string]: FolderTreeNode;
    };
    isExpanded: boolean;
}

export interface FolderAsset {
    id: string;
    name: string;
    thumbnail?: string;
    contentType: 'playlist' | 'vod' | 'live' | 'folder';
    created: string;
    duration: string;
    features: FolderAssetFeature;
    status: 'deleted' | 'offline' | 'online';

}

export interface FolderAssetFeature {
    recording: boolean;
    rewind: boolean;
    paywall: boolean;
    playlist: boolean;
    advertising: boolean;
    folder: boolean;
}

export interface FoldersInfos {
    requestedFolder: FolderTreeNode;
    requestedContent: FolderAsset[];
}

export interface FoldersState {
    data: FoldersInfos;
}

export const foldersInitialState: FoldersState = {
    data: null
}
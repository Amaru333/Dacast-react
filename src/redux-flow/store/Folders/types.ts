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
    contentType: 'playlist' | 'vod';
    created: string;
    duration: string;
    features: string[];
    status: 'deleted' | 'offline' | 'online';

}

export interface FoldersState {
    requestedFolder: false | FolderTreeNode;
    requestedContent: false | FolderAsset[];
}

export const foldersInitialState: FoldersState = {
    requestedFolder: false,
    requestedContent: false
}
import { AssetEndpoint, FeaturesList } from "./common";

interface FolderAssetEndpoint {
    folderGroupID: string;
    parentID: string;
    objectID: string;
    name: string;
    path: string;
    createdAt: number;
    featuresList: FeaturesList;
    splitPath?: string;
}

type FolderContentEndpoint = AssetEndpoint | FolderAssetEndpoint

export interface GetFolderContentOutput {
    page: number;
    perPage: number;
    results: FolderContentEndpoint[];
    totalResults: number;
}

export function isFolder(content: FolderContentEndpoint): content is FolderAssetEndpoint {
    //@ts-ignore
    return !!content['parentID']
}

export interface GetFolderChildrenOutput {
    folders: {
        hasChild: boolean
        id: string
        name: string
        parentId: string
        path: string
    }[]
}

export interface PostFolderInput {
    fullPath: string
}

export interface PostFolderOutput {
    id: string
}

export interface PutRenameFolderInput {
    newName: string
    id: string
}

export interface PutDeleteFolderInput {
    folderIds: string[]
}

interface MoveFolderAsset {
    id: string;
    type: 'channel' | 'vod' | 'playlist' | 'folder';
    fullPath?: string;
    name?: string;
}

export interface PutMoveFolderInput {
    destinationFoldersIds: string[] | null
    oldFolderId: string | null
    movedContent: MoveFolderAsset[]
}
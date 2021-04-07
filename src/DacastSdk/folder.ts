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
import { AssetEndpoint } from "./common";

interface FolderAssetEndpoint {
    folderGroupID: string;
    parentID: string;
    name: string;
    path: string;
    splitPath?: string;
}

export interface GetContentWithFolderOuput {
    page: number;
    perPage: number;
    results: AssetEndpoint | FolderAssetEndpoint[];
    totalResults: number;
}
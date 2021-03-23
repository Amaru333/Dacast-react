import { AssetTypeEndpoint } from "./common";

export interface GetExpoDetailsOutput {
    id: string
    title: string
    description: string
    online: boolean
    appearance: AppearanceEndpoint
    poster: AssetTypeEndpoint
}

interface AppearanceEndpoint {
    fontColor: string
    headerColor: string
}

export interface PutExpoDetailsInput {
    id: string
    payload: {
        title: string
        description: string
        online: boolean
        //appearance: AppearanceEndpoint
        //poster: AssetTypeEndpoint
    }
}

export interface GetExpoAssetUploadUrl {
    extension: string
    expoID: string
}

export interface PutExpoDesign {
    titleTextColor: string;
    descriptionTextColor: string;
    coverBackgroundEnable: boolean;
    coverBackgroundImage: string; 
    darkModeEnable: boolean;
    contentDescriptionsEnable: boolean;
    featuredContentEnable: boolean;
    featuredContentId: string;
}

export interface ExpoContentSetup {
    contentType: 'vod' | 'live';
    title: string;
    thumbnailUrl: string;
    id: string
}

interface PutExpoContentSetup {
    contentType: 'live' | 'vod'
    contentId: string
}

interface ExpoSetup {
    contentList: ExpoContentSetup[];
    folderId: string;
    maxItems: number;
    expoType: 'content' | 'folder';
    sortType: "custom" | "A-to-Z" | "Z-to-A" | "date-desc"| "date-asc";
    title: string;
}

export type GetExpoSetupOutput = ExpoSetup & {id: string}

export interface PutExpoSetupInput {
    id: string
    payload: {
        contentList: PutExpoContentSetup[];
        folderId: string;
        maxItems: number;
        expoType: 'content' | 'folder';
        sortType: "custom" | "A-to-Z" | "Z-to-A" | "date-desc"| "date-asc";
        title: string;
    }
}
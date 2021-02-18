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
        appearance: AppearanceEndpoint
        poster: AssetTypeEndpoint
    }
}

export interface GetExpoAssetUploadUrl {
    extension: string
    expoID: string
}
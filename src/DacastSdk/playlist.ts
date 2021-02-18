import { AssetTypeEndpoint } from "./common";
import { EmbedScalingEndpoint, EmbedTypeEndpoint } from "./settings";

export interface GetPlaylistDetailsOutput {
    id: string
    online: boolean
    title: string
    description: string
    folders: string[]
    embedScaling: EmbedScalingEndpoint
    embedSize: number
    embedType: EmbedTypeEndpoint
    poster: AssetTypeEndpoint
    splashscreen: AssetTypeEndpoint
    thumbnail: AssetTypeEndpoint
    paywallEnabled: boolean | null
}

export interface PutPlaylistDetailsInput {
    id: string
    payload: PutPlaylistDetailsPayload
}

interface PutPlaylistDetailsPayload {
    title: string
    description: string
    online: boolean
}

export interface GetPlaylistAssetUploadUrl {
    extension: string
    playlistID: string
}
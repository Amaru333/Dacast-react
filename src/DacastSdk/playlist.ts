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

export interface PostPlaylistInput {
    title: string
}

export interface PostPlaylistOutput {
    id: string
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

export interface PlaylistContentSetup {
    'content-type': 'vod' | 'live';
    title: string;
    thumbnailURL: string;
    'vod-id'?: string;
    'live-channel-id'?: string;
    id?: string
    creationDate: number
}

interface PlaylistSetup {
    id: string
    contentList: PlaylistContentSetup[];
    folderId: string;
    maxItems: number;
    playlistType: 'content' | 'folder';
    sortType: "custom" | "A-to-Z" | "Z-to-A" | "date-desc"| "date-asc";
    title: string;
}

export type GetPlaylistSetupOutput = PlaylistSetup

export type PutPlaylistSetupInput = PlaylistSetup
export enum ActionTypes {
    GET_PLAYLIST_DETAILS = "@@playlist_general/GET_PLAYLIST_DETAILS",
    EDIT_PLAYLIST_DETAILS = "@@playlist_general/EDIT_PLAYLIST_DETAILS",
    GET_UPLOAD_URL = "@@playlist_general/GET_UPLOAD_URL",
    UPLOAD_IMAGE = "@@playlist_general/UPLOAD_IMAGE",
    DELETE_IMAGE = "@@playlist_general/DELETE_IMAGE",
}

export interface PlaylistDetailsState { [key: string]: PlaylistDetails }

interface AssetType {
    assetGroupID: string;
    targetType: string;
    targetID: string;
    url: string;
}

export interface PlaylistDetails {
    id: string;
    online: boolean;
    title: string;
    folder: string[];
    description: string;
    thumbnail: AssetType;
    splashscreen: AssetType;
    poster?: AssetType;
    uploadurl?: string;
}

export const initialPlaylistGeneralState: PlaylistDetailsState = {}
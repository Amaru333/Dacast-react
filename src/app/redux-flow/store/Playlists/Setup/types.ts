import { FolderAsset } from '../../Folders/types';

export enum ActionTypes {
    POST_PLAYLIST_SETUP = "@@playlists/POST_PLAYLIST_SETUP",
    GET_PLAYLIST_SETUP = "@@playlists/GET_PLAYLIST_SETUP",
}

export interface PlaylistSetupState {
    items: FolderAsset[];
}

export const playlistDefaultState: PlaylistSetupState = {
    items: []
}

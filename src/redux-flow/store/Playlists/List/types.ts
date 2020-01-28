export enum ActionTypes {
    GET_PLAYLIST_LIST = "@@playlists/GET_PLAYLIST_LIST",
}

export interface PlaylistItem {
    id: string;
    online: boolean;
    title: string;
    thumbnail: string;
    created: number;
    features: FeaturesList;
}

export interface PlaylistListState {
    items: PlaylistItem[];
}

export const playlistDefaultState: PlaylistListState = {
    items: []
}

export interface FeaturesList {
    paywall: boolean;
    playlist: boolean;
    advertising: boolean;
}
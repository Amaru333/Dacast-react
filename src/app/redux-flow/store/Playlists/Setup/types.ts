
export enum ActionTypes {
    POST_PLAYLIST_SETUP = "@@playlists/POST_PLAYLIST_SETUP",
    GET_PLAYLIST_SETUP = "@@playlists/GET_PLAYLIST_SETUP",
}

export interface Content {
    'content-type': 'vod' | 'live';
    title: string;
    thumbnailURL: string;
    'vod-id': string;
    'live-channel-id': string;
}

export interface PlaylistSetupObject {
    contentList: Content[];
    folderId: string;
    id: string;
    maxItems: number;
    playlistType: 'content' | 'folder';
    sortType: "custom" | "A-to-Z" | "Z-to-A" | "date-desc"| "date-asc";
    title: string;
}

export interface PlaylistSetupState { [key: string]: PlaylistSetupObject }


export const playlistDefaultState: PlaylistSetupState = {
    "default": {
        contentList: [],
        folderId: null,
        id: null,
        maxItems: NaN,
        playlistType: null,
        sortType: 'custom',
        title: null
    } 
}
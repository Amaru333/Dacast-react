import { InteractionsInfos, interactionsDefaultState } from "../../Settings/Interactions/types"

export enum ActionTypes {
    GET_PLAYLIST_ENGAGEMENT_SETTINGS = "@@playlist_engagement/GET_PLAYLIST_ENGAGEMENT_SETTINGS",
    SAVE_PLAYLIST_ENGAGEMENT_SETTINGS = "@@playlist_engagement/SAVE_PLAYLIST_ENGAGEMENT_SETTINGS",
    SAVE_PLAYLIST_AD = "@@playlist_engagement/SAVE_PLAYLIST_AD",
    CREATE_PLAYLIST_AD = "@@playlist_engagement/CREATE_PLAYLIST_AD",
    DELETE_PLAYLIST_AD = "@@playlist_engagements/DELETE_PLAYLIST_AD"
}

export interface PlaylistEngagementSettings {
    playlistId: string;
    engagementSettings: InteractionsInfos;
}

export const playlistEngagementDefaultState: PlaylistEngagementSettings = {
    playlistId: "-1",
    engagementSettings: interactionsDefaultState
}
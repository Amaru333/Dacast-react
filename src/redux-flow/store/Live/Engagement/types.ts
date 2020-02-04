import { InteractionsInfos, interactionsDefaultState } from "../../Settings/Interactions/types"

export enum ActionTypes {
    GET_LIVE_ENGAGEMENT_SETTINGS = "@@vod_engagement/GET_VOD_ENGAGEMENT_SETTINGS",
    SAVE_LIVE_ENGAGEMENT_SETTINGS = "@@vod_engagement/SAVE_VOD_ENGAGEMENT_SETTINGS",
    SAVE_LIVE_AD = "@@vod_engagement/SAVE_VOD_AD",
    CREATE_LIVE_AD = "@@vod_engagement/CREATE_VOD_AD",
    DELETE_LIVE_AD = "@@vod_engagements/DELETE_VOD_AD"
}

export interface LiveEngagementSettings {
    liveId: string,
    engagementSettings: InteractionsInfos
}

export const liveEngagementDefaultState: LiveEngagementSettings = {
    liveId: "-1",
    engagementSettings: interactionsDefaultState
}
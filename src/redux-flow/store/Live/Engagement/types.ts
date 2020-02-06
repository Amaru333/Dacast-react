import { InteractionsInfos, interactionsDefaultState } from "../../Settings/Interactions/types"

export enum ActionTypes {
    GET_LIVE_ENGAGEMENT_SETTINGS = "@@live_engagement/GET_LIVE_ENGAGEMENT_SETTINGS",
    SAVE_LIVE_ENGAGEMENT_SETTINGS = "@@live_engagement/SAVE_LIVE_ENGAGEMENT_SETTINGS",
    SAVE_LIVE_AD = "@@live_engagement/SAVE_LIVE_AD",
    CREATE_LIVE_AD = "@@live_engagement/CREATE_LIVE_AD",
    DELETE_LIVE_AD = "@@live_engagement/DELETE_LIVE_AD"
}

export interface LiveEngagementSettings {
    liveId: string;
    engagementSettings: InteractionsInfos;
}

export const liveEngagementDefaultState: LiveEngagementSettings = {
    liveId: "-1",
    engagementSettings: interactionsDefaultState
}
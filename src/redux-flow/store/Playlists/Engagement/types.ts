import { InteractionsInfos, interactionsDefaultState } from "../../Settings/Interactions/types"

export enum ActionTypes {
    GET_VOD_ENGAGEMENT_SETTINGS = "@@vod_engagement/GET_VOD_ENGAGEMENT_SETTINGS",
    SAVE_VOD_ENGAGEMENT_SETTINGS = "@@vod_engagement/SAVE_VOD_ENGAGEMENT_SETTINGS",
    SAVE_VOD_AD = "@@vod_engagement/SAVE_VOD_AD",
    CREATE_VOD_AD = "@@vod_engagement/CREATE_VOD_AD",
    DELETE_VOD_AD = "@@vod_engagements/DELETE_VOD_AD"
}

export interface VodEngagementSettings {
<<<<<<< Updated upstream
    vodId: string,
    engagementSettings: InteractionsInfos
=======
    vodId: string;
    engagementSettings: InteractionsInfos;
>>>>>>> Stashed changes
}

export const vodEngagementDefaultState: VodEngagementSettings = {
    vodId: "-1",
    engagementSettings: interactionsDefaultState
}
import { InteractionsInfos, interactionsDefaultState } from "../../Settings/Interactions/types"

export enum ActionTypes {
    GET_VOD_ENGAGEMENT_SETTINGS = "@@vod_engagement/GET_VOD_ENGAGEMENT_SETTINGS"
}

export interface VodEngagementSettings {
    vodId: string,
    engagementSettings: InteractionsInfos
}

export const vodEngagementDefaultState: VodEngagementSettings = {
    vodId: "-1",
    engagementSettings: interactionsDefaultState
}
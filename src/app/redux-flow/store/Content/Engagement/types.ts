import { ContentEngagementSettings } from '../../Settings/Interactions/types';

export enum ActionTypes {
    GET_CONTENT_ENGAGEMENT_SETTINGS = "@@content_engagement/GET_CONTENT_ENGAGEMENT_SETTINGS",
    SAVE_CONTENT_ENGAGEMENT_SETTINGS = "@@content_engagement/SAVE_CONTENT_ENGAGEMENT_SETTINGS",
    LOCK_SECTION = "@@content_engagement/LOCK_SECTION",
    SAVE_CONTENT_AD = "@@content_engagement/SAVE_CONTENT_AD",
    CREATE_CONTENT_AD = "@@content_engagement/CREATE_CONTENT_AD",
    DELETE_CONTENT_AD = "@@content_engagement/DELETE_CONTENT_AD",
    GET_UPLOAD_URL= "@@content_engagements/GET_UPLOAD_URL",
    UPLOAD_IMAGE= "@@content_engagements/UPLOAD_IMAGE",
    DELETE_IMAGE="@@content_engagements/DELETE_IMAGE"
}

export interface ContentEngagementState {
    [key: string]: {[key: string]: ContentEngagementSettings}
}
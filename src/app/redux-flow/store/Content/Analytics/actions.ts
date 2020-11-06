import { ActionTypes, ContentAnalyticsState } from "./types"
import { applyViewModel } from '../../../../utils/utils'
import { dacastSdk } from '../../../../utils/services/axios/axiosClient'
import { formatGetContentAnalyticsOutput, formatGetContentAnalyticsInput } from './viewModel'

export interface GetContentAnalytics {
    type: ActionTypes.GET_CONTENT_ANALYTICS;
    payload: {contentId: string; contentType: string; data: ContentAnalyticsState };
}

export const getContentAnalyticsAction = applyViewModel(dacastSdk.getContentAnalytics, formatGetContentAnalyticsInput, formatGetContentAnalyticsOutput, ActionTypes.GET_CONTENT_ANALYTICS, null, 'Couldn\'t get analytics for this content')

export type Action = GetContentAnalytics;

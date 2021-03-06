import { AccountAnalyticsEngagementState, ActionTypes } from "./types"
import { applyViewModel } from '../../../../utils/utils'
import { dacastSdk } from '../../../../utils/services/axios/axiosClient'
import { formatGetAccountAnalyticsInput, formatGetAccountAnalyticsEngagementOutput } from './viewModel'

export interface GetAccountAnalyticsEngagement {
    type: ActionTypes.GET_ACCOUNT_ANALYTICS_ENGAGEMENT;
    payload: AccountAnalyticsEngagementState;
}

export const getAccountAnalyticsEngagementAction = applyViewModel(dacastSdk.getAccountAnalytics, formatGetAccountAnalyticsInput, formatGetAccountAnalyticsEngagementOutput, ActionTypes.GET_ACCOUNT_ANALYTICS_ENGAGEMENT, null, 'Couldn\'t get analytics engagement')

export type Action = GetAccountAnalyticsEngagement;

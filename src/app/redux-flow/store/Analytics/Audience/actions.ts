import { AccountAnalyticsAudienceState, ActionTypes } from "./types"
import { applyViewModel } from '../../../../utils/utils'
import { dacastSdk } from '../../../../utils/services/axios/axiosClient'
import { formatGetAccountAnalyticsAudienceOutput, formatGetAccountAnalyticsInput } from './viewModel'

export interface GetAccountAnalyticsAudience {
    type: ActionTypes.GET_ACCOUNT_ANALYTICS_AUDIENCE;
    payload: AccountAnalyticsAudienceState;
}

export const getAccountAnalyticsAudienceAction = applyViewModel(dacastSdk.getAccountAnalytics, formatGetAccountAnalyticsInput, formatGetAccountAnalyticsAudienceOutput, ActionTypes.GET_ACCOUNT_ANALYTICS_AUDIENCE, null, 'Couldn\'t get audience analytics')

export type Action = GetAccountAnalyticsAudience;

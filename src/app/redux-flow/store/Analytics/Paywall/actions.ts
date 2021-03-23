import { AccountAnalyticsPaywallState, ActionTypes } from "./types"
import { applyViewModel } from '../../../../utils/utils'
import { dacastSdk } from '../../../../utils/services/axios/axiosClient'
import { formatGetAccountAnalyticsInput, formatGetAccountAnalyticsPaywallOutput } from './viewModel'

export interface GetAccountAnalyticsPaywall {
    type: ActionTypes.GET_ACCOUNT_ANALYTICS_PAYWALL;
    payload: AccountAnalyticsPaywallState;
}

export const getAccountAnalyticsPaywallAction = applyViewModel(dacastSdk.getAccountAnalytics, formatGetAccountAnalyticsInput, formatGetAccountAnalyticsPaywallOutput, ActionTypes.GET_ACCOUNT_ANALYTICS_PAYWALL, null, 'Couldn\'t get analytics paywall')

export type Action = GetAccountAnalyticsPaywall;

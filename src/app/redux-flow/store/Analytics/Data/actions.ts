import { AccountAnalyticsDataState, ActionTypes } from "./types"
import { applyViewModel } from '../../../../utils/utils'
import { dacastSdk } from '../../../../utils/services/axios/axiosClient'
import { formatGetAccountAnalyticsInput, formatGetAccountAnalyticsDataOutput } from './viewModel'

export interface GetAccountAnalyticsData {
    type: ActionTypes.GET_ACCOUNT_ANALYTICS_DATA;
    payload: AccountAnalyticsDataState;
}

export const getAccountAnalyticsDataAction = applyViewModel(dacastSdk.getAccountAnalytics, formatGetAccountAnalyticsInput, formatGetAccountAnalyticsDataOutput, ActionTypes.GET_ACCOUNT_ANALYTICS_DATA, null, 'Couldn\'t get analytics data consumption')

export type Action = GetAccountAnalyticsData;

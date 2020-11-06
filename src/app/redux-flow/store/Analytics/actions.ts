import { ActionTypes } from './types';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';
import { applyViewModel } from '../../../utils/utils';
import { AudienceAnalyticsState, SalesAnalyticsState } from '../Content/Analytics';
import { formatGetAudienceAnalyticsInput, formatGetAudienceAnalyticsOutput, formatGetDataAnalyticsInput, formatGetDataAnalyticsOutput, formatGetRevenueAnalyticsInput, formatGetRevenueAnalyticsOutput } from './viewModel';


export interface GetRevenueAnalytics {
    type: ActionTypes.GET_REVENUE_ANALYTICS;
    payload: {data: SalesAnalyticsState };
}

export interface GetDataAnalytics {
    type: ActionTypes.GET_DATA_ANALYTICS;
    payload: {data: SalesAnalyticsState };
}

export interface GetAudienceAnalytics {
    type: ActionTypes.GET_AUDIENCE_ANALYTICS;
    payload: {data: AudienceAnalyticsState };
}

export const getRevenueAnalyticsAction = applyViewModel(dacastSdk.getRevenueAnalytics, formatGetRevenueAnalyticsInput, formatGetRevenueAnalyticsOutput, ActionTypes.GET_REVENUE_ANALYTICS, null, 'Couldn\'t get Revenue analytics')
export const getDataAnalyticsAction = applyViewModel(dacastSdk.getDataAnalytics, formatGetDataAnalyticsInput, formatGetDataAnalyticsOutput, ActionTypes.GET_DATA_ANALYTICS, null, 'Couldn\'t get Data Usage analytics')
export const getAudienceAnalyticsAction = applyViewModel(dacastSdk.getAudienceAnalytics, formatGetAudienceAnalyticsInput, formatGetAudienceAnalyticsOutput, ActionTypes.GET_AUDIENCE_ANALYTICS, null, 'Couldn\'t get Audience analytics')


export type Action = GetRevenueAnalytics | GetDataAnalytics | GetAudienceAnalytics;

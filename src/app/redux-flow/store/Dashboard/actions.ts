import { ActionTypes, DashboardGeneralInfo, DashboardInfos, DashboardLive, DashboardPaywall, DashboardVod } from "./types";
import { applyViewModel } from "../../../utils/utils";
import { dacastSdk } from "../../../utils/services/axios/axiosClient";
import { formatGetDashboardGeneralInfoOutput, formatGetDashboardInfoOutput, formatGetDashboardLiveOutput, formatGetDashboardPaywallOutput, formatGetDashboardVodOutput } from "./viewModel";

export interface GetDashboardDetails {
    type: ActionTypes.GET_DASHBOARD_DETAILS;
    payload: DashboardInfos;
}

export interface GetDashboardGeneralDetails {
    type: ActionTypes.GET_DASHBOARD_GENERAL_DETAILS;
    payload: DashboardGeneralInfo;
}

export interface GetDashboardLive {
    type: ActionTypes.GET_DASHBOARD_LIVE;
    payload: DashboardLive;
}

export interface GetDashboardVod {
    type: ActionTypes.GET_DASHBOARD_VOD;
    payload: DashboardVod;
}

export interface GetDashboardPaywall {
    type: ActionTypes.GET_DASHBOARD_PAYWALL;
    payload: DashboardPaywall;
}

export const getDashboardDetailsAction = applyViewModel(dacastSdk.getDashboardInfo, undefined, formatGetDashboardInfoOutput, ActionTypes.GET_DASHBOARD_DETAILS, null, 'Couldn\'t get dashboard info')

export const getDashboardGeneralDetailsAction = applyViewModel(dacastSdk.getDashboardGeneralInfo, undefined, formatGetDashboardGeneralInfoOutput, ActionTypes.GET_DASHBOARD_GENERAL_DETAILS, null, 'Couldn\'t get dashboard info')
export const getDashboardLiveAction = applyViewModel(dacastSdk.getDashboardLiveInfo, undefined, formatGetDashboardLiveOutput, ActionTypes.GET_DASHBOARD_LIVE, null, 'Couldn\'t get dashboard info')
export const getDashboardVodAction = applyViewModel(dacastSdk.getDashboardVodInfo, undefined, formatGetDashboardVodOutput, ActionTypes.GET_DASHBOARD_VOD, null, 'Couldn\'t get dashboard info')
export const getDashboardPaywallAction = applyViewModel(dacastSdk.getDashboardPaywallInfo, undefined, formatGetDashboardPaywallOutput, ActionTypes.GET_DASHBOARD_PAYWALL, null, 'Couldn\'t get dashboard info')

export type Action = GetDashboardDetails | GetDashboardGeneralDetails | GetDashboardLive | GetDashboardVod | GetDashboardPaywall;

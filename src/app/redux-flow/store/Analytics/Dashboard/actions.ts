import { ActionTypes, AnalyticsDashboardNewInfo, AnalyticsTopContentInfo, GetAnalyticsDashboardOptions} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsDashboardServices } from './services';
import { showToastNotification } from '../../Toasts';
import { applyViewModel } from "../../../../utils/utils";
import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { formatGetAccountAnalyticsInput, formatGetAnalyticsTopContentInput, formatGetAnalyticsTopContentOutput, formatGetDashboardNewAnalyticsOuput } from "./viewModel";


export interface GetAnalyticsDashboard {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD;
    payload: {data: any} | false;
}

export interface GetAnalyticsDashboardNew {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD_NEW;
    payload: AnalyticsDashboardNewInfo;
}

export interface GetAnalyticsTopContent {
    type: ActionTypes.GET_ANALYTICS_TOP_CONTENT;
    payload: AnalyticsTopContentInfo[];
}

export const getAnalyticsDashboardAction = (dates: GetAnalyticsDashboardOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsDashboard> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsDashboard> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD, payload: false} );
        await AnalyticsDashboardServices.getAnalyticsDashboard(dates)
            .then( response => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD, payload: {data: response.data} } );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD, payload: { data:  { map: [], failed: true} } }  );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const getAnalyticsDashboardNewAction = applyViewModel(dacastSdk.getAccountAnalytics, formatGetAccountAnalyticsInput, formatGetDashboardNewAnalyticsOuput, ActionTypes.GET_ANALYTICS_DASHBOARD_NEW, null, 'Couldn\'t get dashboard analytics')
export const getAnalyticsTopContentAction = applyViewModel(dacastSdk.getTopContentAnalytics, formatGetAnalyticsTopContentInput, formatGetAnalyticsTopContentOutput, ActionTypes.GET_ANALYTICS_TOP_CONTENT, null, 'Couldn\'t get top content')

export type Action = GetAnalyticsDashboard | GetAnalyticsDashboardNew | GetAnalyticsTopContent;
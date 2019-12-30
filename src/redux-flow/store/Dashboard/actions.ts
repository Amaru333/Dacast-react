import { ActionTypes, DashboardInfos } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "..";
import { DashboardServices } from './services';
import { showToastNotification } from '../Toasts';

export interface GetDashboardDetails {
    type: ActionTypes.GET_DASHBOARD_DETAILS;
    payload: DashboardInfos;
}

export const getDashboardDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetDashboardDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetDashboardDetails> ) => {
        await DashboardServices.getDashboardDetailsService()
            .then( response => {
                dispatch( {type: ActionTypes.GET_DASHBOARD_DETAILS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetDashboardDetails;

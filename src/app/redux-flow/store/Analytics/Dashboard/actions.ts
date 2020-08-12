import { ActionTypes, GetAnalyticsDashboardOptions} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { AnalyticsDashboardServices } from './services';
import { showToastNotification } from '../../Toasts';


export interface GetAnalyticsDashboard {
    type: ActionTypes.GET_ANALYTICS_DASHBOARD;
    payload: {data: any} | false;
}

export const getAnalyticsDashboardAction = (dates: GetAnalyticsDashboardOptions): ThunkDispatch<Promise<void>, {}, GetAnalyticsDashboard> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetAnalyticsDashboard> ) => {
        dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD, payload: false} );
        await AnalyticsDashboardServices.getAnalyticsDashboard(dates)
            .then( response => {
                console.log(response);
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD, payload: {data: response.data} } );
            }).catch(() => {
                dispatch( {type: ActionTypes.GET_ANALYTICS_DASHBOARD, payload: { data:  { map: [], failed: true} } }  );
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type Action = GetAnalyticsDashboard;

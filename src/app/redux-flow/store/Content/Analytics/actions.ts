import { ActionTypes } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { ContentAnalyticsServices } from './services'
import { showToastNotification } from '../../Toasts'
import { parseContentType } from '../../../../utils/utils'

export interface GetContentAnalytics {
    type: ActionTypes.GET_CONTENT_ANALYTICS;
    payload: {contentId: string; contentType: string; data:  any };
}

export const getContentAnalyticsAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentAnalytics> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetContentAnalytics> ) => {
        await ContentAnalyticsServices.getContentAnalyticsService(contentId, contentType)
            .then( response => {
                dispatch( {type: ActionTypes.GET_CONTENT_ANALYTICS, payload:{contentId: contentId, contentType: contentType, data: response.data.data} } )
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}

export type Action = GetContentAnalytics;

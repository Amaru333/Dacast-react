import { ActionTypes, SearchResult, } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { showToastNotification } from '../../Toasts'
import { contentListServices } from './services'
import { parseContentType } from '../../../../utils/utils'
import { resolve } from 'dns'

export interface GetContentList {
    type: ActionTypes.GET_CONTENT_LIST;
    payload: {data: SearchResult, contentType: string, countTotal?: number };
}

export interface DeleteContent {
    type: ActionTypes.DELETE_CONTENT;
    payload: {id: string};
}

export const getContentListAction = (qs: string , contentType: string): ThunkDispatch<Promise<void>, {}, GetContentList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentList>) => {
        await contentListServices.getContentList(qs, parseContentType(contentType))
            .then(response => {
                const data = response.data.data ? response.data.data : response.data;
                dispatch({ type: ActionTypes.GET_CONTENT_LIST, payload: {countTotal: qs ? undefined : data.totalResults, data: data, contentType: contentType} })
            })
            .catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}

export const deleteContentAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, DeleteContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteContent>) => {
        await contentListServices.deleteContentService(contentId, parseContentType(contentType))
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_CONTENT, payload: {id: contentId, contentType: contentType} })
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
                return Promise.reject()
            })
    }
}

export type Action = GetContentList | DeleteContent
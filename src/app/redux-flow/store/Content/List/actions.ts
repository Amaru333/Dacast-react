import { ActionTypes, SearchResult, } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { showToastNotification } from '../../Toasts'
import { contentListServices } from './services'
import { parseContentType } from '../../../../utils/utils'

export interface GetContentList {
    type: ActionTypes.GET_CONTENT_LIST;
    payload: {data: SearchResult, contentType: string};
}

export interface DeleteContent {
    type: ActionTypes.DELETE_CONTENT;
    payload: {id: string};
}

export const getContentListAction = (qs: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentList>) => {
        await contentListServices.getContentList(qs, parseContentType(contentType))
            .then(response => {
                dispatch({ type: ActionTypes.GET_CONTENT_LIST, payload: {data: response.data.data, contentType: contentType} })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
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
            })
    }
}

export type Action = GetContentList | DeleteContent
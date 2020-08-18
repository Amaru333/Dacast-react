import { ActionTypes } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { ContentChaptersServices } from './services'
import { showToastNotification } from '../../Toasts'
import { ChapterMarker } from './types'

export interface GetContentChapterMarkers {
    type: ActionTypes.GET_CONTENT_CHAPTER_MARKERS;
    payload: {contentId: string; contentType: string; data: { chapterMarkers: ChapterMarker[]}};
}

export interface SaveContentChapterMarker {
    type: ActionTypes.SAVE_CONTENT_CHAPTER_MARKER;
    payload: {contentId: string; contentType: string; data: ChapterMarker[]};
}

export interface AddContentChapterMarker {
    type: ActionTypes.ADD_CONTENT_CHAPTER_MARKER;
    payload: {contentId: string; contentType: string; data: ChapterMarker[]};
}

export interface DeleteContentChapterMarker {
    type: ActionTypes.DELETE_CONTENT_CHAPTER_MARKER;
    payload: {contentId: string; contentType: string; data: ChapterMarker[]};
}

export const getContentChapterMarkersAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentChapterMarkers> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetContentChapterMarkers> ) => {
        await ContentChaptersServices.getContentChapterMarkersService(contentId, contentType)
            .then( response => {
                dispatch( {type: ActionTypes.GET_CONTENT_CHAPTER_MARKERS, payload:{contentId: contentId, contentType: contentType, data: response.data.data} } )
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const saveContentChapterMarkerAction = (contentId: string, contentType: string, data: ChapterMarker[]): ThunkDispatch<Promise<void>, {}, SaveContentChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveContentChapterMarker> ) => {
        await ContentChaptersServices.saveContentChapterMarkerService(contentId, contentType, data)
            .then( () => {
                dispatch( {type: ActionTypes.SAVE_CONTENT_CHAPTER_MARKER, payload:{contentId: contentId, contentType: contentType, data: data} } )
                dispatch(showToastNotification(`Chapter has been saved`, 'fixed', "success"))
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const addContentChapterMarkerAction = (contentId: string, contentType: string, data: ChapterMarker[]): ThunkDispatch<Promise<void>, {}, AddContentChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, AddContentChapterMarker> ) => {
        await ContentChaptersServices.saveContentChapterMarkerService(contentId, contentType, data)
            .then( () => {
                dispatch( {type: ActionTypes.ADD_CONTENT_CHAPTER_MARKER, payload:{contentId: contentId, contentType: contentType, data: data} } )
                dispatch(showToastNotification(`Chapter has been saved`, 'fixed', "success"))
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteContentChapterMarkerAction = (contentId: string, contentType: string, data: ChapterMarker[]): ThunkDispatch<Promise<void>, {}, DeleteContentChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteContentChapterMarker> ) => {
        await ContentChaptersServices.saveContentChapterMarkerService(contentId, contentType, data)
            .then( () => {
                dispatch( {type: ActionTypes.DELETE_CONTENT_CHAPTER_MARKER, payload:{contentId: contentId, contentType: contentType, data: data} } )
                dispatch(showToastNotification(`Chapter has been deleted`, 'fixed', "success"))
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export type Action = GetContentChapterMarkers | SaveContentChapterMarker | AddContentChapterMarker | DeleteContentChapterMarker

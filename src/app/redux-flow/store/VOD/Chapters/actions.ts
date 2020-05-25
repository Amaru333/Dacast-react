import { ActionTypes } from "./types"
import { ThunkDispatch } from "redux-thunk"
import { ApplicationState } from "../.."
import { VodChaptersServices } from './services'
import { showToastNotification } from '../../Toasts'
import { ChapterMarker } from './types'

export interface GetVodChapterMarkers {
    type: ActionTypes.GET_VOD_CHAPTER_MARKERS;
    payload: {id: string; data: { chapterMarkers: ChapterMarker[]}};
}

export interface SaveVodChapterMarker {
    type: ActionTypes.SAVE_VOD_CHAPTER_MARKER;
    payload: {id: string; data: ChapterMarker[]};
}

export interface AddVodChapterMarker {
    type: ActionTypes.ADD_VOD_CHAPTER_MARKER;
    payload: {id: string; data: ChapterMarker[]};
}

export interface DeleteVodChapterMarker {
    type: ActionTypes.DELETE_VOD_CHAPTER_MARKER;
    payload: {id: string; data: ChapterMarker[]};
}

export const getVodChapterMarkersAction = (vodId: string): ThunkDispatch<Promise<void>, {}, GetVodChapterMarkers> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodChapterMarkers> ) => {
        await VodChaptersServices.getVodChapterMarkersService(vodId)
            .then( response => {
                dispatch( {type: ActionTypes.GET_VOD_CHAPTER_MARKERS, payload:{id: vodId, data: response.data.data} } )
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const saveVodChapterMarkerAction = (vodId: string, data: ChapterMarker[]): ThunkDispatch<Promise<void>, {}, SaveVodChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodChapterMarker> ) => {
        await VodChaptersServices.saveVodChapterMarkerService(vodId, data)
            .then( () => {
                dispatch( {type: ActionTypes.SAVE_VOD_CHAPTER_MARKER, payload:{id: vodId, data: data} } )
                dispatch(showToastNotification(`Chapter has been saved`, 'fixed', "success"))
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const addVodChapterMarkerAction = (vodId: string, data: ChapterMarker[]): ThunkDispatch<Promise<void>, {}, AddVodChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, AddVodChapterMarker> ) => {
        await VodChaptersServices.saveVodChapterMarkerService(vodId, data)
            .then( () => {
                dispatch( {type: ActionTypes.ADD_VOD_CHAPTER_MARKER, payload:{id: vodId, data: data} } )
                dispatch(showToastNotification(`Chapter has been saved`, 'fixed', "success"))
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteVodChapterMarkerAction = (vodId: string, data: ChapterMarker[]): ThunkDispatch<Promise<void>, {}, DeleteVodChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteVodChapterMarker> ) => {
        await VodChaptersServices.saveVodChapterMarkerService(vodId, data)
            .then( () => {
                dispatch( {type: ActionTypes.DELETE_VOD_CHAPTER_MARKER, payload:{id: vodId, data: data} } )
                dispatch(showToastNotification(`Chapter has been deleted`, 'fixed', "success"))
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export type Action = GetVodChapterMarkers | SaveVodChapterMarker | AddVodChapterMarker | DeleteVodChapterMarker

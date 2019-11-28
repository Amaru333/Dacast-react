import { ActionTypes } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { VodChaptersServices } from './services';
import { showToastNotification } from '../../toasts';
import { ChapterMarker } from './types';

export interface GetVodChapterMarkers {
    type: ActionTypes.GET_VOD_CHAPTER_MARKERS;
    payload: ChapterMarker[];
}

export interface SaveVodChapterMarker {
    type: ActionTypes.SAVE_VOD_CHAPTER_MARKER;
    payload: ChapterMarker;
}

export interface AddVodChapterMarker {
    type: ActionTypes.ADD_VOD_CHAPTER_MARKER;
    payload: ChapterMarker;
}

export interface DeleteVodChapterMarker {
    type: ActionTypes.DELETE_VOD_CHAPTER_MARKER;
    payload: ChapterMarker;
}

export const getVodChapterMarkersAction = (): ThunkDispatch<Promise<void>, {}, GetVodChapterMarkers> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetVodChapterMarkers> ) => {
        await VodChaptersServices.getVodChapterMarkersService()
        .then( response => {
            dispatch( {type: ActionTypes.GET_VOD_CHAPTER_MARKERS, payload: response.data} );
        })
        .catch(() => {
            dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
        })
    };
}

export const saveVodChapterMarkerAction = (data: ChapterMarker): ThunkDispatch<Promise<void>, {}, SaveVodChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, SaveVodChapterMarker> ) => {
        await VodChaptersServices.saveVodChapterMarkerService(data)
        .then( response => {
            dispatch( {type: ActionTypes.SAVE_VOD_CHAPTER_MARKER, payload: response.data} );
        })
        .catch(() => {
            dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
        })
    };
}

export const addVodChapterMarkerAction = (data: ChapterMarker): ThunkDispatch<Promise<void>, {}, AddVodChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, AddVodChapterMarker> ) => {
        await VodChaptersServices.addVodChapterMarkerService(data)
        .then( response => {
            dispatch( {type: ActionTypes.ADD_VOD_CHAPTER_MARKER, payload: response.data} );
        })
        .catch(() => {
            dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
        })
    };
}

export const deleteVodChapterMarkerAction = (data: ChapterMarker): ThunkDispatch<Promise<void>, {}, DeleteVodChapterMarker> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteVodChapterMarker> ) => {
        await VodChaptersServices.deleteVodChapterMarkerService(data)
        .then( response => {
            dispatch( {type: ActionTypes.DELETE_VOD_CHAPTER_MARKER, payload: response.data} );
        })
        .catch(() => {
            dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
        })
    };
}

export type Action = GetVodChapterMarkers | SaveVodChapterMarker | AddVodChapterMarker | DeleteVodChapterMarker;

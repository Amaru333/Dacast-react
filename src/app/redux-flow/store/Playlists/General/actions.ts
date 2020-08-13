import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PlaylistDetails } from './types';
import { PlaylistGeneralServices } from './services';
import { ContentDetails } from '../../VOD/General/types';

export interface GetPlaylistDetails {
    type: ActionTypes.GET_PLAYLIST_DETAILS;
    payload: {data: ContentDetails};
}

export interface EditPlaylistDetails {
    type: ActionTypes.EDIT_PLAYLIST_DETAILS;
    payload: ContentDetails;
}

export interface GetUploadUrl {
    type: ActionTypes.GET_UPLOAD_URL;
    payload: { id: string; data:  {presignedURL: string } };
}

export interface UploadImage {
    type: ActionTypes.UPLOAD_IMAGE;
    payload: {playlistId: string};
}

export interface DeleteImage {
    type: ActionTypes.DELETE_IMAGE;
    payload: {id: string, playlistId: string, uploadType: string};
}

export const getPlaylistDetailsAction = (playlistId: string): ThunkDispatch<Promise<void>, {}, GetPlaylistDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistDetails>) => {
        await PlaylistGeneralServices.getPlaylistDetailsService(playlistId)
            .then(response => {
                dispatch({ type: ActionTypes.GET_PLAYLIST_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const editPlaylistDetailsAction = (data: ContentDetails): ThunkDispatch<Promise<void>, {}, EditPlaylistDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, EditPlaylistDetails>) => {
        await PlaylistGeneralServices.editPlaylistDetailsService(data)
            .then(response => {
                dispatch({ type: ActionTypes.EDIT_PLAYLIST_DETAILS, payload: data });
                dispatch(showToastNotification("Changes have been saved", 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export const getUploadUrlAction = (uploadType: string, playlistId: string, extension: string): ThunkDispatch<Promise<void>, {}, GetUploadUrl> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetUploadUrl>) => {
        await PlaylistGeneralServices.getUploadUrl(uploadType, playlistId, extension)
            .then(response => {
                dispatch({ type: ActionTypes.GET_UPLOAD_URL, payload:{ id: playlistId, data: response.data.data } })
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const uploadFileAction = (data: File, uploadUrl: string, playlistId: string, uploadType: string): ThunkDispatch<Promise<void>, {}, UploadImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, UploadImage>) => {
        await PlaylistGeneralServices.uploadFile(data, uploadUrl)
            .then(response => {
                dispatch({ type: ActionTypes.UPLOAD_IMAGE, payload: {playlistId: playlistId}})
                dispatch(showToastNotification(`${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} has been saved`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export const deleteFileAction = (playlistId: string, targetId: string, uploadType: string): ThunkDispatch<Promise<void>, {}, DeleteImage> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteImage>) => {
        await PlaylistGeneralServices.deleteFile(playlistId, targetId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_IMAGE, payload: {playlistId: playlistId, id: targetId, uploadType: uploadType} })
                dispatch(showToastNotification(`${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)} has been deleted`, 'fixed', "success"))
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}

export type Action = GetPlaylistDetails | EditPlaylistDetails | GetUploadUrl | UploadImage | DeleteImage 
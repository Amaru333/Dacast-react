import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { ActionTypes, PlaylistDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from './types';
import { PlaylistGeneralServices } from './services';

export interface GetPlaylistDetails {
    type: ActionTypes.GET_PLAYLIST_DETAILS;
    payload: PlaylistDetails;
}

export interface EditPlaylistDetails {
    type: ActionTypes.EDIT_PLAYLIST_DETAILS;
    payload: PlaylistDetails;
}
export interface ChangePlaylistThumbnail {
    type: ActionTypes.CHANGE_PLAYLIST_THUMBNAIL;
    payload: { thumbnail: string };
}
export interface DeletePlaylistThumbnail {
    type: ActionTypes.DELETE_PLAYLIST_THUMBNAIL;
    payload: {thumbnail: string};
}

export interface ChangePlaylistSplashscreen {
    type: ActionTypes.CHANGE_PLAYLIST_SPLASHSCREEN;
    payload: {splashscreen: string};
}

export interface DeletePlaylistSplashscreen {
    type: ActionTypes.DELETE_PLAYLIST_SPLASHSCREEN;
    payload: {splashscreen: string};
}

export interface ChangePlaylistPoster {
    type: ActionTypes.CHANGE_PLAYLIST_POSTER;
    payload: {poster: string};
}

export interface DeletePlaylistPoster {
    type: ActionTypes.DELETE_PLAYLIST_POSTER;
    payload: {poster: string};
}

export const getPlaylistDetailsAction = (): ThunkDispatch<Promise<void>, {}, GetPlaylistDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistDetails>) => {
        await PlaylistGeneralServices.getPlaylistDetailsService()
            .then(response => {
                dispatch({ type: ActionTypes.GET_PLAYLIST_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const editPlaylistDetailsAction = (data: PlaylistDetails): ThunkDispatch<Promise<void>, {}, EditPlaylistDetails> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, EditPlaylistDetails>) => {
        await PlaylistGeneralServices.editPlaylistDetailsService(data)
            .then(response => {
                dispatch({ type: ActionTypes.EDIT_PLAYLIST_DETAILS, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export const changePlaylistThumbnailAction = (data: ThumbnailUpload): ThunkDispatch<Promise<void>, {}, ChangePlaylistThumbnail> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangePlaylistThumbnail>) => {
        await PlaylistGeneralServices.changePlaylistThumbnailService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_PLAYLIST_THUMBNAIL, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deletePlaylistThumbnailAction = (): ThunkDispatch<Promise<void>, {}, DeletePlaylistThumbnail> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePlaylistThumbnail>) => {
        await PlaylistGeneralServices.deletePlaylistThumbnailService()
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_PLAYLIST_THUMBNAIL, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const changePlaylistSplashscreenAction = (data: SplashscreenUpload): ThunkDispatch<Promise<void>, {}, ChangePlaylistSplashscreen> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangePlaylistSplashscreen>) => {
        await PlaylistGeneralServices.changePlaylistSplashscrenService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_PLAYLIST_SPLASHSCREEN, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deletePlaylistSplashscreenAction = (): ThunkDispatch<Promise<void>, {}, DeletePlaylistSplashscreen> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePlaylistSplashscreen>) => {
        await PlaylistGeneralServices.deletePlaylistSplashscrenService()
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_PLAYLIST_SPLASHSCREEN, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const changePlaylistPosterAction = (data: PosterUpload): ThunkDispatch<Promise<void>, {}, ChangePlaylistPoster> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, ChangePlaylistPoster>) => {
        await PlaylistGeneralServices.changePlaylistPosterService(data)
            .then(response => {
                dispatch({ type: ActionTypes.CHANGE_PLAYLIST_POSTER, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deletePlaylistPosterAction = (): ThunkDispatch<Promise<void>, {}, DeletePlaylistPoster> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePlaylistPoster>) => {
        await PlaylistGeneralServices.deletePlaylistPosterService()
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_PLAYLIST_POSTER, payload: response.data });
            })
            .catch((error) => {
                console.log(error)
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPlaylistDetails | EditPlaylistDetails | ChangePlaylistThumbnail | DeletePlaylistThumbnail | ChangePlaylistSplashscreen | DeletePlaylistSplashscreen | ChangePlaylistPoster | DeletePlaylistPoster; 
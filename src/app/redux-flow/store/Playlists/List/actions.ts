import { ActionTypes, SearchResult} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { PlaylistListServices } from './services';

export interface GetPlaylistList {
    type: ActionTypes.GET_PLAYLIST_LIST;
    payload: {data: SearchResult};
}

export interface DeletePlaylist {
    type: ActionTypes.DELETE_PLAYLIST;
    payload: {id: string};
}

export const getPlaylistListAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetPlaylistList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistList>) => {
        await PlaylistListServices.getPlaylistListAction(qs)
            .then(response => {
                dispatch({ type: ActionTypes.GET_PLAYLIST_LIST, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deletePlaylistAction = (playlistId: string, title: string): ThunkDispatch<Promise<void>, {}, DeletePlaylist> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeletePlaylist>) => {
        await PlaylistListServices.deletePlaylistService(playlistId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_PLAYLIST, payload: {id: playlistId} })
                dispatch(showToastNotification(`${title} deleted`, 'fixed', "success"));
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"))
            })
    }
}


export type Action = GetPlaylistList | DeletePlaylist
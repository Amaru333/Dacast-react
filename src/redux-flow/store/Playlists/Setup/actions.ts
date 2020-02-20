import { ActionTypes} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { PlaylistSetupServices } from './services';
import { FolderAsset } from '../../Folders/types';

export interface GetPlaylistSetup {
    type: ActionTypes.GET_PLAYLIST_SETUP;
    payload: FolderAsset[];
}

export interface PostPlaylistSetup {
    type: ActionTypes.POST_PLAYLIST_SETUP;
    payload: FolderAsset[];
}

export const getPlaylistSetupAction = (): ThunkDispatch<Promise<void>, {}, GetPlaylistSetup> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistSetup>) => {
        await PlaylistSetupServices.getPlaylistSetupAction()
            .then(response => {
                dispatch({ type: ActionTypes.GET_PLAYLIST_SETUP, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const postPlaylistSetupAction = (data: any[]): ThunkDispatch<Promise<void>, {}, GetPlaylistSetup> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistSetup>) => {
        await PlaylistSetupServices.postPlaylistSetupAction(data)
            .then(response => {
                dispatch({ type: ActionTypes.GET_PLAYLIST_SETUP, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetPlaylistSetup | PostPlaylistSetup
import { ActionTypes, PlaylistItem} from "./types";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../..";
import { showToastNotification } from '../../Toasts';
import { PlaylistGeneralServices } from './services';

export interface GetPlaylistList {
    type: ActionTypes.GET_PLAYLIST_LIST;
    payload: PlaylistItem[];
}

export const getPlaylistListAction = (): ThunkDispatch<Promise<void>, {}, GetPlaylistList> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetPlaylistList>) => {
        await PlaylistGeneralServices.getPlaylistListAction()
            .then(response => {
                dispatch({ type: ActionTypes.GET_PLAYLIST_LIST, payload: response.data });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}


export type Action = GetPlaylistList
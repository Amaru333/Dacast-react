import { Reducer } from "redux";
import { Action } from "./actions";
import { PlaylistSecuritySettings, defaultStatePlaylistSecuritySettings, ActionTypes } from "./types";

const reducer: Reducer<PlaylistSecuritySettings> = (state = defaultStatePlaylistSecuritySettings, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_SECURITY_SETTINGS :
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.SAVE_PLAYLIST_SECURITY_SETTINGS :
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

export { reducer as PlaylistSecurityReducer }
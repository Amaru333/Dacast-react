import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, playlistDefaultState, PlaylistSetupState } from './types';

const reducer: Reducer<PlaylistSetupState> = (state = playlistDefaultState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_SETUP:
            return {
                ...state,
                [action.payload.data.id]: {
                    ...action.payload.data
                }
            };
        case ActionTypes.POST_PLAYLIST_SETUP:
            return {
                ...state,
                [action.payload.id]: {
                    ...action.payload
                }
            };
        default:
            return state;
    }
}

export {reducer as PLaylistSetupReducer}

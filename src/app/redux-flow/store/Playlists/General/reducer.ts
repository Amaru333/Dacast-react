import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes } from './types';
import { ContentDetailsState, initialContentGeneralState } from '../../VOD/General/types';



const reducer: Reducer<ContentDetailsState> = (state = initialContentGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_DETAILS:
            return {
                ...state, 
                [action.payload.data.id] : {
                    ...state[action.payload.data.id],
                    ...action.payload.data
                }
            };
        case ActionTypes.EDIT_PLAYLIST_DETAILS:
            return {
                ...state,
                [action.payload.id] : {
                    ...state[action.payload.id],
                    ...action.payload
                }
            };
        case ActionTypes.GET_UPLOAD_URL:
            return {
                ...state, 
                [action.payload.id] : {
                    ...state[action.payload.id],
                    uploadurl: action.payload.data.presignedURL
                }
            }
        case ActionTypes.UPLOAD_IMAGE:
            return {
                ...state, 
                [action.payload.playlistId] : {
                    ...state[action.payload.playlistId],
                    uploadurl: null
                }
            }        
        case ActionTypes.DELETE_IMAGE:
            return {
                ...state,
                [action.payload.playlistId]: {
                    ...state[action.payload.playlistId],
                    [action.payload.uploadType]: {}
                }
            }
        default:
            return state
    }
};

export { reducer as GeneralReducerPlaylist };
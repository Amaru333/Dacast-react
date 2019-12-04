import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, VodDetails} from './types';

const initialVodGeneralState: VodDetails = {
    title: "",
    folder: "",
    description: "",
    thumbnail: "",
    subtitles: []
}

const reducer: Reducer<VodDetails> = (state = initialVodGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_DETAILS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.ADD_VOD_SUBTITLE:
            let newArray = state.subtitles.slice()
            newArray.splice(newArray.length, 0, action.payload)
            return {
                ...state,
                subtitles: newArray
            }
        default:
            return state;
    }
};

export { reducer as GeneralReducer };
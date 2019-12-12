import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, VodDetails} from './types';

const initialVodGeneralState: VodDetails = {
    id: "",
    online: false,
    title: "",
    folder: "",
    description: "",
    thumbnail: null,
    subtitles: []
}

const reducer: Reducer<VodDetails> = (state = initialVodGeneralState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_DETAILS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.EDIT_VOD_DETAILS:
            return {
                    ...state, ...action.payload
                };
        case ActionTypes.ADD_VOD_SUBTITLE:
            let newArray = state.subtitles.slice()
            newArray.splice(newArray.length, 0, action.payload)
            return {
                ...state,
                subtitles: newArray
            };
        case ActionTypes.EDIT_VOD_SUBTITLE:
                return  {...state, subtitles: state.subtitles.map((item) => {
                    if (item.id !== action.payload.id) {
                        return item
                    }
                    return {
                        ...item,
                        ...action.payload
                }})};
                case ActionTypes.DELETE_VOD_SUBTITLE:
                        return {...state, subtitles: state.subtitles.filter((item) => item.id != action.payload.id)}
        case ActionTypes.CHANGE_VOD_THUMBNAIL:
        return {
            ...state,
            ...action.payload
        };
        default:
            return state;
    }
};

export { reducer as GeneralReducer };
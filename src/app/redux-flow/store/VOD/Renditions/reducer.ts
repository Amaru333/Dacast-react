import { Reducer } from "redux";
import { RenditionsList, ActionTypes } from './types';
import { Action } from './actions';


const initialRenditionsState: RenditionsList = {
    id: null,
    presets: [],
    encodedRenditions: [],
    videoInfo: null
}

const reducer: Reducer<RenditionsList> = (state = initialRenditionsState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_RENDITIONS:
            return {
                ...state, ...action.payload.data
            };
        case ActionTypes.ADD_VOD_RENDITIONS:
            let renditions = state.encodedRenditions.slice()
            renditions.splice(renditions.length, 0, ...action.payload)
            return {
                ...state, encodedRenditions: renditions
            };
        case ActionTypes.DELETE_VOD_RENDITIONS:
            let renditionsId = action.payload.map((renditions) => {return renditions.id})
            return { 
                ...state, encodedRenditions: state.encodedRenditions.filter((rendition) => !renditionsId.includes(rendition.id))
            }
        default:
            return state;
    }
}

export { reducer as RenditionsReducer }
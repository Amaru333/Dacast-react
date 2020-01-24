import { Reducer } from "redux";
import { RenditionsList, ActionTypes } from './types';
import { Action } from './actions';


const initialRenditionsState: RenditionsList = {
    renditionsList: [],
    encodedRenditions: []
}

const reducer: Reducer<RenditionsList> = (state = initialRenditionsState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_RENDITIONS:
            return {
                ...state, ...action.payload
            };
        case ActionTypes.ADD_VOD_RENDITIONS:
            let renditions = state.encodedRenditions.slice()
            renditions.splice(renditions.length, 0, ...action.payload)
            return {
                ...state, renditions
            };
        case ActionTypes.DELETE_VOD_RENDITIONS:
            
            return {
                
                ...state, encodedRenditions: state.encodedRenditions.filter((rendition) => !action.payload.includes(rendition))
            }
        default:
            return state;
    }
}

export { reducer as RenditionsReducer }
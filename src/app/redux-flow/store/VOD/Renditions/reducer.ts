import { Reducer } from "redux";
import { RenditionsList, ActionTypes, RenditionsListState } from './types';
import { Action } from './actions';


// const initialRenditionsState: RenditionsList = {
//     id: null,
//     presets: [],
//     encodedRenditions: [],
//     videoInfo: null
// }

const reducer: Reducer<RenditionsListState> = (state = {}, action: Action) => {
    let renditions = null
    switch (action.type) {
        case ActionTypes.GET_VOD_RENDITIONS:
            return {
                ...state, 
                [action.payload.data.id] : {
                    ...state[action.payload.data.id],
                    ...action.payload.data
                }
            };
        case ActionTypes.ADD_VOD_RENDITIONS:
            renditions = state[action.payload.contentId].encodedRenditions.slice()
            let newRenditions = action.payload.data.map(element => { return state[action.payload.contentId].presets.find(preset => preset.name === element) })
            renditions.splice(renditions.length, 0, ...newRenditions)
            return {
                ...state, 
                [action.payload.contentId] : {
                    ...state[action.payload.contentId],
                    encodedRenditions: renditions
                }
            };
        case ActionTypes.DELETE_VOD_RENDITIONS:
            return { 
                ...state, 
                [action.payload.contentId] : {
                    ...state[action.payload.contentId],
                    encodedRenditions: state[action.payload.contentId].encodedRenditions.filter((rendition) => !action.payload.data.includes(rendition.name))
                }
                
            }
        default:
            return state;
    }
}

export { reducer as RenditionsReducer }
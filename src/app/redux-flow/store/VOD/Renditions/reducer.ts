import { Reducer } from "redux";
import { ActionTypes, RenditionsListState } from './types';
import { Action } from './actions';

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
                ...state, encodedRenditions: state.encodedRenditions.filter((rendition) => !action.payload.includes(rendition.renditionID))
            }
        default:
            return state;
    }
}

export { reducer as RenditionsReducer }
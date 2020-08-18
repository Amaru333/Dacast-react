import { Reducer } from "redux";
import { ActionTypes, RenditionsListState, Rendition } from './types';
import { Action } from './actions';

const reducer: Reducer<RenditionsListState> = (state = {}, action: Action) => {
    let renditions = null
    switch (action.type) {
        case ActionTypes.GET_CONTENT_RENDITIONS:
            return {
                ...state, 
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        ...action.payload.data
                    }
                }

            };
        case ActionTypes.ADD_CONTENT_RENDITIONS:
            renditions = state[action.payload.contentType][action.payload.contentId].encodedRenditions.slice()
            let newRenditions = action.payload.data.map(element => { return state[action.payload.contentType][action.payload.contentId].presets.find(preset => preset.name === element.name) })
            renditions.splice(renditions.length, 0, ...newRenditions)
            return {
                ...state, 
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        encodedRenditions: renditions
                    }
                }

            };
        case ActionTypes.DELETE_CONTENT_RENDITIONS:
            return {
                ...state, 
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        ...state[action.payload.contentType][action.payload.contentId],
                        encodedRenditions: state[action.payload.contentType][action.payload.contentId].encodedRenditions.filter((rendition: Rendition) => !action.payload.data.includes(rendition.renditionID))
                    }
                }

            }
        default:
            return state;
    }
}

export { reducer as RenditionsReducer }
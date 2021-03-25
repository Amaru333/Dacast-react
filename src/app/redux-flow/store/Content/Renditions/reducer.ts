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
                        ...action.payload.data,
                        encodedRenditions: action.payload.data.encodedRenditions.map(rendition => {
                            return {
                                ...rendition,
                                width: rendition.width || state[action.payload.contentType][action.payload.contentId].encodedRenditions.find(stateRendition => stateRendition.renditionID === rendition.renditionID).width
                            }
                        })
                    }
                }

            };
        case ActionTypes.ADD_CONTENT_RENDITIONS:
            renditions = state[action.payload.contentType][action.payload.contentId].encodedRenditions.slice()
            let newRenditions = action.payload.data.map((element): Rendition => { 
                let matchingPreset = state[action.payload.contentType][action.payload.contentId].presets.find(preset => preset.name === element.name)
                return {
                    renditionID: element.renditionID,
                    name: element.name,
                    size: matchingPreset.size,
                    bitrate: matchingPreset.bitrate,
                    width: matchingPreset.size,
                    transcodingJobID: element.transcodingJobID,
                    height: null,
                    fileLocation: 'vod-storage'
                }
            })
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
                        encodedRenditions: state[action.payload.contentType][action.payload.contentId].encodedRenditions.filter((rendition: Rendition) => action.payload.data.indexOf(rendition.renditionID) === -1)
                    }
                }

            }
        default:
            return state;
    }
}

export { reducer as RenditionsReducer }
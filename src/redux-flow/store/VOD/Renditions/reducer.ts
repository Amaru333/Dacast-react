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
        default:
            return state;
    }
}

export { reducer as RenditionsReducer }
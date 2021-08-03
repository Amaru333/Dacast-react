import { Reducer } from 'redux';
import { Action } from './actions';
import { ActionTypes, FoldersState, foldersInitialState } from './types';

const reducer: Reducer<FoldersState> = (state = foldersInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_FOLDER_CONTENT:
            if (action.payload.results === null) 
            {return {
                ...state,
                data: {
                    ...state.data, 
                    requestedContent: null
                }
            }} else {
                return {
                    ...state,
                    data: {
                        ...state.data, 
                        requestedContent: action.payload
                    }
                }
            }
        case ActionTypes.RESTORE_CONTENT:
            return state
        default: 
            return state
    }
}

export { reducer as FoldersReducer };
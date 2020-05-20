import { Reducer } from 'redux';
import { Action } from './actions';
import { ActionTypes, FoldersState, foldersInitialState } from './types';

const reducer: Reducer<FoldersState> = (state = foldersInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_FOLDER_CONTENT:
            return {
                ...state,
                data: {
                    ...state.data, 
                    requestedContent: {
                        ...action.payload.data,
                        results: action.payload.data.results.map((item) => {
                            return {
                                ...item,
                                objectID: item.objectID.split('_')[1]
                            }
                        })
                    }
                }
            }
        case ActionTypes.DELETE_CONTENT:
            return {
                ...state,
                data: {...state.data, requestedContent: action.payload}
            }
        case ActionTypes.RESTORE_CONTENT:
            return {
                ...state,
                data: {...state.data, requestedContent: action.payload}
            }
        default: 
            return state
    }
}

export { reducer as FoldersReducer };
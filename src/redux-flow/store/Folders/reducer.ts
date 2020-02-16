import { Reducer } from 'redux';
import { Action } from './actions';
import { ActionTypes, FoldersState, foldersInitialState } from './types';

const reducer: Reducer<FoldersState> = (state = foldersInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_FOLDERS: 
            return {
                ...state,
                data: {...state.data, requestedFolder: {...action.payload}}
            }
        case ActionTypes.GET_FOLDER_CONTENT:
            return {
                ...state,
                data: {...state.data, requestedContent: action.payload}
            }
        case ActionTypes.MOVE_ITEMS_TO_FOLDER:
            return {
                ...state,
                data: {...state.data, requestedContent: action.payload}
            }
        case ActionTypes.ADD_FOLDER: 
            return {
                ...state,
                data: {...state.data, requestedFolder: {...action.payload}}
            }
        case ActionTypes.DELETE_FOLDER: 
            return {
                ...state,
                data: {...state.data, requestedFolder: action.payload}
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
        case ActionTypes.RENAME_FOLDER: 
            return {
                ...state,
                data: {...state.data, requestedFolder: {...action.payload}}
            }
        default: 
            return state
    }
}

export { reducer as FoldersReducer };
import { Reducer } from 'redux';
import { Action } from './actions';
import { ActionTypes, FoldersState, foldersInitialState } from './types';

const reducer: Reducer<FoldersState> = (state = foldersInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_FOLDER_CONTENT:
            if (action.payload.data.results === null) 
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
                        requestedContent: {
                            ...action.payload.data,
                            results: 
                                action.payload.data.results.map((item) => {
                                    return {
                                        ...item,
                                        objectID: item.splitPath ? item.objectID : item.objectID.split('_')[1],
                                        title: item.name ? item.name : item.title,
                                        type: item.splitPath ? 'folder' : item.type
    
                                    }
                                })
                        }
                    }
                }
            }
        case ActionTypes.DELETE_CONTENT:    
        case ActionTypes.RESTORE_CONTENT:
            return state
        default: 
            return state
    }
}

export { reducer as FoldersReducer };
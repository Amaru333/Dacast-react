import { ActionTypes, ContentItem, initialContentList, ContentListState } from './types'
import { Action } from './actions'
import { Reducer } from 'redux'

export const reducerList: Reducer<ContentListState> = (state = initialContentList, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_LIST:
            return { 
                ...state,
                [action.payload.contentType]: {
                    ...action.payload.data
                }
            }
        case ActionTypes.DELETE_CONTENT:
            return state
        default:
            return state
    }
}
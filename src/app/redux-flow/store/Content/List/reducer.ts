import { ActionTypes, ContentItem, SearchResult, initialContentList } from './types'
import { Action } from './actions'
import { Reducer } from 'redux'

export const reducerList: Reducer<SearchResult | false> = (state = initialContentList, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_LIST:
            let contentList = action.payload.data.results.map((content: ContentItem) => { return { ...content, objectID: content.objectID.substring(4) } })
            return { ...action.payload.data, results: contentList }
        case ActionTypes.DELETE_CONTENT:
            // if (state) {
            //     var newList = state.results.filter(elem => elem.objectID !== action.payload.id)
            //     return { ...state, results: newList, totalResults: state.totalResults - 1 }
            // }
            return state
        default:
            return state
    }
}
import { Reducer } from 'redux'
import { ActionTypes, editAccountDefaultState, AccountInfo } from './types'
import { Action } from './actions'

const reducer: Reducer<AccountInfo> = (state = editAccountDefaultState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNT_INFO: 
            return {
                ...action.payload
            }
        case ActionTypes.SAVE_ACCOUNT_INFO: 
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export { reducer as AccountReducer }
import { Reducer } from 'redux'
import { ActionTypes, accountAllowancesDefaultState, AccountAllowances } from './types'
import { Action } from './actions'

const reducer: Reducer<AccountAllowances | false> = (state = accountAllowancesDefaultState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNT_ALLOWANCES: 
            return {
                ...action.payload
            }
        case ActionTypes.SAVE_ACCOUNT_ALLOWANCES: 
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export { reducer as AccountAllowancesReducer }
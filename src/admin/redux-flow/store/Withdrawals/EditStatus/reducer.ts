import { Reducer } from 'redux'
import { ActionTypes, editWithdrawalDefaultState, WithdrawalInfo } from './types'
import { Action } from './actions'

const reducer: Reducer<WithdrawalInfo> = (state = editWithdrawalDefaultState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_WITHDRAWAL_INFO: 
            return action.payload
        case ActionTypes.SAVE_WITHDRAWAL_STATUS: 
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}

export { reducer as EditWithdrawalReducer }
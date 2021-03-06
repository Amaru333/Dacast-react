import { Reducer } from 'redux'
import { ActionTypes, editPlanDefaultState, PlanInfo } from './types'
import { Action } from './actions'

const reducer: Reducer<PlanInfo> = (state = editPlanDefaultState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNT_PLAN: 
            return {
                ...action.payload
            }
        case ActionTypes.SAVE_ACCOUNT_PLAN: 
            return {
                ...state,
            }
        case ActionTypes.EXTEND_TRIAL: 
            return {
                ...state,
                expiresAt: action.payload
            }
        default:
            return state
    }
}

export {reducer as PlanReducer}
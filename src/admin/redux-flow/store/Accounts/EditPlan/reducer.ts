import { Reducer } from 'redux'
import { ActionTypes, editPlanDefaultState, PlanInfo } from './types'
import { Action } from './actions'

const reducer: Reducer<PlanInfo> = (state = editPlanDefaultState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_ACCOUNT_PLAN: 
            return {
                ...action.payload.data
            }
        case ActionTypes.SAVE_ACCOUNT_PLAN: 
            console.log(action.payload)
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.SWITCH_ACCOUNT_PLAN: 
            return {
                ...state,
                name: action.payload
            }
        default:
            return state
    }
}

export {reducer as PlanReducer}
import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, MigrationData, migrationInitialState } from './types';


const reducer: Reducer<MigrationData | false> = (state = migrationInitialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.GET_JOBS_LIST :
            return {
                ...state,
                jobsList: action.payload
            }
        default :
            return state
    }
}

export { reducer as MigrationReducer}
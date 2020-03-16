import { plansInitialState, Plans, ActionTypes } from "./types";
import { PlansAction } from "./actions"

export const reducer = (state = plansInitialState, action: PlansAction) => {
    switch (action.type) {
        case ActionTypes.GET_PLAN_DETAILS:
            return {...state, 
                ...action.payload
            }
        default:
            return state;
    }
};



export {reducer as PlansReducer}; 
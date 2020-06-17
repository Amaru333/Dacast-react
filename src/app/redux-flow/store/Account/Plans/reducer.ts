import { plansInitialState, Plans, ActionTypes } from "./types";
import { PlansAction } from "./actions"

export const reducer = (state = plansInitialState, action: PlansAction) => {
    switch (action.type) {
        case ActionTypes.GET_PLAN_DETAILS:
            return {...action.payload.data}
        case ActionTypes.CHANGE_ACTIVE_PLAN:
            let plans = {...Object.values(state).reduce((reduced, plan) => 
                ({...reduced, plan: {...reduced.plan, isActive: false}}))}
            return {...plans,
                ...action.payload
            }
        default:
            return state;
    }
};



export {reducer as PlansReducer}; 
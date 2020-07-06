import { upgradeInitialState, Plans, ActionTypes } from "./types";
import { UpgradeAction } from "./actions"

export const reducer = (state = upgradeInitialState, action: UpgradeAction) => {
    switch (action.type) {
        case ActionTypes.GET_PLAN_DETAILS:
            return {...action.payload.data}
        case ActionTypes.CHANGE_ACTIVE_PLAN:
            return state;
        default:
            return state;
    }
};



export {reducer as UpgradeReducer}; 
import { upgradeInitialState, ActionTypes } from "./types";
import { UpgradeAction } from "./actions"

export const reducer = (state = upgradeInitialState, action: UpgradeAction) => {
    switch (action.type) {
        case ActionTypes.GET_PLAN_DETAILS:
            return action.payload
        default:
            return state;
    }
};



export {reducer as UpgradeReducer}; 
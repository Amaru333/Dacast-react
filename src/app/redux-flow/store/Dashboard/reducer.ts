import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, dashboardInitialState, DashboardState } from "./types";

const reducer: Reducer<DashboardState> = (state = dashboardInitialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_DASHBOARD_DETAILS :
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
};

export { reducer as DashboardReducer };


import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultStateThemesType, ThemesData } from "./types";

const reducer: Reducer<ThemesData> = (state = defaultStateThemesType, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_SETTING_THEMING_LIST :
            return {
                ...state,
                themes: action.payload,
            }
        default:
            return state;
    }
};

export {reducer as ThemingReducer};
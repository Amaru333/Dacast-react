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
        case ActionTypes.CREATE_SETTING_THEME :
            let themes = state.themes.slice();
            if(action.payload.isDefault) {
                themes = themes.map((item) => {return {...item, isDefault: false}})
            }
            themes.splice(themes.length, 0, action.payload )
            return {...state,
                themes  
            }
        case ActionTypes.SAVE_SETTING_THEME :
            if(action.payload.isDefault) {
                themes = state.themes.map((item) => {return {...item, isDefault: false}})
            }
            return  {...state, recipes: themes.map((item) => {
                if (item.themeName !== action.payload.themeName) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
            })}
        case ActionTypes.DELETE_SETTING_THEME:
            return {...state, themes: state.themes.filter((item) => item.themeName != action.payload.themeName)}
        default:
            return state;
    }
};

export {reducer as ThemingReducer};
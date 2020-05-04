import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultStateThemesType, ThemesData } from "./types";

const reducer: Reducer<ThemesData> = (state = defaultStateThemesType, action: Action) => {
    let themes = null;
    switch (action.type) {
        case ActionTypes.GET_SETTING_THEMING_LIST :
            return {
                ...state,
                themes: action.payload.data.themes,
            }
        case ActionTypes.CREATE_SETTING_THEME :
            themes = state.themes.slice()
            if(action.payload.isDefault) {
                themes = themes.map((item) => {return {...item, isDefault: false}})
            }
            themes.splice(themes.length, 0, action.payload )
            return {...state,
                themes  
            }
        case ActionTypes.SAVE_SETTING_THEME :
            themes = state.themes.slice()
            if(action.payload.isDefault) {
                themes = state.themes.map((item) => {return {...item, isDefault: false}})
            }
            return  {...state, themes: themes.map((item) => {
                if (item.id !== action.payload.id) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
            })}
        case ActionTypes.DELETE_SETTING_THEME:
            return {...state, themes: state.themes.filter((item) => item.id != action.payload.id)}
        default:
            return state;
    }
};

export {reducer as ThemingReducer};
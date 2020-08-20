import { Reducer } from "redux";
import { Action } from "./actions";
import { ActionTypes, defaultStateThemesType, ThemesData, defaultTheme } from "./types";

const reducer: Reducer<ThemesData> = (state = defaultStateThemesType, action: Action) => {
    let themes = null;
    switch (action.type) {
        case ActionTypes.GET_SETTING_THEMING_LIST :
            let standardTheme = action.payload.data.themes.filter(t => t.themeName === 'Standard')[0] || defaultTheme
            return {
                ...state,
                themes: [
                    standardTheme, 
                    ...action.payload.data.themes.filter(t => t.themeName !== 'Standard')],
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
            return  {...state, themes: themes.map((item) => {
                if (item.id !== action.payload.id) {
                    return {
                        ...item,
                        isDefault: (!action.payload.isDefault && item.themeName === 'Standard' && state.themes.filter(f => f.id === action.payload.id)[0].isDefault) ? true : false
                    }
                }
                return {
                    ...item,
                    ...action.payload
                }
            })}
        case ActionTypes.DELETE_SETTING_THEME:
            themes = state.themes.filter((item) => item.id != action.payload.id)
            if(action.payload.isDefault) {
                themes = themes.map(theme => {
                    if(theme.themeName === 'Standard') {
                        return {
                            ...theme,
                            isDefault: true
                        }        
                    }
                    return theme
                })
            }
            return {...state, themes: themes}
        default:
            return state;
    }
};

export {reducer as ThemingReducer};
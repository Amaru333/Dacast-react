import { Reducer } from "redux";
import { ActionTypes } from './types';
import { Action } from './actions';
import { defaultStateContentTheme, ContentThemeState } from '../../Settings/Theming';


const reducer: Reducer<ContentThemeState> = (state = defaultStateContentTheme, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_VOD_THEME :
            console.log(action);
            return {
                ...state,
                [action.payload.contentId] : {
                    ...action.payload
                }
            }
        case ActionTypes.SAVE_VOD_THEME :
            return {
                ...state,
                [action.payload.id] : {
                    ...state[action.payload.id],
                    themes: state[action.payload.id].themes.map((theme) => {
                        if(theme.id === action.payload.data.id || (theme.isCustom && action.payload.data.isCustom)) {
                            return action.payload.data
                        } 
                        return theme
                    }),
                    contentThemeId: action.payload.data.id
                }
            }
        default:
            return state;
    }
}

export {reducer as VodThemingReducer}
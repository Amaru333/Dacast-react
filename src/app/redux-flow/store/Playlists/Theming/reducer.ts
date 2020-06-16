import { Reducer } from "redux";
import { ActionTypes } from './types';
import { Action } from './actions';
import { ContentThemeState, defaultStateContentTheme } from '../../Settings/Theming';


const reducer: Reducer<ContentThemeState> = (state = defaultStateContentTheme, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_PLAYLIST_THEME :
            return {
                ...state,
                [action.payload.contentId] : {
                    ...action.payload
                }
            }
        case ActionTypes.SAVE_PLAYLIST_THEME :
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

export {reducer as PlaylistThemingReducer}
import { Reducer } from "redux";
import { ActionTypes } from './types';
import { Action } from './actions';
import { ContentThemeState } from '../../Settings/Theming';


const reducer: Reducer<ContentThemeState> = (state: ContentThemeState = {}, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_CONTENT_THEME :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                    [action.payload.contentId] : {
                        contentId: action.payload.contentId,
                        contentThemeId: action.payload.contentThemeId,
                        themes: action.payload.themes
                    }
                }
            }
        case ActionTypes.CREATE_CONTENT_CUSTOM_THEME:
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                [action.payload.contentId] : {
                    ...state[action.payload.contentType][action.payload.contentId],
                    themes: state[action.payload.contentType][action.payload.contentId].themes.map((theme) => {
                        if((theme.isCustom && action.payload.theme.isCustom)) {
                            return action.payload.theme
                        } 
                        return theme
                    }),
                    contentThemeId: action.payload.theme.id
                }
            }
            }
        case ActionTypes.SAVE_CONTENT_THEME :
            return {
                ...state,
                [action.payload.contentType]: {
                    ...state[action.payload.contentType],
                [action.payload.contentId] : {
                    ...state[action.payload.contentType][action.payload.contentId],
                    themes: state[action.payload.contentType][action.payload.contentId].themes.map((theme) => {
                        if(theme.id === action.payload.theme.id) {
                            return action.payload.theme
                        } 
                        return theme
                    }),
                    contentThemeId: action.payload.theme.id
                }
            }
        }
        default:
            return state;
    }
}

export {reducer as ContentThemingReducer}
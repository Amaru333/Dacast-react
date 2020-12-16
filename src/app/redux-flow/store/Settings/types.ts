import { ApiIntegrationPageInfos, ApiIntegrationReducer } from "./ApiIntegration/"
import { EmbedSettingsOptionType, EmbedSettingsReducer } from './EmbedSettings';
import { SettingsSecurityReducer, SecuritySettings } from './Security'
import { combineReducers, Reducer } from 'redux';
import { EncodingRecipesData } from './EncodingRecipes/EncodingRecipesTypes';
import { EncodingRecipesReducer } from './EncodingRecipes';
import { EngagementInfo } from './Engagement';
import { ThemesData, ThemingReducer } from './Theming';
import { EngagementReducer } from './Engagement/reducer';


export const SettingsInitialState: SettingsState = {
    apiIntegration: false,
    embedSettings: false,
    security: false,
    encodingRecipes: false,
    engagement: false,
    theming: false
};


export interface  SettingsState {
    apiIntegration: false | ApiIntegrationPageInfos;
    embedSettings: false | EmbedSettingsOptionType;
    security: false | SecuritySettings;
    encodingRecipes: false | EncodingRecipesData;
    engagement: false | EngagementInfo;
    theming: false | ThemesData;

}

export const SettingsReducer: Reducer<SettingsState> = combineReducers({
    apiIntegration: ApiIntegrationReducer, 
    embedSettings: EmbedSettingsReducer,
    security: SettingsSecurityReducer,
    encodingRecipes: EncodingRecipesReducer,
    engagement: EngagementReducer,
    theming: ThemingReducer
})

import { ApiIntegrationPageInfos, ApiIntegrationReducer } from "./ApiIntegration/"
import { EmbedSettingsOptionType, EmbedSettingsReducer } from './EmbedSettings';
import { SettingsSecurityDetails, SettingsSecurityReducer } from './Security'
import { combineReducers, Reducer } from 'redux';
import { EncodingRecipesData } from './EncodingRecipes/EncodingRecipesTypes';
import { EncodingRecipesReducer } from './EncodingRecipes';
import { InteractionsInfos, InteractionReducer } from './Interactions';


export const SettingsInitialState: SettingsState = {
    apiIntegration: false,
    embedSettings: false,
    security: false,
    encodingRecipes: false,
    interactions: false
};


export interface  SettingsState {
    apiIntegration: false | ApiIntegrationPageInfos;
    embedSettings: false | EmbedSettingsOptionType;
    security: false | SettingsSecurityDetails;
    encodingRecipes: false | EncodingRecipesData;
    interactions: false | InteractionsInfos;

}

export const SettingsReducer: Reducer<SettingsState> = combineReducers({
    apiIntegration: ApiIntegrationReducer, 
    embedSettings: EmbedSettingsReducer,
    security: SettingsSecurityReducer,
    encodingRecipes: EncodingRecipesReducer,
    interactions: InteractionReducer
})

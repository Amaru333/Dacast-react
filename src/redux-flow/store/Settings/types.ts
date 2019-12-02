import { DeliveryAndEmbedOptionType, DeliveryAndEmbedReducer } from './DeliveryAndEmbed';
import { SettingsSecurityDetails, SettingsSecurityReducer } from './Security';
import { ApiIntegrationPageInfos, ApiIntegrationReducer } from './ApiIntegration';
import { combineReducers, Reducer } from 'redux';
import { EncodingRecipesData } from './EncodingRecipes/EncodingRecipesTypes';
import { EncodingRecipesReducer } from './EncodingRecipes';


export const SettingsInitialState: SettingsState = {
    deliveryAndEmbed: false,
    encodingRecipes: false,
    apiIntegration: false,
    security: false
};


export interface  SettingsState {
    apiIntegration: false | ApiIntegrationPageInfos;
    deliveryAndEmbed: false | DeliveryAndEmbedOptionType;
    security: false | SettingsSecurityDetails;
    encodingRecipes: false | EncodingRecipesData;

}

export const SettingsReducer: Reducer<SettingsState> = combineReducers({
    apiIntegration: ApiIntegrationReducer, 
    deliveryAndEmbed: DeliveryAndEmbedReducer,
    security: SettingsSecurityReducer,
    encodingRecipes: EncodingRecipesReducer
})

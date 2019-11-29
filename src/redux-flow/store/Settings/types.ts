import { DeliveryAndEmbedOptionType, DeliveryAndEmbedReducer } from './DeliveryAndEmbed';
import { combineReducers, Reducer } from 'redux';
import { EncodingRecipeOptionType } from './EncodingRecipes/EncodingRecipesTypes';
import { EncodingRecipesReducer } from './EncodingRecipes';


export const SettingsInitialState: SettingsState = {
    deliveryAndEmbed: false,
    encodingRecipes: false
};


export interface  SettingsState {
    deliveryAndEmbed: false | DeliveryAndEmbedOptionType;
    encodingRecipes: false | EncodingRecipeOptionType
}

export const SettingsReducer: Reducer<SettingsState> = combineReducers({
    deliveryAndEmbed: DeliveryAndEmbedReducer,
    encodingRecipes: EncodingRecipesReducer
})

import { ApiIntegrationPageInfos, ApiIntegrationReducer } from './ApiIntegration';
import { DeliveryAndEmbedOptionType, DeliveryAndEmbedReducer } from './DeliveryAndEmbed';
import { combineReducers, Reducer } from 'redux';


export const SettingsInitialState: SettingsState = {
    apiIntegration: false,
    deliveryAndEmbed: false
};


export interface  SettingsState {
    apiIntegration: false | ApiIntegrationPageInfos;
    deliveryAndEmbed: false | DeliveryAndEmbedOptionType;
}

export const SettingsReducer: Reducer<SettingsState> = combineReducers({
    apiIntegration: ApiIntegrationReducer, 
    deliveryAndEmbed: DeliveryAndEmbedReducer
})
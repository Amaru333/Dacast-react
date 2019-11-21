import { ApiIntegrationPageInfos, ApiIntegrationReducer } from './ApiIntegration';
import { DeliveryAndEmbedOptionType, DeliveryAndEmbedReducer } from './DeliveryAndEmbed';
import { SettingsSecurityDetails, SettingsSecurityReducer } from './Security'
import { combineReducers, Reducer } from 'redux';


export const SettingsInitialState: SettingsState = {
    apiIntegration: false,
    deliveryAndEmbed: false,
    security: false
};


export interface  SettingsState {
    apiIntegration: false | ApiIntegrationPageInfos;
    deliveryAndEmbed: false | DeliveryAndEmbedOptionType;
    security: false | SettingsSecurityDetails
}

export const SettingsReducer: Reducer<SettingsState> = combineReducers({
    apiIntegration: ApiIntegrationReducer, 
    deliveryAndEmbed: DeliveryAndEmbedReducer,
    security: SettingsSecurityReducer
})
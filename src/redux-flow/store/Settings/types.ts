import { DeliveryAndEmbedOptionType, DeliveryAndEmbedReducer } from './DeliveryAndEmbed';
import { combineReducers, Reducer } from 'redux';


export const SettingsInitialState: SettingsState = {
    deliveryAndEmbed: false
};


export interface  SettingsState {
    deliveryAndEmbed: false | DeliveryAndEmbedOptionType;
}

export const SettingsReducer: Reducer<SettingsState> = combineReducers({
    deliveryAndEmbed: DeliveryAndEmbedReducer
})

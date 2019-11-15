import { combineReducers } from 'redux';
import { ApiIntegrationReducer } from './ApiIntegration';

export * from "./types";

export const SettingsReducer = {
    apiIntegration:ApiIntegrationReducer
};
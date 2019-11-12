import { ApiIntegrationPageInfos } from './ApiIntegration';


export const SettingsInitialState: SettingsState = {
    data: {
        apiIntegration: false
    }
};

export interface SettingsState {
    readonly data: {
        apiIntegration: false | ApiIntegrationPageInfos;
    };
}
export enum ActionTypes {
    GET_SETTINGS_INTEGRATIONS_INFOS = "@@settings_integration/GET_SETTINGS_INTEGRATIONS_INFOS",
}

export interface ApiIntegrationPageInfos {
    apiKeys: ApiKeyItem[];
    encoderKeys: EncoderKeyItem[];
    webHook: WebHookItem[];
}

export const defaultStateApiIntegration: ApiIntegrationPageInfos = {
    apiKeys: [],
    encoderKeys: [],
    webHook: []
}

export interface EncoderKeyItem {
    encoder: string;
    authToken: string;
    created: number;
}

export interface ApiKeyItem {
    label: string;
    clientId: string;
    authToken: string;
    type: 'rw' | 'ro';
    created: number;
}

export interface WebHookItem {
    enable: boolean;
    url: string;
    method: 'GET' | 'POST';
}
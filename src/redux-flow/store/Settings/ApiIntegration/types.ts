export enum ActionTypes {
    GET_SETTINGS_INTEGRATIONS_INFOS = "@@settings_integration/GET_SETTINGS_INTEGRATIONS_INFOS",
}

export interface ApiIntegrationPageInfos {
    apiKeys: apiKeyItem[];
    encoderKeys: encoderKeyItem[];
    webHook: webHookItem[];
}

export interface encoderKeyItem {
    label: string;
    clientId: string;
    authToken: string;
    type: 'rw' | 'ro';
}

export interface apiKeyItem {
    label: string;
    clientId: string;
    authToken: string;
    type: 'rw' | 'ro';
}

export interface webHookItem {
    enable: boolean;
    url: string;
    method: 'GET' | 'POST';
}
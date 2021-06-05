export enum ActionTypes {
    GET_API_KEYS = "@@settings_integration/GET_API_KEYS",
    CREATE_API_KEY = "@@settings_integration/CREATE_API_KEY",
    UPDATE_API_KEY = "@@settings_integration/UPDATE_API_KEY",
    DELETE_API_KEY = "@@settings_integration/DELETE_API_KEY"
}

export interface ApiIntegrationPageInfos {
    apiKeys: ApiKeyItem[];
    encoderKeys: EncoderKeyItem[];
    webHooks: WebHookItem[];
    s3Keys: S3KeyItem[];
    ga: GaItem;
}

export interface GaItem {
    enabled: boolean;
    key: string;
}

export const defaultStateApiIntegration: ApiIntegrationPageInfos = {
    apiKeys: [],
    encoderKeys: [],
    webHooks: [],
    s3Keys: [],
    ga: {
        enabled: false,
        key: ""
    }
}

export interface EncoderKeyItem {
    encoder: string;
    authToken: string;
    created: number;
}

export interface S3KeyItem {
    name: string;
    created: number;
    expires: number;
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
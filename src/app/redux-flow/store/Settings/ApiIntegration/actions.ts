import { ActionTypes, ApiKeyItem } from "./types";
import { applyViewModel } from "../../../../utils/utils";
import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { formatGetApiKeysOutput, formatPostApiKeyInput, formatPostApiKeyOutput } from "./viewModel";

export interface GetSettingsIntegrationDetails {
    type: ActionTypes.GET_API_KEYS;
    payload: ApiKeyItem[];
}

export interface CreateApiKey {
    type: ActionTypes.CREATE_API_KEY
    payload: ApiKeyItem
}

export const getApiKeysAction = applyViewModel(dacastSdk.getApiKeys, undefined, formatGetApiKeysOutput, ActionTypes.GET_API_KEYS, null, 'Couldn\'t get api keys')
export const createApiKeyAction = applyViewModel(dacastSdk.postApiKey, formatPostApiKeyInput, formatPostApiKeyOutput, ActionTypes.CREATE_API_KEY, null, 'Couldn\'t get api keys')

export type Action = GetSettingsIntegrationDetails | CreateApiKey;

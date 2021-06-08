import { ActionTypes, ApiKeyItem } from "./types";
import { applyViewModel } from "../../../../utils/utils";
import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { formatDeleteApiKeyInput, formatGetApiKeysOutput, formatPatchApiKeyInput, formatPatchApiKeyOutput, formatPostApiKeyInput, formatPostApiKeyOutput, formatPostRegenerateApiKeyInput, formatPostRegenerateApiKeyOutput } from "./viewModel";

export interface GetSettingsIntegrationDetails {
    type: ActionTypes.GET_API_KEYS;
    payload: ApiKeyItem[];
}

export interface CreateApiKey {
    type: ActionTypes.CREATE_API_KEY
    payload: ApiKeyItem
}

export interface UpdateApiKey {
    type: ActionTypes.UPDATE_API_KEY
    payload: ApiKeyItem
}

export interface DeleteApiKey {
    type: ActionTypes.DELETE_API_KEY
    payload: string
}


export interface RegenerateApiKey {
    type: ActionTypes.REGENERATE_API_KEY
    payload: ApiKeyItem & {previousKey: string}
}

export const getApiKeysAction = applyViewModel(dacastSdk.getApiKeys, undefined, formatGetApiKeysOutput, ActionTypes.GET_API_KEYS, null, 'Couldn\'t get api keys')
export const createApiKeyAction = applyViewModel(dacastSdk.postApiKey, formatPostApiKeyInput, formatPostApiKeyOutput, ActionTypes.CREATE_API_KEY, 'Api key created', 'Couldn\'t create api key')
export const updateApiKeyAction = applyViewModel(dacastSdk.patchApiKey, formatPatchApiKeyInput, formatPatchApiKeyOutput, ActionTypes.UPDATE_API_KEY, 'Api key updated', 'Couldn\'t update api key')
export const deleteApiKeyAction = applyViewModel(dacastSdk.deleteApiKey, formatDeleteApiKeyInput, undefined, ActionTypes.DELETE_API_KEY, 'Api key deleted', 'Couldn\'t delete api key')
export const regenerateApiKeyAction = applyViewModel(dacastSdk.postRegenerateApiKey, formatPostRegenerateApiKeyInput, formatPostRegenerateApiKeyOutput, ActionTypes.REGENERATE_API_KEY, 'Api key regenerated', 'Couldn\'t regenerate api key')

export type Action = GetSettingsIntegrationDetails | CreateApiKey | UpdateApiKey | DeleteApiKey | RegenerateApiKey;

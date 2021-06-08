import { GetApiKeysOutput, PatchApiKeyInput, PatchApiKeyOutput, PostApiKeyInput, PostApiKeyOutput } from "../../../../../DacastSdk/settings"
import { ApiKeyItem } from "./types"

export const formatGetApiKeysOutput = (data: GetApiKeysOutput): ApiKeyItem[] => {
    let formattedData: ApiKeyItem[] = data.filter(k => k.status === 'active').map(key => {
        return {
            label: key.name,
            authToken: key.key,
            created: key.created_at,
            clientId: key.resource_id,
            type: 'rw'
        }
    })

    return formattedData
}

export const formatPostApiKeyInput = (data: ApiKeyItem): PostApiKeyInput => {
    let formattedData: PostApiKeyInput = {
        name: data.label
    }

    return formattedData
}

export const formatPostApiKeyOutput = (key: PostApiKeyOutput): ApiKeyItem => {
    let formattedData: ApiKeyItem = {
            label: key.name,
            authToken: key.key,
            created: key.created_at,
            clientId: key.resource_id,
            type: 'rw'
    }
    return formattedData
}

export const formatPatchApiKeyInput = (data: ApiKeyItem): PatchApiKeyInput => {
    let formattedData: PatchApiKeyInput = {
        id: data.authToken,
        payload: {
            name: data.label
        }
    }

    return formattedData
}

export const formatPatchApiKeyOutput = (key: PatchApiKeyOutput): ApiKeyItem => {
    let formattedData: ApiKeyItem = {
            label: key.name,
            authToken: key.key,
            created: key.created_at,
            clientId: key.resource_id,
            type: 'rw'
    }
    return formattedData
}

export const formatDeleteApiKeyInput = (key: string): string => key
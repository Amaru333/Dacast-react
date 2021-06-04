import { GetApiKeysOutput, PostApiKeyInput } from "../../../../../DacastSdk/settings"
import { ApiKeyItem } from "./types"

export const formatGetApiKeysOutput = (data: GetApiKeysOutput): ApiKeyItem[] => {
    let formattedData: ApiKeyItem[] = data.map(key => {
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

export const formatPostApiKeyInput = (data: string): PostApiKeyInput => {
    let formattedData: PostApiKeyInput = {
        name: data
    }

    return formattedData
}

export const formatPostApiKeyOutput = (data: any): any => {}
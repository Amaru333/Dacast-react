import { BulkActionItem, PostBulkActionInput, PutUploadFileInput } from '../../../../DacastSdk/common'
import { BulkActionInput } from './types'

export const formatPutUploadFileInput = (data: {data: File, uploadUrl: string; contentId?: string}): PutUploadFileInput => {
    let formattedData: PutUploadFileInput = {
        uploadUrl: data.uploadUrl,
        data: data.data
    }

    return formattedData
}

export const formatPostBulkActionInput = (data: BulkActionInput): PostBulkActionInput => {
    let formattedData: PostBulkActionInput = {
        action: data.action,
        items: data.items.map((item): BulkActionItem => {
            if (item.name) {
                return {
                    id: item.id,
                    contentType: item.type === 'live' ? 'channel' : item.type === 'expo' ? 'expos' : item.type,
                    name: item.name
                }
            }
            return {
                id: item.id,
                contentType: item.type === 'live' ? 'channel' : item.type === 'expo' ? 'expos' : item.type
            }
        })
    }
    if (data.targetValue) {
        formattedData = {
            ...formattedData,
            targetValue: data.targetValue
        }
    }

    return formattedData

}
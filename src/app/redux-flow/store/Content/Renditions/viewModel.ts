import { BulkActionItem, PostBulkActionInput, PostBulkActionOutput } from "../../../../../DacastSdk/common"
import { GetVodRenditionsOutput } from "../../../../../DacastSdk/video"
import { ContentType } from "../../Common/types"
import { Rendition, RenditionsList } from "./types"

export const formatGetVodRenditionsInput = (data: string): string => data

export const formatGetVodRenditionsOutput = (contentType: ContentType) =>  (data: GetVodRenditionsOutput): {contentId: string; contentType: ContentType; data: RenditionsList} => {
    let formattedData: {contentId: string; contentType: ContentType; data: RenditionsList} = {
        contentId: data.id,
        contentType: contentType,
        data: {
            presets: data.presets,
            storageRemaining: data.storageRemaining,
            videoInfo: data.videoInfo,
            encodedRenditions: data.encodedRenditions.map(rendition => {
                return {
                    renditionID: rendition.renditionID,
                    name: rendition.name,
                    size : rendition.size || 0,
                    width: rendition.width || 0,
                    height: rendition.height || 0,
                    bitrate: rendition.bitrate || 0,
                    fileLocation: rendition.fileLocation || '',
                    transcodingJobID: rendition.transcodingJobID || null
                }
            })
        }
    }
    console.log('formatted data: ', formattedData)
    return formattedData
}

export const formatPostVodRenditionsInput = (data: {names: string[]; targetValue: string}): PostBulkActionInput => {
    let formattedData: PostBulkActionInput = {
        items: data.names.map(name => {
            return {
                name: name,
                contentType: 'rendition'
            }
        }),
        action: 'create',
        targetValue: data.targetValue
    }

    return formattedData
}

export const formatPostVodRenditionsOutput = (contentType: ContentType) => (endpointResponse: PostBulkActionOutput, dataReact: {names: string[]; targetValue: string}): { contentId: string; contentType: ContentType; data: Rendition[]} => {
    let formattedData: { contentId: string; contentType: ContentType; data: Rendition[]} = {
        data: endpointResponse.items.map((item: BulkActionItem, i: number): Rendition => {
            return {
                renditionID: item.id,
                name: item.name,
                size: 0,
                bitrate: 0,
                width: 0,
                transcodingJobID: null,
                height: 0,
                fileLocation: 'vod-storage'
            }
        }),
        contentId: dataReact.targetValue as string,
        contentType: contentType
    }

    return formattedData
}

export const formatDeleteVodRenditionsInput = (data: {ids: string[]; targetValue: string}): PostBulkActionInput => {
    let formattedData: PostBulkActionInput = {
        items: data.ids.map(renditionId => {
            return {
                id: renditionId,
                contentType: 'rendition'
            }
        }),
        action: 'delete',
        targetValue: data.targetValue
    }

    return formattedData
}

export const formatDeleteVodRenditionsOutput = (contentType: ContentType) => (endpointResponse: PostBulkActionOutput, dataReact: {ids: string[]; targetValue: string}): { contentId: string; contentType: ContentType; data: string[]} => {
    let formattedData: { contentId: string; contentType: ContentType; data: string[]} = {
        data: dataReact.ids,
        contentId: dataReact.targetValue as string,
        contentType: contentType
    }

    return formattedData
}
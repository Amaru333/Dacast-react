import { BulkActionItem, PostBulkActionInput, PostBulkActionOutput } from "../../../../../DacastSdk/common"
import { GetVodRenditionsOutput } from "../../../../../DacastSdk/video"
import { ContentType } from "../../Common/types"
import { Rendition, RenditionsList } from "./types"

export const formatGetVodRenditionsInput = (data: string): string => data

export const formatGetVodRenditionsOutput = (contentType: ContentType) =>  (data: GetVodRenditionsOutput): {contentId: string; contentType: ContentType; data: RenditionsList} => {
    let formattedData: {contentId: string; contentType: ContentType; data: RenditionsList} = {
        contentId: data.id,
        contentType: contentType,
        data: data
    }
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
                size: null,
                bitrate: null,
                width: null,
                transcodingJobID: null,
                height: null,
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
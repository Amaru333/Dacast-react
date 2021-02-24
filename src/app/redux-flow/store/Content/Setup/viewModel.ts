import { GetExpoSetupOutput, PutExpoSetupInput } from "../../../../../DacastSdk/expo"
import { GetPlaylistSetupOutput, PutPlaylistSetupInput } from "../../../../../DacastSdk/playlist"
import { ContentType } from "../../Common/types"
import { ContentSelectorType, ContentSetupObject } from "./types"

export const formatGetContentSetupInput = (data: string): string => data

export const formatGetPlaylistSetupOutput = (contentType: ContentType) => (data: GetPlaylistSetupOutput): {contentId: string; contentType: string; data: ContentSetupObject} => {
    let formattedData: {contentId: string; contentType: string; data: ContentSetupObject} = {
        contentId: data.id,
        data: {
            id: data.id,
            contentList: data.contentList.map(content => {
                return {
                    contentType: content["content-type"],
                    title: content.title,
                    thumbnailURL: content.thumbnailURL,
                    id: content["content-type"] === 'vod' ? content["vod-id"] : content["live-channel-id"]
                }
            }),
            folderId: data.folderId,
            maxItems: data.maxItems,
            type: data.playlistType,
            sortType:  data.sortType,
            title: data.title
        },
        contentType: contentType
    }

    return formattedData
}

export const formatPutPlaylistSetupInput = (data: ContentSetupObject): PutPlaylistSetupInput => {
    let formattedData: PutPlaylistSetupInput = {
        id: data.id,
        folderId: data.folderId,
        title: undefined,
        playlistType: data.type,
        sortType: data.sortType,
        maxItems: data.maxItems,
        contentList: data.contentList.map(content => {
            if(content.contentType === 'vod') {
                return {
                    'content-type': content.contentType,
                    title: content.title,
                    thumbnailURL: content.thumbnailURL,
                    'vod-id': content.id
                }
            }

            if(content.contentType === 'live') {
                return {
                    'content-type': content.contentType,
                    title: content.title,
                    thumbnailURL: content.thumbnailURL,
                    'live-channel-id': content.id
                }
            }

            return {
                'content-type': content.contentType,
                title: content.title,
                thumbnailURL: content.thumbnailURL,
                id: content.id
            }

        })
    }

    return formattedData
}

export const formatPutContentSetupOutput = (contentType: ContentType) => (ednpointResponse: null, dataReact: ContentSetupObject): {data: ContentSetupObject; contentType: ContentType} => {
    let formattedData: {data: ContentSetupObject; contentType: ContentType} = {
        data: dataReact,
        contentType: contentType
    }

    return formattedData
}

export const formatGetExpoSetupOutput = (contentType: ContentType) => (data: GetExpoSetupOutput): {contentId: string; contentType: string; data: ContentSetupObject} => {
    let formattedData: {contentId: string; contentType: string; data: ContentSetupObject} = {
        contentId: data.id,
        data: {
            id: data.id,
            contentList: data.contentList.map(content => {
                return {
                    contentType: content.contentType,
                    title: content.title,
                    thumbnailURL: content.thumbnailUrl,
                    id: content.contentId
                }
            }),
            folderId: data.folderId,
            maxItems: data.maxItems,
            type: data.expoType.replace('-list', '') as ContentSelectorType,
            sortType:  data.sortType,
            title: data.title
        },
        contentType: contentType
    }

    return formattedData
}

export const formatPutExpoSetupInput = (data: ContentSetupObject): PutExpoSetupInput => {
    let formattedData: PutExpoSetupInput = {
        id: data.id,
        payload: {
            folderId: data.folderId,
            title: undefined,
            expoType: data.type,
            sortType: data.sortType,
            maxItems: data.maxItems,
            contentList: data.contentList.map(content => {
                return {
                    contentType: content.contentType,
                    contentId: content.id,
                }
    
            })
        }
    }

    return formattedData
}
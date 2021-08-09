import { GetFolderContentOutput, isFolder, PutMoveFolderInput } from "../../../../DacastSdk/folder"
import { capitalizeFirstLetter } from "../../../../utils/utils"
import { ContentStatus } from "../Common/types"
import { FolderAsset, FolderContent, SearchResult } from "./types"

export const formatGetFolderContentInput = (qs: string): string => qs

export const formatGetFolderContentOutput = (data: GetFolderContentOutput): SearchResult => {
    let formattedData: SearchResult = {
        pageNumber: data.page,
        totalResults: data.totalResults,
        perPage: data.perPage,
        results: data.results ? data.results.map((item): FolderAsset => {

            if(isFolder(item)) {
                return {
                    objectID: item.objectID,
                    createdAt: item.createdAt,
                    featuresList: item.featuresList,
                    title: item.name,
                    type: 'folder',
                }
            }

            return {
                objectID: item.objectID.substr(item.objectID.indexOf('_') + 1),
                createdAt: item.createdAt,
                title: item.title,
                featuresList: item.featuresList,
                type: item.type === 'channel' ? 'live' : item.type as 'playlist' | 'vod' | 'expo',
                status: item.status ? capitalizeFirstLetter(item.status) as ContentStatus : null,
                thumbnail: item.thumbnail,
                duration: item.duration ? item.duration.toString() : null
            }
        })
        : []
    }
    return formattedData
}

export const formatPutMoveFolderInput = (data: {foldersIds: string[], movedContent: FolderContent[], oldFolderId?: string}): PutMoveFolderInput => {
    let formattedData: PutMoveFolderInput = {
        destinationFoldersIds: data.foldersIds.length === 0 ? null : data.foldersIds,
        oldFolderId: data.oldFolderId || '',
        movedContent: data.movedContent.map(content => {
            if(content.type === 'live') {
                return {
                    ...content,
                    type: 'channel'
                }
            }

            return {
                ...content,
                type: content.type as 'folder' | 'playlist' | 'vod'
            }
        })
    }

    return formattedData
}
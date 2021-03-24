import { GetVodChapterMarkersOutput, PutVodChapterMarkersInput } from "../../../../../DacastSdk/video"
import { ContentType } from "../../Common/types"
import { ChapterMarker } from "./types"

export const formatGetVodChapterMarkersInput = (data: string): string => data

export const formatGetVodChapterMarkersOutput = (contentType: ContentType) => (endpointResponse: GetVodChapterMarkersOutput, dataRect: string): {contentId: string; contentType: ContentType; chapterMarkers: ChapterMarker[]} => {
    let formattedData: {contentId: string; contentType: ContentType; chapterMarkers: ChapterMarker[]} = {
        contentId: dataRect,
        contentType: contentType,
        chapterMarkers: endpointResponse.chapterMarkers.map((chapter, i) => {
            return {
                start: chapter.start,
                text: chapter.text,
                id: chapter.text + i.toString()
            }
        })
    }

    return formattedData
}

export const formatPutVodChapterMarkersInput = (data: {contentId: string; chapterMarkers: ChapterMarker[]}): PutVodChapterMarkersInput => {
    let formattedData: PutVodChapterMarkersInput = {
        id: data.contentId,
        payload: {
            chapterMarkers: data.chapterMarkers.map(chapter => {
                return {
                    start: chapter.start,
                    text: chapter.text
                }
            })
        }
    }

    return formattedData
}

export const formatPutVodChapterMarkersOutput = (contentType: ContentType) => (endpointResponse: null, dataReact: {contentId: string; chapterMarkers: ChapterMarker[]}): {contentType: ContentType; contentId: string; chapterMarkers: ChapterMarker[]} => {
    let formattedData: {contentType: ContentType; contentId: string; chapterMarkers: ChapterMarker[]} = {
        contentType: contentType,
        contentId: dataReact.contentId,
        chapterMarkers: dataReact.chapterMarkers
    }

    return formattedData
}
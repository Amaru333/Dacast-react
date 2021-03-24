import { ActionTypes } from "./types"
import { ChapterMarker } from './types'
import { applyViewModel } from '../../../../utils/utils'
import { dacastSdk } from "../../../../utils/services/axios/axiosClient"
import { ContentType } from "../../Common/types"
import { formatGetVodChapterMarkersInput, formatGetVodChapterMarkersOutput, formatPutVodChapterMarkersInput, formatPutVodChapterMarkersOutput } from "./viewModel"

export interface GetContentChapterMarkers {
    type: ActionTypes.GET_CONTENT_CHAPTER_MARKERS;
    payload: {contentId: string; contentType: ContentType; chapterMarkers: ChapterMarker[]};
}

export interface SaveContentChapterMarker {
    type: ActionTypes.SAVE_CONTENT_CHAPTER_MARKER;
    payload: {contentId: string; contentType: ContentType; chapterMarkers: ChapterMarker[]};
}

export interface AddContentChapterMarker {
    type: ActionTypes.ADD_CONTENT_CHAPTER_MARKER;
    payload: {contentId: string; contentType: ContentType; chapterMarkers: ChapterMarker[]};
}

export interface DeleteContentChapterMarker {
    type: ActionTypes.DELETE_CONTENT_CHAPTER_MARKER;
    payload: {contentId: string; contentType: ContentType; chapterMarkers: ChapterMarker[]};
}

export const getContentChapterMarkersAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.getVodChapterMarkers, formatGetVodChapterMarkersInput, formatGetVodChapterMarkersOutput(contentType), ActionTypes.GET_CONTENT_CHAPTER_MARKERS, null, 'Couldn\'t get chapter markers')
        default:
            throw new Error('Error applying get content view model')
    }
}

export const saveContentChapterMarkerAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodChapterMarkers, formatPutVodChapterMarkersInput, formatPutVodChapterMarkersOutput(contentType), ActionTypes.SAVE_CONTENT_CHAPTER_MARKER, 'Chapter has been saved', 'Couldn\'t save chapter')
        default:
            throw new Error('Error applying get content view model')
    }
}

export const addContentChapterMarkerAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodChapterMarkers, formatPutVodChapterMarkersInput, formatPutVodChapterMarkersOutput(contentType), ActionTypes.ADD_CONTENT_CHAPTER_MARKER, 'Chapter has been saved', 'Couldn\'t save chapter')
        default:
            throw new Error('Error applying get content view model')
    }
}

export const deleteContentChapterMarkerAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.putVodChapterMarkers, formatPutVodChapterMarkersInput, formatPutVodChapterMarkersOutput(contentType), ActionTypes.SAVE_CONTENT_CHAPTER_MARKER, 'Chapter has been deleted', 'Couldn\'t delete chapter')
        default:
            throw new Error('Error applying get content view model')
    }
}

export type Action = GetContentChapterMarkers | SaveContentChapterMarker | AddContentChapterMarker | DeleteContentChapterMarker

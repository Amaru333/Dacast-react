import { RenditionsList, ActionTypes, Rendition } from '../Renditions/types'
import { applyViewModel } from '../../../../utils/utils';
import { dacastSdk } from "../../../../utils/services/axios/axiosClient";
import { ContentType } from "../../Common/types";
import { formatDeleteVodRenditionsInput, formatDeleteVodRenditionsOutput, formatGetVodRenditionsInput, formatGetVodRenditionsOutput, formatPostVodRenditionsInput, formatPostVodRenditionsOutput } from "./viewModel";

export interface GetContentRenditions {
    type: ActionTypes.GET_CONTENT_RENDITIONS;
    payload: {contentId: string; contentType: ContentType; data: RenditionsList};
}

export interface AddContentRenditions {
    type: ActionTypes.ADD_CONTENT_RENDITIONS;
    payload: { contentId: string; contentType: ContentType; data: Rendition[]};
}

export interface DeleteContentRenditions {
    type: ActionTypes.DELETE_CONTENT_RENDITIONS;
    payload: { contentId: string; contentType: ContentType; data: string[] } ;
}

export const getContentRenditionsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.getVodRenditions, formatGetVodRenditionsInput, formatGetVodRenditionsOutput(contentType), ActionTypes.GET_CONTENT_RENDITIONS, null, 'Couldn\'t get video renditions')
        default:
            throw new Error('Error applying content view model')
    }
}

export const addContentRenditionsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.postBulkAction, formatPostVodRenditionsInput, formatPostVodRenditionsOutput(contentType), ActionTypes.ADD_CONTENT_RENDITIONS, null, 'Couldn\'t add video renditions')
        default:
            throw new Error('Error applying content view model')
    }
}

export const deleteContentRenditionsAction = (contentType: ContentType) => {
    switch(contentType) {
        case 'vod': 
            return applyViewModel(dacastSdk.postBulkAction, formatDeleteVodRenditionsInput, formatDeleteVodRenditionsOutput(contentType), ActionTypes.DELETE_CONTENT_RENDITIONS, null, 'Couldn\'t delete video renditions')
        default:
            throw new Error('Error applying content view model')
    }
}

export type Action = GetContentRenditions | AddContentRenditions | DeleteContentRenditions
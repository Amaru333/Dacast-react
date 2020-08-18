import { ThunkDispatch } from "redux-thunk";
import { showToastNotification } from '../../Toasts';
import { ApplicationState } from '../..';
import { RenditionsList, ActionTypes, Rendition } from '../Renditions/types'
import { ContentRenditionsServices } from './services';
import { parseContentType } from '../../../../utils/utils';

export interface GetContentRenditions {
    type: ActionTypes.GET_CONTENT_RENDITIONS;
    payload: {contentId: string; contentType: string; data: RenditionsList};
}

export interface AddContentRenditions {
    type: ActionTypes.ADD_CONTENT_RENDITIONS;
    payload:{ contentId: string; contentType: string; data: Rendition[]};
}

export interface DeleteContentRenditions {
    type: ActionTypes.DELETE_CONTENT_RENDITIONS;
    payload: { contentId: string; contentType: string; data: string[] } ;
}

export const getContentRenditionsAction = (contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, GetContentRenditions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, GetContentRenditions>) => {
        await ContentRenditionsServices.getContentRenditionsService(contentId, parseContentType(contentType))
            .then(response => {
                dispatch({ type: ActionTypes.GET_CONTENT_RENDITIONS, payload: {contentId: contentId, contentType: contentType, data: response.data }});
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const addContentRenditionsAction = (data: string[], contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, AddContentRenditions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, AddContentRenditions>) => {
        await ContentRenditionsServices.addContentRenditionsService(data, contentId)
            .then(response => {
                let array: Rendition[] = [] 
                response.data.data.items.map((item: any, i: number) => {
                    let rendition: Rendition = {
                        renditionID: item.id,
                        name: data[i],
                        size: null,
                        bitrate: null,
                        width: null,
                        transcodingJobID: null,
                        height: null
                    } 
                    array.push(rendition)
                })
                dispatch({ type: ActionTypes.ADD_CONTENT_RENDITIONS, payload:{ contentId: contentId, contentType: contentType, data: array} });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteContentRenditionsAction = (data: string[], contentId: string, contentType: string): ThunkDispatch<Promise<void>, {}, AddContentRenditions> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, DeleteContentRenditions>) => {
        await ContentRenditionsServices.deleteContentRenditionsService(data, contentId)
            .then(response => {
                dispatch({ type: ActionTypes.DELETE_CONTENT_RENDITIONS, payload: { contentId: contentId, contentType: contentType, data: data } });
            })
            .catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}



export type Action = GetContentRenditions | AddContentRenditions | DeleteContentRenditions
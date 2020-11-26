import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '..';
import { showToastNotification } from '../Toasts';
import { ActionTypes, SearchResult, ContentType } from './types'
import { FoldersServices } from './services';

export interface GetFolderContent {
    type: ActionTypes.GET_FOLDER_CONTENT;
    payload: {data: SearchResult};
}

export interface DeleteContent {
    type: ActionTypes.DELETE_CONTENT;
    payload: ContentType[];
}

export interface RestoreContent {
    type: ActionTypes.RESTORE_CONTENT;
    payload: ContentType[];
}

export const getFolderContentAction = (qs: string, callback?: (data: SearchResult) => void): ThunkDispatch<Promise<void>, {}, GetFolderContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetFolderContent> ) => {
        await FoldersServices.getFolderContent(qs)
            .then( response => {
                dispatch( {type: ActionTypes.GET_FOLDER_CONTENT, payload: response.data} );
                callback ? callback(response.data) : null;
            }).catch((error) => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const deleteContentAction = (content: ContentType[]): ThunkDispatch<Promise<void>, {}, DeleteContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteContent> ) => {
        await FoldersServices.deleteContent(content)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_CONTENT, payload: content} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export const restoreContentAction = (content: ContentType[]): ThunkDispatch<Promise<void>, {}, RestoreContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, RestoreContent> ) => {
        await FoldersServices.restoreContent(content)
            .then( response => {
                dispatch( {type: ActionTypes.RESTORE_CONTENT, payload: content} );
                dispatch(showToastNotification("Content has been restored", 'fixed', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
                return Promise.reject()
            })
    };
}

export type Action =  GetFolderContent | DeleteContent | RestoreContent 




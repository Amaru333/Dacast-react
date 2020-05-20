import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '..';
import { showToastNotification } from '../Toasts';
import { ActionTypes, FolderAsset, SearchResult, ContentType } from './types'
import { FoldersServices } from './services';

export interface GetFolderContent {
    type: ActionTypes.GET_FOLDER_CONTENT;
    payload: {data: SearchResult};
}

export interface DeleteContent {
    type: ActionTypes.DELETE_CONTENT;
    payload: FolderAsset[];
}

export interface RestoreContent {
    type: ActionTypes.RESTORE_CONTENT;
    payload: FolderAsset[];
}

export const getFolderContentAction = (qs: string, callback?: Function): ThunkDispatch<Promise<void>, {}, GetFolderContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetFolderContent> ) => {
        await FoldersServices.getFolderContent(qs)
            .then( response => {
                dispatch( {type: ActionTypes.GET_FOLDER_CONTENT, payload: response.data} );
                if(callback) {
                    callback(response);
                }
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteContentAction = (content: ContentType[]): ThunkDispatch<Promise<void>, {}, DeleteContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteContent> ) => {
        await FoldersServices.deleteContent(content)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_CONTENT, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const restoreContentAction = (content: ContentType[]): ThunkDispatch<Promise<void>, {}, RestoreContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, RestoreContent> ) => {
        await FoldersServices.restoreContent(content)
            .then( response => {
                dispatch( {type: ActionTypes.RESTORE_CONTENT, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action =  GetFolderContent | DeleteContent | RestoreContent 




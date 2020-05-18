import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '..';
import { showToastNotification } from '../Toasts';
import { ActionTypes, FolderTreeNode, FolderAsset, SearchResult } from './types'
import { FoldersServices } from './services';

export interface GetFolders {
    type: ActionTypes.GET_FOLDERS;
    payload: {data: any};
}

export interface GetFolderContent {
    type: ActionTypes.GET_FOLDER_CONTENT;
    payload: {data: SearchResult};
}

export interface MoveItemsToFolder {
    type: ActionTypes.MOVE_ITEMS_TO_FOLDER;
    payload: FolderAsset[];
}

export interface AddFolder {
    type: ActionTypes.ADD_FOLDER;
    payload: FolderTreeNode;
}

export interface DeleteFolder {
    type: ActionTypes.DELETE_FOLDER;
    payload: FolderTreeNode;
}

export interface DeleteContent {
    type: ActionTypes.DELETE_CONTENT;
    payload: FolderAsset[];
}

export interface RestoreContent {
    type: ActionTypes.RESTORE_CONTENT;
    payload: FolderAsset[];
}

export interface RenameFolder {
    type: ActionTypes.RENAME_FOLDER;
    payload: FolderTreeNode;
}


export const getFoldersAction = (folderPath: string): ThunkDispatch<Promise<void>, {}, GetFolders> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetFolders> ) => {
        return await FoldersServices.getFolders(folderPath)
            .then( response => {
                dispatch( {type: ActionTypes.GET_FOLDERS, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const getFolderContentAction = (qs: string): ThunkDispatch<Promise<void>, {}, GetFolderContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, GetFolderContent> ) => {
        await FoldersServices.getFolderContent(qs)
            .then( response => {
                dispatch( {type: ActionTypes.GET_FOLDER_CONTENT, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const moveItemsToFolderAction = (foldersPath: string[], items: FolderAsset[]): ThunkDispatch<Promise<void>, {}, MoveItemsToFolder> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, MoveItemsToFolder> ) => {
        await FoldersServices.moveItemsToFolder(foldersPath, items)
            .then( response => {
                dispatch( {type: ActionTypes.MOVE_ITEMS_TO_FOLDER, payload: response.data} );
                dispatch(showToastNotification(`${foldersPath.length} items moved successfully`, 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const addFolderAction = (foldersPath: string): ThunkDispatch<Promise<void>, {}, AddFolder> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, AddFolder> ) => {
        await FoldersServices.addFolder(foldersPath)
            .then( response => {
                dispatch( {type: ActionTypes.ADD_FOLDER, payload: response.data} );
                dispatch(showToastNotification(`${foldersPath} has been added`, 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteFolderAction = (foldersIds: string[]): ThunkDispatch<Promise<void>, {}, DeleteFolder> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteFolder> ) => {
        await FoldersServices.deleteFolder(foldersIds)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_FOLDER, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const deleteContentAction = (content: FolderAsset[]): ThunkDispatch<Promise<void>, {}, DeleteContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, DeleteContent> ) => {
        await FoldersServices.deleteContent(content)
            .then( response => {
                dispatch( {type: ActionTypes.DELETE_CONTENT, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const restoreContentAction = (content: FolderAsset[]): ThunkDispatch<Promise<void>, {}, RestoreContent> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, RestoreContent> ) => {
        await FoldersServices.restoreContent(content)
            .then( response => {
                dispatch( {type: ActionTypes.RESTORE_CONTENT, payload: response.data} );
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export const renameFolderAction = (foldersPath: string, newName: string): ThunkDispatch<Promise<void>, {}, RenameFolder> => {
    return async (dispatch: ThunkDispatch<ApplicationState , {}, RenameFolder> ) => {
        await FoldersServices.renameFolder(foldersPath, newName)
            .then( response => {
                dispatch( {type: ActionTypes.RENAME_FOLDER, payload: response.data} );
                dispatch(showToastNotification(`${newName} has been saved`, 'flexible', "success"));
            }).catch(() => {
                dispatch(showToastNotification("Oops! Something went wrong..", 'fixed', "error"));
            })
    };
}

export type Action = GetFolders | GetFolderContent | MoveItemsToFolder | AddFolder | DeleteFolder | DeleteContent | RestoreContent | RenameFolder




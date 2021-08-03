import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '..';
import { showToastNotification } from '../Toasts';
import { ActionTypes, SearchResult, FolderContent } from './types'
import { FoldersServices } from './services';
import { applyViewModel } from '../../../utils/utils';
import { dacastSdk } from '../../../utils/services/axios/axiosClient';
import { formatGetFolderContentInput, formatGetFolderContentOutput } from './viewModel';

export interface GetFolderContent {
    type: ActionTypes.GET_FOLDER_CONTENT;
    payload: SearchResult;
}

export interface RestoreContent {
    type: ActionTypes.RESTORE_CONTENT;
    payload: FolderContent[];
}

export const getFolderContentAction = applyViewModel(dacastSdk.getFolderContentList, formatGetFolderContentInput, formatGetFolderContentOutput, ActionTypes.GET_FOLDER_CONTENT, null, 'Couldn\'t get folder content')

export const restoreContentAction = (content: FolderContent[]): ThunkDispatch<Promise<void>, {}, RestoreContent> => {
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

export type Action =  GetFolderContent | RestoreContent 




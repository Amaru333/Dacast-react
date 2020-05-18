import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getFoldersAction, moveItemsToFolderAction, Action, addFolderAction, deleteFolderAction, deleteContentAction, restoreContentAction, renameFolderAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts';
export interface FoldersComponentProps {
    folderData: FoldersInfos;
    getFolders: Function;
    getFolderContent: Function;
    moveItemsToFolder: Function;
    addFolder: Function;
    deleteFolder: Function;
    deleteContent: Function;
    restoreContent: Function;
    renameFolder: Function;
    showToast: Function;
}

const Folders = (props: FoldersComponentProps) => {
    React.useEffect(() => {
        if(!props.folderData.requestedFolder || !props.folderData.requestedContent) {
            const wait = async () => {
                await props.getFolderContent(null)
                await props.getFolders('');
            }
            wait()
        }
    }, [])
    return (
        props.folderData.requestedFolder && props.folderData.requestedContent ? 
            <FoldersPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getFolders: async (folderPath: string) => {
            await dispatch(getFoldersAction(folderPath));
        },
        getFolderContent: (qs: string) => {
            dispatch(getFolderContentAction(qs))
        },
        moveItemsToFolder: (folderPath: string[], items: FolderAsset[]) => {
            dispatch(moveItemsToFolderAction(folderPath, items))
        },
        addFolder: (folderPath: string) => {
            dispatch(addFolderAction(folderPath))
        },
        deleteFolder: (foldersIds: string[]) => {
            dispatch(deleteFolderAction(foldersIds))
        },
        deleteContent: (content: FolderAsset[]) => {
            dispatch(deleteContentAction(content))
        },
        restoreContent: (content: FolderAsset[]) => {
            dispatch(restoreContentAction(content))
        },
        renameFolder: (folderPath: string, newName: string) => {
            dispatch(renameFolderAction(folderPath, newName))
        },
        showToast: (text: string, size: Size, type: NotificationType) => {
            dispatch(showToastNotification(text, size, type))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
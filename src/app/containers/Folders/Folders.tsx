import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getFoldersAction, moveItemsToFolderAction, Action, addFolderAction, deleteFolderAction, deleteContentAction, restoreContentAction, renameFolderAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
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
}

const Folders = (props: FoldersComponentProps) => {
    React.useEffect(() => {
        if(!props.folderData) {
            const wait = async () => {
                await props.getFolderContent('/folder1/')
                //await props.getFolders('/');
            }
            wait()
        }
    }, [])
    return (
        props.folderData ? 
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
        getFolders: (folderPath: string) => {
            dispatch(getFoldersAction(folderPath));
        },
        getFolderContent: (folderPath: string) => {
            dispatch(getFolderContentAction(folderPath))
        },
        moveItemsToFolder: (folderPath: string[], items: FolderAsset[]) => {
            dispatch(moveItemsToFolderAction(folderPath, items))
        },
        addFolder: (folderPath: string) => {
            dispatch(addFolderAction(folderPath))
        },
        deleteFolder: (folderPath: string) => {
            dispatch(deleteFolderAction(folderPath))
        },
        deleteContent: (content: FolderAsset[]) => {
            dispatch(deleteContentAction(content))
        },
        restoreContent: (content: FolderAsset[]) => {
            dispatch(restoreContentAction(content))
        },
        renameFolder: (folderPath: string, newName: string) => {
            dispatch(renameFolderAction(folderPath, newName))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
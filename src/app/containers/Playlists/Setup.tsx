import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getFoldersAction, moveItemsToFolderAction, Action, addFolderAction, deleteFolderAction, deleteContentAction, restoreContentAction, renameFolderAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SetupPage } from '../../pages/Playlist/Setup/Setup';
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

const Setup = (props: FoldersComponentProps) => {
    React.useEffect(() => {
        if(!props.folderData) {
            const wait = async () => {
                await props.getFolderContent('/')
                //await props.getFolders('/');
            }
            wait()
        }
        console.log(props.folderData);
    }, [])
    return (
        props.folderData ? 
            <SetupPage {...props} />
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
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
        restoreContent: (content: FolderAsset[]) => {
            dispatch(restoreContentAction(content))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
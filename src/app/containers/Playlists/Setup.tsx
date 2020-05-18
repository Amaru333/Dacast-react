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
import { useParams } from 'react-router-dom';
import { PlaylistsTabs } from './PlaylistTabs';
import { getPlaylistSetupAction } from '../../redux-flow/store/Playlists/Setup/actions';
import { PlaylistSetupState } from '../../redux-flow/store/Playlists/Setup/types';

export interface SetupComponentProps {
    folderData: FoldersInfos;
    playlistData: PlaylistSetupState;
    getPlaylistSetup: Function;
    getFolders: Function;
    getFolderContent: Function;
    moveItemsToFolder: Function;
    addFolder: Function;
    deleteFolder: Function;
    deleteContent: Function;
    restoreContent: Function;
    renameFolder: Function;
}

const Setup = (props: SetupComponentProps) => {

    let { playlistId } = useParams()
    
    React.useEffect(() => {
        props.getPlaylistSetup(playlistId)

        if(!props.folderData) {

            const wait = async () => {

                await props.getFolderContent('/')
                // await props.getFolders(null);
            }
            wait()
        }
    }, [])
    return (
        props.folderData  ? 
            <div className='flex flex-column'>
                <PlaylistsTabs playlistId={playlistId} />
                <SetupPage {...props} />
            </div>
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        playlistData: state.playlist.setup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistSetup: (playlistId: string) => {
            dispatch(getPlaylistSetupAction(playlistId))
        },
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
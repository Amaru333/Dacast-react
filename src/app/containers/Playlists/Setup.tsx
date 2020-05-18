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
import { getPlaylistSetupAction, postPlaylistSetupAction } from '../../redux-flow/store/Playlists/Setup/actions';
import { PlaylistSetupState } from '../../redux-flow/store/Playlists/Setup/types';

export interface SetupComponentProps {
    folderData: FoldersInfos;
    playlistData: PlaylistSetupState;
    getPlaylistSetup: Function;
    getFolderContent: Function;
    savePlaylistSetup: Function
}

const Setup = (props: SetupComponentProps) => {

    let { playlistId } = useParams()
    
    React.useEffect(() => {
        props.getPlaylistSetup(playlistId)

        if(!props.folderData) {

            const wait = async () => {

                await props.getFolderContent('/')
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
        getFolderContent: (folderPath: string) => {
            dispatch(getFolderContentAction(folderPath))
        },
        savePlaylistSetup: (playlistData: PlaylistSetupState, playlistId: string) => {
            dispatch(postPlaylistSetupAction(playlistData, playlistId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
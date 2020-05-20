import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SetupPage } from '../../pages/Playlist/Setup/Setup';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { PlaylistsTabs } from './PlaylistTabs';
import { getPlaylistSetupAction, postPlaylistSetupAction } from '../../redux-flow/store/Playlists/Setup/actions';
import { PlaylistSetupState, PlaylistSetupObject } from '../../redux-flow/store/Playlists/Setup/types';

export interface SetupComponentProps {
    folderData: FoldersInfos;
    playlistData: PlaylistSetupObject;
    playlistDataState: PlaylistSetupState;
    getPlaylistSetup: Function;
    getFolderContent: Function;
    savePlaylistSetup: Function;
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
        <>
            <PlaylistsTabs playlistId={playlistId} />
            { (props.folderData && props.playlistDataState[playlistId]) ? 
                <div className='flex flex-column'>
                    <SetupPage {...props}  playlistData={props.playlistDataState[playlistId]}/>
                </div>
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        playlistDataState: state.playlist.setup
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistSetup: (playlistId: string) => {
            dispatch(getPlaylistSetupAction(playlistId))
        },
        getFolderContent: (folderPath: string, callback?: Function) => {
            dispatch(getFolderContentAction(folderPath, callback));
        },
        savePlaylistSetup: (playlistData: PlaylistSetupObject, playlistId: string, callback?: Function) => {
            dispatch(postPlaylistSetupAction(playlistData, playlistId)).then(callback)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
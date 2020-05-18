import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getPlaylistDetailsAction, editPlaylistDetailsAction, getUploadUrlAction, uploadFileAction, deleteFileAction } from '../../redux-flow/store/Playlists/General/actions';
import { connect } from 'react-redux';
import { PlaylistDetails, PlaylistDetailsState } from '../../redux-flow/store/Playlists/General/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { PlaylistGeneralPage } from '../../pages/Playlist/General/General';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';


interface GeneralProps {
    playlistDetails: PlaylistDetails;
    playlistDetailsState: PlaylistDetailsState;
    editPlaylistDetails: Function;
    getPlaylistDetails: Function;
    getUploadUrl: Function;
    uploadFile: Function;
    deleteFile: Function;
    showToast: Function;
}

const GeneralPlaylist = (props: GeneralProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        props.getPlaylistDetails(playlistId);
    }, [])

    return (
        props.playlistDetailsState[playlistId] ?
            (
                <div className='flex flex-column'>
                    <PlaylistsTabs playlistId={playlistId} />
                    <PlaylistGeneralPage playlistDetails={props.playlistDetailsState[playlistId]} {...props} />
                </div>            
            )
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistDetailsState: state.playlist.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistDetails: (playlistId: string) => {
            dispatch(getPlaylistDetailsAction(playlistId));
        },
        editPlaylistDetails: (data: PlaylistDetails) => {
            dispatch(editPlaylistDetailsAction(data));
        },
        getUploadUrl: (uploadType: string, playlistId: string, callback: Function) => {
            dispatch(getUploadUrlAction(uploadType, playlistId)).then(callback)
        },
        uploadFile: (data: File, uploadUrl: string) => {
            dispatch(uploadFileAction(data, uploadUrl))
        },
        deleteFile: (liveId: string, targetId: string) => {
            dispatch(deleteFileAction(liveId, targetId))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralPlaylist);
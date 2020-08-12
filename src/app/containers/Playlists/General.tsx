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
import { ContentGeneralPage } from '../../shared/General/ContentGeneral';
import { ContentDetails, ContentDetailsState } from '../../redux-flow/store/VOD/General/types';


export interface PlaylistGeneralProps {
    playlistDetails: ContentDetails;
    playlistDetailsState: ContentDetailsState;
    editPlaylistDetails: (data: ContentDetails) => Promise<void>;
    getPlaylistDetails: (playlistId: string) => Promise<void>;
    getUploadUrl: (uploadType: string, playlistId: string, extension: string) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string, playlistId: string, uploadType: string) => Promise<void>;
    deleteFile: (playlistId: string, targetId: string, uploadType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const GeneralPlaylist = (props: PlaylistGeneralProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        props.getPlaylistDetails(playlistId);
    }, [])

    return (
        <>
            <PlaylistsTabs playlistId={playlistId} />
            { props.playlistDetailsState[playlistId] ?
                (
                    <div className='flex flex-column'>
                        <ContentGeneralPage
                            contentType="playlist" 
                            contentDetails={props.playlistDetailsState[playlistId]}
                            getContentDetails={props.getPlaylistDetails}
                            saveContentDetails={props.editPlaylistDetails}
                            getUploadUrl={props.getUploadUrl}
                            uploadFile={props.uploadFile}
                            deleteFile={props.deleteFile}
                            showToast={props.showToast}
                        />
                    </div>            
                )
                : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistDetailsState: state.playlist.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistDetails: async (playlistId: string) => {
            await dispatch(getPlaylistDetailsAction(playlistId))
        },
        editPlaylistDetails: async (data: PlaylistDetails) => {
            await dispatch(editPlaylistDetailsAction(data))
        },
        getUploadUrl: async (uploadType: string, playlistId: string, extension: string) => {
            await dispatch(getUploadUrlAction(uploadType, playlistId, extension))
        },
        uploadFile: async (data: File, uploadUrl: string, playlistId: string, uploadType: string) => {
            await dispatch(uploadFileAction(data, uploadUrl, playlistId, uploadType))
        },
        deleteFile: async (liveId: string, targetId: string, uploadType: string) => {
            await dispatch(deleteFileAction(liveId, targetId, uploadType))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralPlaylist);
import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getPlaylistEngagementSettingsAction, Action, savePlaylistEngagementSettingsAction, savePlaylistAdAction, createPlaylistAdAction, deletePlaylistAdAction, getUploadUrlAction, uploadPlaylistImageAction, deletePlaylistImageAction } from '../../redux-flow/store/Playlists/Engagement/actions';
import { Ad, ContentEngagementSettings, ContentEngagementSettingsState, InteractionsInfos } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';
import { getSettingsInteractionsInfosAction } from '../../redux-flow/store/Settings/Interactions';

export interface PlaylistEngagementComponentProps {
    playlistEngagementSettingsState: ContentEngagementSettingsState;
    getPlaylistEngagementSettings: (playlistId: string) => Promise<void>;
    savePlaylistEngagementSettings: (data: ContentEngagementSettings) => Promise<void>;
    savePlaylistAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    createPlaylistAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    deletePlaylistAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    getUploadUrl: (uploadType: string, contentId: string) => Promise<void>;
    uploadPlaylistImage: (data: File, uploadUrl: string) => Promise<void>;
    deletePlaylistImage: (targetId: string) => Promise<void>;
    globalEngagementSettings: InteractionsInfos;
    getGlobalEngagementSettings: () => Promise<void>;
}

export const PlaylistEngagement = (props: PlaylistEngagementComponentProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        if (!props.playlistEngagementSettingsState) {
            props.getPlaylistEngagementSettings(playlistId);
        }
        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()
        }
    }, []);

    return (

        <>
            <PlaylistsTabs playlistId={playlistId} />
            {props.playlistEngagementSettingsState  && props.globalEngagementSettings ?
                <div className='flex flex-column'>
                    <ContentEngagementPage 
                        contentEngagementSettings={props.playlistEngagementSettingsState[playlistId]}
                        getContentEngagementSettings={props.getPlaylistEngagementSettings}
                        saveContentEngagementSettings={props.savePlaylistEngagementSettings}
                        saveContentAd={props.savePlaylistAd}
                        createContentAd={props.createPlaylistAd}
                        deleteContentAd={props.deletePlaylistAd}
                        getUploadUrl={props.getUploadUrl}
                        uploadContentImage={props.uploadPlaylistImage}
                        deleteContentImage={props.deletePlaylistImage}
                        contentType='playlist'
                        contentId={playlistId}
                        globalEngagementSettings={props.globalEngagementSettings}
                    />            
                </div>
                : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistEngagementSettingsState: state.playlist.engagement,
        globalEngagementSettings: state.settings.interactions
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getGlobalEngagementSettings: async () => {
            await dispatch(getSettingsInteractionsInfosAction());
        },
        getPlaylistEngagementSettings: async (playlistId: string) => {
            await dispatch(getPlaylistEngagementSettingsAction(playlistId));
        },
        savePlaylistEngagementSettings: async (data: ContentEngagementSettings) => {
            await dispatch(savePlaylistEngagementSettingsAction(data))
        },
        savePlaylistAd: async (data: Ad[], adsId: string, playlistId: string) => {
            await dispatch(savePlaylistAdAction(data, adsId, playlistId))
        },
        createPlaylistAd: async (data: Ad[], adsId: string, playlistId: string) => {
            await dispatch(createPlaylistAdAction(data, adsId, playlistId))
        },
        deletePlaylistAd: async (data: Ad[], adsId: string, playlistId: string) => {
            await dispatch(deletePlaylistAdAction(data, adsId, playlistId))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        getUploadUrl: async (uploadType: string, playlistId: string) => {
            await dispatch(getUploadUrlAction(uploadType, playlistId))
        },
        uploadPlaylistImage: async (data: File, uploadUrl: string) => {
            await dispatch(uploadPlaylistImageAction(data, uploadUrl))
        },
        deletePlaylistImage: async (targetId: string) => {
            await dispatch(deletePlaylistImageAction(targetId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEngagement)
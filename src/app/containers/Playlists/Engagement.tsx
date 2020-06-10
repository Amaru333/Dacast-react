import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getPlaylistEngagementSettingsAction, Action, savePlaylistEngagementSettingsAction, savePlaylistAdAction, createPlaylistAdAction, deletePlaylistAdAction } from '../../redux-flow/store/Playlists/Engagement/actions';
import { Ad, ContentEngagementSettings, ContentEngagementSettingsState } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';

export interface PlaylistEngagementComponentProps {
    playlistEngagementSettingsState: ContentEngagementSettingsState;
    getPlaylistEngagementSettings: Function;
    savePlaylistEngagementSettings: Function;
    savePlaylistAd: Function;
    createPlaylistAd: Function;
    deletePlaylistAd: Function;
    showToast: Function;
}

export const PlaylistEngagement = (props: PlaylistEngagementComponentProps) => {

    let { playlistId } = useParams()

    React.useEffect(() => {
        if (!props.playlistEngagementSettingsState) {
            props.getPlaylistEngagementSettings(playlistId);
        }
    }, []);

    return (

        <>
            <PlaylistsTabs playlistId={playlistId} />
            {props.playlistEngagementSettingsState ?
                <div className='flex flex-column'>
                    <ContentEngagementPage 
                        contentEngagementSettings={props.playlistEngagementSettingsState[playlistId]}
                        getContentEngagementSettings={props.getPlaylistEngagementSettings}
                        saveContentEngagementSettings={props.savePlaylistEngagementSettings}
                        saveContentAd={props.savePlaylistAd}
                        createContentAd={props.createPlaylistAd}
                        deleteContentAd={props.deletePlaylistAd}
                        contentType='playlist'
                        contentId={playlistId}
                    />            
                </div>
                : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        playlistEngagementSettingsState: state.playlist.engagement
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPlaylistEngagementSettings: (playlistId: string) => {
            dispatch(getPlaylistEngagementSettingsAction(playlistId));
        },
        savePlaylistEngagementSettings: (data: ContentEngagementSettings, callback?: Function) => {
            dispatch(savePlaylistEngagementSettingsAction(data)).then(callback)
        },
        savePlaylistAd: (data: Ad[], adsId: string, playlistId: string, callback?: Function) => {
            dispatch(savePlaylistAdAction(data, adsId, playlistId)).then(callback)
        },
        createPlaylistAd: (data: Ad[], adsId: string, playlistId: string, callback?: Function) => {
            dispatch(createPlaylistAdAction(data, adsId, playlistId)).then(callback)
        },
        deletePlaylistAd: (data: Ad[], adsId: string, playlistId: string) => {
            dispatch(deletePlaylistAdAction(data, adsId, playlistId))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEngagement)
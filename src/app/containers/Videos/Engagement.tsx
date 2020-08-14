import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Ad, ContentEngagementSettings } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router-dom';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';
import { getSettingsInteractionsInfosAction } from '../../redux-flow/store/Settings/Interactions/actions';
import { ContentEngagementComponentProps } from '../Playlists/Engagement';
import { Action, getContentEngagementSettingsAction, saveContentEngagementSettingsAction, saveContentAdAction, createContentAdAction, deleteContentAdAction, uploadContentImageAction, deleteContentImageAction, getUploadUrlAction } from '../../redux-flow/store/Content/Engagement/actions';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';

export const VodEngagement = (props: ContentEngagementComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()
        }
        props.getContentEngagementSettings(vodId, 'vod');

    }, []);

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.contentEngagementState['vod'] && props.contentEngagementState['vod'][vodId] && props.globalEngagementSettings?
                    <div className='flex flex-column'>
                        <ContentEngagementPage
                            contentEngagementSettings={props.contentEngagementState['vod'][vodId]}
                            getContentEngagementSettings={props.getContentEngagementSettings}
                            saveContentEngagementSettings={props.saveContentEngagementSettings}
                            saveContentAd={props.saveContentAd}
                            createContentAd={props.createContentAd}
                            deleteContentAd={props.deleteContentAd}
                            getUploadUrl={props.getUploadUrl}
                            uploadContentImage={props.uploadContentImage}
                            deleteContentImage={props.deleteContentImage}
                            contentType='vod'
                            contentId={vodId}
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
        contentEngagementState: state.content.engagement,
        globalEngagementSettings: state.settings.interactions
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getGlobalEngagementSettings: async () => {
            await dispatch(getSettingsInteractionsInfosAction());
        },
        getContentEngagementSettings: async (contentId: string, contentType: string) => {
            await dispatch(getContentEngagementSettingsAction(contentId, contentType));
        },
        saveContentEngagementSettings: async (data: ContentEngagementSettings, contentType: string) => {
            await dispatch(saveContentEngagementSettingsAction(data, contentType))
        },
        saveContentAd: async (data: Ad[], adsId: string, contentId: string, contentType: string) => {
            await dispatch(saveContentAdAction(data, adsId, contentId, contentType))
        },
        createContentAd: async (data: Ad[], adsId: string, contentId: string, contentType: string) => {
            await dispatch(createContentAdAction(data, adsId, contentId, contentType))
        },
        deleteContentAd: async (data: Ad[], adsId: string, contentId: string, contentType: string) => {
            await dispatch(deleteContentAdAction(data, adsId, contentId, contentType))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        getUploadUrl: async (uploadType: string, contentId: string, contentType: string) => {
            await dispatch(getUploadUrlAction(uploadType, contentId, contentType))
        },
        uploadContentImage: async (data: File, uploadUrl: string) => {
            await dispatch(uploadContentImageAction(data, uploadUrl))
        },
        deleteContentImage: async (targetId: string, contentType: string) => {
            await dispatch(deleteContentImageAction(targetId, contentType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VodEngagement)
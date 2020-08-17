import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Ad, ContentEngagementSettings } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';
import { getSettingsInteractionsInfosAction } from '../../redux-flow/store/Settings/Interactions';
import { ContentEngagementComponentProps } from '../Playlists/Engagement';
import { Action, getContentEngagementSettingsAction, saveContentEngagementSettingsAction, lockSectionAction, saveContentAdAction, createContentAdAction, deleteContentAdAction, uploadContentImageAction, deleteContentImageAction, getUploadUrlAction } from '../../redux-flow/store/Content/Engagement/actions';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';


export const LiveEngagement = (props: ContentEngagementComponentProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        props.getContentEngagementSettings(liveId, 'live');
        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()
        }
    }, []);

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.contentEngagementState['live'] && props.contentEngagementState['live'][liveId] && props.globalEngagementSettings ?
                    <div className='flex flex-column'>
                        <ContentEngagementPage
                            contentEngagementSettings={props.contentEngagementState['live'][liveId]}
                            getContentEngagementSettings={props.getContentEngagementSettings}
                            saveContentEngagementSettings={props.saveContentEngagementSettings}
                            lockSection={props.lockSection}
                            saveContentAd={props.saveContentAd}
                            createContentAd={props.createContentAd}
                            deleteContentAd={props.deleteContentAd}
                            getUploadUrl={props.getUploadUrl}
                            uploadContentImage={props.uploadContentImage}
                            deleteContentImage={props.deleteContentImage}
                            contentType='live'
                            contentId={liveId}
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
        lockSection: async (section: string, contentId: string, contentType: string, unlock?: boolean) => {
            await dispatch(lockSectionAction(section, contentId, contentType, unlock))
        },
        saveContentAd: async (data: Ad[], contentId: string, contentType: string) => {
            await dispatch(saveContentAdAction(data, contentId, contentType))
        },
        createContentAd: async (data: Ad[], contentId: string, contentType: string) => {
            await dispatch(createContentAdAction(data, contentId, contentType))
        },
        deleteContentAd: async (data: Ad[], contentId: string, contentType: string) => {
            await dispatch(deleteContentAdAction(data, contentId, contentType))
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
};


export default connect(mapStateToProps, mapDispatchToProps)(LiveEngagement)
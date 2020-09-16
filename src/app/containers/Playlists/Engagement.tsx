import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Ad, ContentEngagementSettings, EngagementInfo } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';
import { getSettingsInteractionsInfosAction } from '../../redux-flow/store/Settings/Interactions';
import { ContentEngagementState } from '../../redux-flow/store/Content/Engagement/types';
import { Action, getContentEngagementSettingsAction, saveContentEngagementSettingsAction, lockSectionAction, saveContentAdAction, createContentAdAction, deleteContentAdAction, uploadContentImageAction, deleteContentImageAction, getUploadUrlAction } from '../../redux-flow/store/Content/Engagement/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface ContentEngagementComponentProps {
    contentEngagementState: ContentEngagementState;
    globalEngagementSettings: EngagementInfo;
    getContentEngagementSettings: (contentId: string, contentType: string) => Promise<void>;
    lockSection: (section: string, contentId: string, contentType: string, unlock?: boolean) => Promise<void>;
    saveContentEngagementSettings: (data: ContentEngagementSettings, contentType: string) => Promise<void>;
    saveContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    createContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    deleteContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    getUploadUrl: (uploadType: string, contentId: string, contentType: string) => Promise<void>;
    uploadContentImage: (data: File, uploadUrl: string) => Promise<void>;
    deleteContentImage: (targetId: string, contentType: string) => Promise<void>;
    getGlobalEngagementSettings: () => Promise<void>;
}

export const PlaylistEngagement = (props: ContentEngagementComponentProps) => {

    let { playlistId } = useParams()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentEngagementSettings(playlistId, 'playlist')
        .catch(() => setNodataFetched(true))

        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()
            .catch(() => setNodataFetched(true))
        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (

        <>
            <PlaylistsTabs playlistId={playlistId} />
            {props.contentEngagementState['playlist'] && props.contentEngagementState['playlist'][playlistId]  && props.globalEngagementSettings ?
                <div className='flex flex-column'>
                    <ContentEngagementPage 
                        contentEngagementSettings={props.contentEngagementState['playlist'][playlistId]}
                        getContentEngagementSettings={props.getContentEngagementSettings}
                        saveContentEngagementSettings={props.saveContentEngagementSettings}
                        lockSection={props.lockSection}
                        saveContentAd={props.saveContentAd}
                        createContentAd={props.createContentAd}
                        deleteContentAd={props.deleteContentAd}
                        getUploadUrl={props.getUploadUrl}
                        uploadContentImage={props.uploadContentImage}
                        deleteContentImage={props.deleteContentImage}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEngagement)
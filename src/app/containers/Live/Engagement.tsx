import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Ad, ContentEngagementSettings, EngagementInfo } from '../../redux-flow/store/Settings/Engagement/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { getSettingsEngagementInfosAction } from '../../redux-flow/store/Settings/Engagement';
import { Action, getContentEngagementSettingsAction, saveContentEngagementSettingsAction, lockSectionAction, saveContentAdAction, createContentAdAction, deleteContentAdAction, uploadContentImageAction, deleteContentImageAction, getUploadUrlAction } from '../../redux-flow/store/Content/Engagement/actions';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { ContentEngagementContainerProps, EngagementComponentProps, EngagementSectionsLock } from '../../redux-flow/store/Content/Engagement/types';
import { Bubble } from '../../../components/Bubble/Bubble';
import { IconStyle } from '../../../shared/Common/Icon';
import { userToken } from '../../utils/services/token/tokenService';
import { EngagementAdvertising } from '../../shared/Engagement/Advertising';
import { EngagementBrandImage } from '../../shared/Engagement/BrandImage';
import { EngagementBrandText } from '../../shared/Engagement/BrandText';
import { EngagementEndScreenText } from '../../shared/Engagement/EndScreenText';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ContentType } from '../../redux-flow/store/Common/types';
import { EngagementGoogleAnalytics } from '../../shared/Engagement/GoogleAnalytics';



export const LiveEngagement = (props: ContentEngagementContainerProps) => {

    let { liveId } = useParams<{liveId: string}>()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    const [localEngagementSettings, setLocalEngagementSettings] = React.useState<EngagementInfo>(null)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false)
    const [saveAllButtonLoading, setSaveAllButtonLoading] = React.useState<boolean>(false);

    const componentProps: EngagementComponentProps = {
        globalEngagementSettings: props.globalEngagementSettings,
        localEngagementSettings: localEngagementSettings,
        setLocalEngagementSettings: setLocalEngagementSettings,
        setSettingsEdited: setSettingsEdited,
        lockSection: props.lockSection,
        contentId: liveId,
        contentType: "live",
        saveContentEngagementSettings: props.saveContentEngagementSettings
    }


    React.useEffect(() => {
        props.getContentEngagementSettings(liveId, 'live')
        .catch(() => setNodataFetched(true))

        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()        
            .catch(() => setNodataFetched(true))
        }
    }, [])

    React.useEffect(() => {
        if ((props.contentEngagementState['live'] && props.contentEngagementState['live'][liveId])) {
            setLocalEngagementSettings(props.contentEngagementState['live'][liveId].engagementSettings)
        }
    }, [props.contentEngagementState])

    const handleSubmit = () => {
        setSaveAllButtonLoading(true)
        props.saveContentEngagementSettings({ 
            contentId: liveId, 
            engagementSettings: Object.keys(localEngagementSettings).filter(f => {return localEngagementSettings[f] && !localEngagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: localEngagementSettings[next]}}, {})
        }, 'live').then(() => {
            setSettingsEdited(false)
            setSaveAllButtonLoading(false)
        })
    }

    const revertSettings = () => {
        setLocalEngagementSettings(props.contentEngagementState['live'][liveId].engagementSettings);
    }

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.contentEngagementState['live'] && props.contentEngagementState['live'][liveId] && props.globalEngagementSettings && localEngagementSettings ?
                <div className='flex flex-column'>
                    <Bubble className="flex items-center" type='info'>When the section is locked, the settings are inherited from your Global Engagement Settings. Click the <IconStyle>lock</IconStyle> padlock to override these settings. To revert back to your Global Engagement Settings you can click the padlock again.</Bubble>
                    { userToken.getPrivilege('privilege-advertising') &&
                    <EngagementAdvertising
                        {...componentProps} 
                        deleteAd={props.deleteContentAd}
                        createAd={props.createContentAd}
                        saveAd={props.saveContentAd}
                    />
                    }
                    <EngagementGoogleAnalytics
                        {...componentProps}
                    />
                    <EngagementBrandImage
                        {...componentProps}
                        getUploadUrl={props.getUploadUrl}
                        deleteFile={props.deleteContentImage}
                        uploadBrandImage={props.uploadContentImage}
                        getEngagementSettings={props.getContentEngagementSettings}
                    />
                    <EngagementBrandText
                        {...componentProps}
                    />
                    <EngagementEndScreenText
                        {...componentProps}
                    />
                    {
                        settingsEdited &&
                            <div className="mt1">
                                <Button
                                    isLoading={saveAllButtonLoading}
                                    onClick={() => { handleSubmit()}}
                                >
                                    Save
                                </Button>
                                <Button className="ml2" typeButton="tertiary" onClick={() => revertSettings()}>Discard</Button>
                            </div>
                    }
                </div>
                    : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentEngagementState: state.content.engagement,
        globalEngagementSettings: state.settings.engagement
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getGlobalEngagementSettings: async () => {
            await dispatch(getSettingsEngagementInfosAction(undefined));
        },
        getContentEngagementSettings: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentEngagementSettingsAction(contentType)(contentId));
        },
        saveContentEngagementSettings: async (data: ContentEngagementSettings, contentType: ContentType) => {
            await dispatch(saveContentEngagementSettingsAction(contentType)(data))
        },
        lockSection: async (section: EngagementSectionsLock, contentId: string, contentType: ContentType, unlock?: boolean) => {
            await dispatch(lockSectionAction(contentType)({section: section, contentId: contentId, action: unlock}))
        },
        saveContentAd: async (data: Ad[], contentId: string, contentType: ContentType) => {
            await dispatch(saveContentAdAction(contentType)({ads: data, contentId: contentId}))
        },
        createContentAd: async (data: Ad[], contentId: string, contentType: ContentType) => {
            await dispatch(createContentAdAction(contentType)({ads: data, contentId: contentId}))
        },
        deleteContentAd: async (data: Ad[], contentId: string, contentType: ContentType) => {
            await dispatch(deleteContentAdAction(contentType)({ads: data, contentId: contentId}))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        },
        getUploadUrl: async (contentId: string, contentType: ContentType) => {
            await dispatch(getUploadUrlAction(contentType)(contentId))
        },
        uploadContentImage: async (data: File, uploadUrl: string) => {
            await dispatch(uploadContentImageAction({data: data, uploadUrl: uploadUrl}))
        },
        deleteContentImage: async (targetId: string, contentType: ContentType) => {
            await dispatch(deleteContentImageAction(contentType)(targetId))
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LiveEngagement)
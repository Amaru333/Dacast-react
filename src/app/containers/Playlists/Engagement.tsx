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
import { getSettingsInteractionsInfosAction } from '../../redux-flow/store/Settings/Interactions';
import { ContentEngagementContainerProps, ContentEngagementState, EngagementComponentProps } from '../../redux-flow/store/Content/Engagement/types';
import { Action, getContentEngagementSettingsAction, saveContentEngagementSettingsAction, lockSectionAction, saveContentAdAction, createContentAdAction, deleteContentAdAction, uploadContentImageAction, deleteContentImageAction, getUploadUrlAction } from '../../redux-flow/store/Content/Engagement/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Bubble } from '../../../components/Bubble/Bubble';
import { IconStyle } from '../../../shared/Common/Icon';
import { userToken } from '../../utils/services/token/tokenService';
import { EngagementAdvertising } from '../../shared/Engagement/Advertising';
import { EngagementBrandImage } from '../../shared/Engagement/BrandImage';
import { EngagementBrandText } from '../../shared/Engagement/BrandText';
import { EngagementEndScreenText } from '../../shared/Engagement/EndScreenText';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const PlaylistEngagement = (props: ContentEngagementContainerProps) => {

    let { playlistId } = useParams()
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
        contentId: playlistId,
        contentType: "playlist",
        saveContentEngagementSettings: props.saveContentEngagementSettings
    }

    React.useEffect(() => {
        props.getContentEngagementSettings(playlistId, 'playlist')
        .catch(() => setNodataFetched(true))

        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()
            .catch(() => setNodataFetched(true))
        }
    }, [])

    React.useEffect(() => {
        if ((props.contentEngagementState['playlist'] && props.contentEngagementState['playlist'][playlistId])) {
            setLocalEngagementSettings(props.contentEngagementState['playlist'][playlistId].engagementSettings)
        }
    }, [props.contentEngagementState])

    const handleSubmit = () => {
        setSaveAllButtonLoading(true)
        props.saveContentEngagementSettings({ 
            contentId: playlistId, 
            engagementSettings: Object.keys(localEngagementSettings).filter(f => {return localEngagementSettings[f] && !localEngagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: localEngagementSettings[next]}}, {})
        }, 'playlist').then(() => {
            setSettingsEdited(false)
            setSaveAllButtonLoading(false)
        })
    }

    const revertSettings = () => {
        setLocalEngagementSettings(props.contentEngagementState['playlist'][playlistId].engagementSettings);
    }

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (

        <>
            <PlaylistsTabs playlistId={playlistId} />
            {
            props.contentEngagementState['playlist'] && props.contentEngagementState['playlist'][playlistId] && props.globalEngagementSettings && localEngagementSettings ?
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
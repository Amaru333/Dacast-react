import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Ad, ContentEngagementSettings, EngagementInfo } from '../../redux-flow/store/Settings/Interactions/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router-dom';
import { ContentEngagementPage } from '../../shared/Engagement/ContentEngagement';
import { getSettingsInteractionsInfosAction } from '../../redux-flow/store/Settings/Interactions/actions';
import { ContentEngagementComponentProps } from '../Playlists/Engagement';
import { Action, getContentEngagementSettingsAction, saveContentEngagementSettingsAction, lockSectionAction, saveContentAdAction, createContentAdAction, deleteContentAdAction, uploadContentImageAction, deleteContentImageAction, getUploadUrlAction } from '../../redux-flow/store/Content/Engagement/actions';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Bubble } from '../../../components/Bubble/Bubble';
import { IconStyle } from '../../../shared/Common/Icon';
import { EngagementAdvertising } from '../../shared/Engagement/Advertising';
import { userToken } from '../../utils/services/token/tokenService';
import RealTime from '../Analytics/RealTime';
import { EngagementBrandImage } from '../../shared/Engagement/BrandImage';
import { EngagementBrandText } from '../../shared/Engagement/BrandText';
import { EngagementEndScreenText } from '../../shared/Engagement/EndScreenText';
import { Button } from '../../../components/FormsComponents/Button/Button';

export const VodEngagement = (props: ContentEngagementComponentProps) => {

    let { vodId } = useParams()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    const [localEngagementSettings, setLocalEngagementSettings] = React.useState<EngagementInfo>(null)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false)
    const [saveAllButtonLoading, setSaveAllButtonLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!props.globalEngagementSettings){
            props.getGlobalEngagementSettings()
            .catch(() => setNodataFetched(true))
        }
        if (!localEngagementSettings) {
            props.getContentEngagementSettings(vodId, 'vod')
        .catch(() => setNodataFetched(true))
        }
    }, [])

    React.useEffect(() => {
        if ((props.contentEngagementState['vod'] && props.contentEngagementState['vod'][vodId])) {
            setLocalEngagementSettings(props.contentEngagementState['vod'][vodId].engagementSettings)
        }
    }, [props.contentEngagementState])

    const handleSubmit = () => {
        setSaveAllButtonLoading(true)
        props.saveContentEngagementSettings({ 
            contentId: vodId, 
            engagementSettings: Object.keys(localEngagementSettings).filter(f => {return localEngagementSettings[f] && !localEngagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: localEngagementSettings[next]}}, {})
        }, 'vod').then(() => {
            setSettingsEdited(false)
            setSaveAllButtonLoading(false)
        })
    }

    const revertSettings = () => {
        setLocalEngagementSettings(props.contentEngagementState['vod'][vodId].engagementSettings);
    }


    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.contentEngagementState['vod'] && props.contentEngagementState['vod'][vodId] && props.globalEngagementSettings && localEngagementSettings ?
                    <div className='flex flex-column'>
                        <Bubble className="flex items-center" type='info'>When the section is locked, the settings are inherited from your Global Engagement Settings. Click the <IconStyle>lock</IconStyle> padlock to override these settings. To revert back to your Global Engagement Settings you can click the padlock again.</Bubble>
                        { userToken.getPrivilege('privilege-advertising') &&
                            <EngagementAdvertising 
                            globalEngagementSettings={props.globalEngagementSettings}
                            localEngagementSettings={localEngagementSettings}
                            setLocalEngagementSettings={setLocalEngagementSettings}
                            setSettingsEdited={setSettingsEdited}
                            deleteAd={props.deleteContentAd}
                            createAd={props.createContentAd}
                            saveAd={props.saveContentAd}
                            lockSection={props.lockSection}
                            contentId={vodId}
                            contentType="vod"
                        />
                        }
                        <EngagementBrandImage 
                            globalEngagementSettings={props.globalEngagementSettings}
                            localEngagementSettings={localEngagementSettings}
                            setLocalEngagementSettings={setLocalEngagementSettings}
                            setSettingsEdited={setSettingsEdited}
                            getUploadUrl={props.getUploadUrl}
                            deleteFile={props.deleteContentImage}
                            uploadContentBrandImage={props.uploadContentImage}
                            getEngagementSettings={props.getContentEngagementSettings}
                            lockSection={props.lockSection}
                            contentId={vodId}
                            contentType="vod"
                            saveContentEngagementSettings={props.saveContentEngagementSettings}
                        />
                        <EngagementBrandText
                            globalEngagementSettings={props.globalEngagementSettings}
                            localEngagementSettings={localEngagementSettings}
                            setLocalEngagementSettings={setLocalEngagementSettings}
                            setSettingsEdited={setSettingsEdited}
                            contentId={vodId}
                            contentType="vod"
                            lockSection={props.lockSection}
                            saveContentEngagementSettings={props.saveContentEngagementSettings}
                        />
                        <EngagementEndScreenText 
                            globalEngagementSettings={props.globalEngagementSettings}
                            localEngagementSettings={localEngagementSettings}
                            setLocalEngagementSettings={setLocalEngagementSettings}
                            setSettingsEdited={setSettingsEdited}
                            contentId={vodId}
                            contentType="vod"
                            lockSection={props.lockSection}
                            saveContentEngagementSettings={props.saveContentEngagementSettings}
                        />
                        {/* <ContentEngagementPage
                            contentEngagementSettings={props.contentEngagementState['vod'][vodId]}
                            getContentEngagementSettings={props.getContentEngagementSettings}
                            saveContentEngagementSettings={props.saveContentEngagementSettings}
                            lockSection={props.lockSection}
                            saveContentAd={props.saveContentAd}
                            createContentAd={props.createContentAd}
                            deleteContentAd={props.deleteContentAd}
                            getUploadUrl={props.getUploadUrl}
                            uploadContentImage={props.uploadContentImage}
                            deleteContentImage={props.deleteContentImage}
                            contentType='vod'
                            contentId={vodId}
                            globalEngagementSettings={props.globalEngagementSettings}
                        /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(VodEngagement)
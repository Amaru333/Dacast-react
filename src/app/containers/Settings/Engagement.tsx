import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getSettingsEngagementInfosAction, Action, EngagementInfo, saveSettingsEngagementInfosAction, Ad, saveAdAction, createAdAction, deleteAdAction, getUploadUrlAction, uploadFileAction, deleteFileAction } from '../../redux-flow/store/Settings/Engagement';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Bubble } from '../../../components/Bubble/Bubble';
import { EngagementAdvertising } from '../../shared/Engagement/Advertising';
import { userToken } from '../../utils/services/token/tokenService';
import { EngagementBrandImage } from '../../shared/Engagement/BrandImage';
import { EngagementBrandText } from '../../shared/Engagement/BrandText';
import { EngagementEndScreenText } from '../../shared/Engagement/EndScreenText';
import { EngagementGoogleAnalytics } from '../../shared/Engagement/GoogleAnalytics';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { EngagementComponentProps } from '../../redux-flow/store/Content/Engagement/types';


export interface SettingsEngagementContainerProps {
    engagementSettings: EngagementInfo;
    getEngagementSettings: () => Promise<void>;
    saveEngagementSettings: (data: EngagementInfo) => Promise<void>;
    saveAd: (data: Ad[]) => Promise<void>;
    createAd: (data: Ad[]) => Promise<void>;
    deleteAd: (data: Ad[]) => Promise<void>;
    getUploadUrl: () => Promise<void>;
    uploadFile: (data: File, uploadUrl: string) => Promise<void>;
    deleteFile: () => Promise<void>;
}


const SettingsEngagement = (props: SettingsEngagementContainerProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    const [localEngagementSettings, setLocalEngagementSettings] = React.useState<EngagementInfo>(props.engagementSettings)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false)

    const componentProps: EngagementComponentProps = {
        globalEngagementSettings: props.engagementSettings,
        localEngagementSettings: localEngagementSettings,
        setLocalEngagementSettings: setLocalEngagementSettings,
        setSettingsEdited: setSettingsEdited,
    }

    React.useEffect(() => {
        props.getEngagementSettings()
        .catch(() => setNodataFetched(true))

    }, [])

    React.useEffect(() => {
        if(props.engagementSettings) {
            setLocalEngagementSettings(props.engagementSettings)
        }
    }, [props.engagementSettings])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        props.engagementSettings && localEngagementSettings ?
            <React.Fragment>
                <Bubble type='info'>These global settings can be overidden at content level (Video, Live Stream etc.)</Bubble>
                { userToken.getPrivilege('privilege-advertising') &&
                    <EngagementAdvertising
                        {...componentProps}
                        deleteAd={props.deleteAd}
                        createAd={props.createAd}
                        saveAd={props.saveAd} 
                    />
                }
                <EngagementGoogleAnalytics
                    {...componentProps}
                />
                <EngagementBrandImage 
                    {...componentProps}
                    deleteFile={props.deleteFile}
                    uploadBrandImage={props.uploadFile}
                    getEngagementSettings={props.getEngagementSettings}
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
                        <Button onClick={() => { props.saveEngagementSettings(localEngagementSettings); setSettingsEdited(false) }}>Save</Button>
                        <Button className="ml2" typeButton="tertiary" onClick={() => { setLocalEngagementSettings(props.engagementSettings); setSettingsEdited(false) }}>Discard</Button>
                    </div>
            }
            </React.Fragment>
            
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        engagementSettings: state.settings.engagement
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getEngagementSettings: async () => {
            await dispatch(getSettingsEngagementInfosAction(undefined));
        },
        saveEngagementSettings: async (data: EngagementInfo) => {
            await dispatch(saveSettingsEngagementInfosAction(data))
        },
        saveAd: async (data: Ad[]) => {
           await dispatch(saveAdAction(data))
        },
        createAd: async (data: Ad[]) => {
            await dispatch(createAdAction(data))
        },
        deleteAd: async (data: Ad[]) => {
            await dispatch(deleteAdAction(data))
        },
        getUploadUrl: async () => {
            await dispatch(getUploadUrlAction(undefined))
        },
        uploadFile: async (data: File, uploadUrl: string) => {
            await dispatch(uploadFileAction({data: data, uploadUrl: uploadUrl}))
        },
        deleteFile: async () => {
            await dispatch(deleteFileAction(undefined))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEngagement)

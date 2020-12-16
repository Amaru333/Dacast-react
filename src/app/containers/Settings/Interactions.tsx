import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InteractionsPage } from '../../pages/Settings/Interactions/Interactions';
import { getSettingsInteractionsInfosAction, Action, EngagementInfo, saveSettingsInteractionsInfosAction, Ad, saveAdAction, createAdAction, deleteAdAction, MailCatcher, saveMailCatcherAction, createMailCatcherAction, deleteMailCatcherAction, getUploadUrlAction, uploadFileAction, deleteFileAction } from '../../redux-flow/store/Settings/Interactions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Bubble } from '../../../components/Bubble/Bubble';
import { EngagementAdvertising } from '../../shared/Engagement/Advertising';
import { userToken } from '../../utils/services/token/tokenService';
import { EngagementBrandImage } from '../../shared/Engagement/BrandImage';
import { EngagementBrandText } from '../../shared/Engagement/BrandText';
import { EngagementEndScreenText } from '../../shared/Engagement/EndScreenText';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { EngagementComponentProps } from '../../redux-flow/store/Content/Engagement/types';


export interface SettingsInteractionComponentProps {
    interactionsInfos: EngagementInfo;
    getInteractionsInfos: () => Promise<void>;
    saveInteractionsInfos: (data: EngagementInfo) => Promise<void>;
    saveAd: (data: Ad[]) => Promise<void>;
    createAd: (data: Ad[]) => Promise<void>;
    deleteAd: (data: Ad[]) => Promise<void>;
    saveMailCatcher: Function;
    createMailCatcher: Function;
    deleteMailCatcher: Function;
    getUploadUrl: (uploadType: string) => Promise<void>;
    uploadFile: (data: File, uploadUrl: string) => Promise<void>;
    deleteFile: () => Promise<void>;
}


const Interactions = (props: SettingsInteractionComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    const [localEngagementSettings, setLocalEngagementSettings] = React.useState<EngagementInfo>(props.interactionsInfos)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false)

    const componentProps: EngagementComponentProps = {
        globalEngagementSettings: props.interactionsInfos,
        localEngagementSettings: localEngagementSettings,
        setLocalEngagementSettings: setLocalEngagementSettings,
        setSettingsEdited: setSettingsEdited,
    }

    React.useEffect(() => {
        props.getInteractionsInfos()
        .catch(() => setNodataFetched(true))

    }, [])

    React.useEffect(() => {
        if(props.interactionsInfos) {
            setLocalEngagementSettings(props.interactionsInfos)
        }
    }, [props.interactionsInfos])

    React.useEffect(() => {
        console.log("local engagement settings", localEngagementSettings)
    }, [localEngagementSettings])



    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        props.interactionsInfos && localEngagementSettings ?
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
                <EngagementBrandImage 
                    {...componentProps}
                    deleteFile={props.deleteFile}
                    uploadBrandImage={props.uploadFile}
                    getEngagementSettings={props.getInteractionsInfos}
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
                        <Button onClick={() => { props.saveInteractionsInfos(localEngagementSettings); setSettingsEdited(false) }}>Save</Button>
                        <Button className="ml2" typeButton="tertiary" onClick={() => { setLocalEngagementSettings(props.interactionsInfos); setSettingsEdited(false) }}>Discard</Button>
                    </div>
            }
                {/* <InteractionsPage {...props} />  */}
            </React.Fragment>
            
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        interactionsInfos: state.settings.interactions
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getInteractionsInfos: async () => {
            await dispatch(getSettingsInteractionsInfosAction(undefined));
        },
        saveInteractionsInfos: async (data: EngagementInfo) => {
            await dispatch(saveSettingsInteractionsInfosAction(data))
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
        getUploadUrl: async (uploadType: string) => {
            await dispatch(getUploadUrlAction(uploadType))
        },
        uploadFile: async (data: File, uploadUrl: string) => {
            await dispatch(uploadFileAction({data: data, uploadUrl: uploadUrl}))
        },
        deleteFile: async () => {
            await dispatch(deleteFileAction(undefined))
        },
        saveMailCatcher: (data: MailCatcher) => {
            dispatch(saveMailCatcherAction(data))
        },
        createMailCatcher: (data: MailCatcher) => {
            dispatch(createMailCatcherAction(data))
        },
        deleteMailCatcher: (data: MailCatcher) => {
            dispatch(deleteMailCatcherAction(data))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Interactions)

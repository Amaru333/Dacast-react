import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InteractionsPage } from '../../pages/Settings/Interactions/Interactions';
import { getSettingsInteractionsInfosAction, Action, EngagementInfo, saveSettingsInteractionsInfosAction, Ad, saveAdAction, createAdAction, deleteAdAction, MailCatcher, saveMailCatcherAction, createMailCatcherAction, deleteMailCatcherAction, getUploadUrlAction, uploadFileAction, deleteFileAction } from '../../redux-flow/store/Settings/Interactions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

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
    deleteFile: (targetId: string) => Promise<void>;
}


const Interactions = (props: SettingsInteractionComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getInteractionsInfos()
        .catch(() => setNodataFetched(true))

    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        props.interactionsInfos ?
            <InteractionsPage {...props} />
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
            await dispatch(getSettingsInteractionsInfosAction());
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
            await dispatch(uploadFileAction(data, uploadUrl))
        },
        deleteFile: async (targetId: string) => {
            await dispatch(deleteFileAction(targetId))
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

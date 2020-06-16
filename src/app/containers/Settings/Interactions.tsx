import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InteractionsPage } from '../../pages/Settings/Interactions/Interactions';
import { getSettingsInteractionsInfosAction, Action, InteractionsInfos, saveSettingsInteractionsInfosAction, Ad, saveAdAction, createAdAction, deleteAdAction, MailCatcher, saveMailCatcherAction, createMailCatcherAction, deleteMailCatcherAction, getUploadUrlAction, uploadFileAction, deleteFileAction } from '../../redux-flow/store/Settings/Interactions';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface SettingsInteractionComponentProps {
    interactionsInfos: InteractionsInfos;
    getInteractionsInfos: Function;
    saveInteractionsInfos: Function;
    saveAd: Function;
    createAd: Function;
    deleteAd: Function;
    saveMailCatcher: Function;
    createMailCatcher: Function;
    deleteMailCatcher: Function;
    getUploadUrl: Function;
    uploadFile: Function;
    deleteFile: Function;
}


const Interactions = (props: SettingsInteractionComponentProps) => {

    React.useEffect(() => {
        if(!props.interactionsInfos) {
            props.getInteractionsInfos();
        }
    }, []);

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
        getInteractionsInfos: () => {
            dispatch(getSettingsInteractionsInfosAction());
        },
        saveInteractionsInfos: (data: InteractionsInfos) => {
            dispatch(saveSettingsInteractionsInfosAction(data))
        },
        saveAd: (data: Ad[], adsId: string) => {
            dispatch(saveAdAction(data, adsId))
        },
        createAd: (data: Ad[], adsId: string) => {
            dispatch(createAdAction(data, adsId))
        },
        deleteAd: (data: Ad[], adsId: string) => {
            dispatch(deleteAdAction(data, adsId))
        },
        getUploadUrl: (uploadType: string, callback: Function) => {
            dispatch(getUploadUrlAction(uploadType)).then(callback)
        },
        uploadFile: (data: File, uploadUrl: string) => {
            dispatch(uploadFileAction(data, uploadUrl))
        },
        deleteFile: (targetId: string) => {
            dispatch(deleteFileAction(targetId))
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

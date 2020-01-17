import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InteractionsPage } from '../../pages/Settings/Interactions/Interactions';
import { getSettingsInteractionsInfosAction, Action, InteractionsInfos, saveSettingsInteractionsInfosAction, Ad, saveAdAction, createAdAction, deleteAdAction, MailCatcher, saveMailCatcherAction, createMailCatcherAction, deleteMailCatcherAction } from '../../redux-flow/store/Settings/Interactions';

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
            : <LoadingSpinner size='medium' color='overlay70' />
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
        saveAd: (data: Ad) => {
            dispatch(saveAdAction(data))
        },
        createAd: (data: Ad) => {
            dispatch(createAdAction(data))
        },
        deleteAd: (data: Ad) => {
            dispatch(deleteAdAction(data))
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

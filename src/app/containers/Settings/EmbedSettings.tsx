import * as React from 'react'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../../redux-flow/store";
import { Action, EmbedSettingsOptionType, getEmbedSettingsOptionsAction, saveEmbedSettingsOptionsAction } from "../../redux-flow/store/Settings/EmbedSettings";
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { EmbedSettingsPage } from '../../pages/Settings/Embed/EmbedSettings';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface EmbedSettingsComponentProps {
    embedSettingsOption: EmbedSettingsOptionType;
    getEmbedSettingsOptions: Function;
    saveEmbedSettingsOptions: Function;
}

const EmbedSettings = (props: EmbedSettingsComponentProps) => {

    React.useEffect(() => {
        if(!props.embedSettingsOption) {
            props.getEmbedSettingsOptions();
        }
    }, [])

    return (
        !props.embedSettingsOption ? 
            <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
            :
            <EmbedSettingsPage {...props} />
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        embedSettingsOption: state.settings.embedSettings
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getEmbedSettingsOptions: () => {
            dispatch(getEmbedSettingsOptionsAction());
        },
        saveEmbedSettingsOptions: (data: EmbedSettingsOptionType, callback?:Function) => {
            dispatch(saveEmbedSettingsOptionsAction(data)).then(callback)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmbedSettings);

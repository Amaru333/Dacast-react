import * as React from 'react'
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../../redux-flow/store";
import { Action, EmbedSettingsOptionType, getEmbedSettingsOptionsAction, saveEmbedSettingsOptionsAction } from "../../redux-flow/store/Settings/EmbedSettings";
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { EmbedSettingsPage } from '../../pages/Settings/Embed/EmbedSettings';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface EmbedSettingsComponentProps {
    embedSettingsOption: EmbedSettingsOptionType;
    getEmbedSettingsOptions: () => Promise<void>
    saveEmbedSettingsOptions: (data: EmbedSettingsOptionType) => Promise<void>
}

const EmbedSettings = (props: EmbedSettingsComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getEmbedSettingsOptions()
        .catch(() => setNodataFetched(true))

    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

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
        getEmbedSettingsOptions: async () => {
            await dispatch(getEmbedSettingsOptionsAction());
        },
        saveEmbedSettingsOptions: async (data: EmbedSettingsOptionType) => {
            await dispatch(saveEmbedSettingsOptionsAction(data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmbedSettings);

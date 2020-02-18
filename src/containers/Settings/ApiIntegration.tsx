import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { ApplicationState } from "../../redux-flow/store";
import { Action, getSettingsIntegrationAction} from "../../redux-flow/store/Settings/ApiIntegration";
import React from 'react';

import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApiIntegrationPage, ApiIntegrationProps } from '../../pages/Settings/ApiIntegration/ApiIntegration';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

const ApiIntegration = (props: ApiIntegrationProps) => {
    
    React.useEffect(() => {
        if(!props.infos) {
            props.getSettingsIntegrationAction();
        }
    }, [])

    if(props.infos) {
        return (
            <ApiIntegrationPage {...props} />
        )
    } else {
        return <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="large" color="violet" /></SpinnerContainer>
    }

}

export function mapStateToProps( state: ApplicationState) {
    return {
        infos: state.settings.apiIntegration
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getSettingsIntegrationAction: () => {
            dispatch(getSettingsIntegrationAction());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiIntegration);


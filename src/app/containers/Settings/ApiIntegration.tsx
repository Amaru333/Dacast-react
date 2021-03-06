import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { ApplicationState } from "../../redux-flow/store";
import { Action, ApiKeyItem, createApiKeyAction, deleteApiKeyAction, getApiKeysAction, regenerateApiKeyAction, updateApiKeyAction} from "../../redux-flow/store/Settings/ApiIntegration";
import React from 'react';

import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApiIntegrationPage, ApiIntegrationProps } from '../../pages/Settings/ApiIntegration/ApiIntegration';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

const ApiIntegration = (props: ApiIntegrationProps) => {
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(!props.infos) {
            props.getApiKeys()
            .then(() => console.log('test'))
            .catch(() => setNodataFetched(true))

        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    if(props.infos) {
        return (
            <ApiIntegrationPage {...props} />
        )
    } else {
        return <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
    }

}

export function mapStateToProps( state: ApplicationState) {
    return {
        infos: state.settings.apiIntegration
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getApiKeys: async () => {
            await dispatch(getApiKeysAction(undefined));
        },
        createApiKey: async (key: ApiKeyItem) => {
            await dispatch(createApiKeyAction(key));
        },
        updateApiKey: async (key: ApiKeyItem) => {
            await dispatch(updateApiKeyAction(key));
        },
        deleteApiKey: async (key: string) => {
            await dispatch(deleteApiKeyAction(key));
        },
        regenerateApiKey: async (key: string) => {
            await dispatch(regenerateApiKeyAction(key));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiIntegration);


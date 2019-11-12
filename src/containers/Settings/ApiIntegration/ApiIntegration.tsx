import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { ApplicationState } from "../../../redux-flow/store";
import { Action, getSettingsIntegrationAction, ApiIntegrationPageInfos } from "../../../redux-flow/store/Settings/ApiIntegration";
import React from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';


export interface ApiIntegrationProps {
    infos: false | ApiIntegrationPageInfos;
    getSettingsIntegrationAction: Function;
}

const ApiIntegration = (props: ApiIntegrationProps) => {

    const [postApiKeyModalOpened, setPostApiKeyModalOpened] = React.useState<boolean>(false);

    React.useEffect(() => {
        if(!props.infos) {
            props.getSettingsIntegrationAction();
        }
    }, [])

    console.log(props, "props");
    return (
        <>
            <Card className='clearfix p2 col-12'>
                <Text size={20} weight="med" color="gray-1" >API Key</Text>
                <Text size={14} weight="reg" color="gray-1" >Prior to using or testing the API, you have to generate an API key. Please click the button below to generate a key attached to your account. This key will authenticate your api requests on the Dacast platform.</Text>

            </Card>
            <Modal title="Ma modal" toggle={() => setPostApiKeyModalOpened(!postApiKeyModalOpened)} size="large" opened={postApiKeyModalOpened} > Hello </Modal>
        </>
    )


}
export function mapStateToProps( state: ApplicationState) {
    return {
        infos: state.settings.data.apiIntegration
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


import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { ApplicationState } from "../../../redux-flow/store";
import { Action, getSettingsIntegrationAction, ApiIntegrationPageInfos, ApiKeyItem, EncoderKeyItem } from "../../../redux-flow/store/Settings/ApiIntegration";
import React from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Table } from '../../../components/Table/Table';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { tsToLocaleDate } from '../../../utils/utils';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

import styled, { css } from "styled-components";
import { ApiKeysForm, EncoderKeysForm } from './ModalsFormsKeys';

export interface ApiIntegrationProps {
    infos: false | ApiIntegrationPageInfos;
    getSettingsIntegrationAction: Function;
}

const ApiIntegration = (props: ApiIntegrationProps) => {

    //** Api Keys states */
    const [postApiKeyModalOpened, setPostApiKeyModalOpened] = React.useState<boolean>(false);
    const [putApiKeyModalOpened, setPutApiKeyModalOpened] = React.useState<boolean>(false);
    const [selectedEditApiKey, setSelectedEditApiKey] = React.useState<ApiKeyItem | false>(false);

    //** Encoding Keys states */
    const [postEncoderKeyModalOpened, setPostEncoderKeyModalOpened] = React.useState<boolean>(false);
    const [putEncoderKeyModalOpened, setPutEncoderKeyModalOpened] = React.useState<boolean>(false);
    const [selectedEditEncoderKey, setSelectedEditEncoderKey] = React.useState<EncoderKeyItem | false>(false);

    React.useEffect(() => {
        if(!props.infos) {
            props.getSettingsIntegrationAction();
        }
    }, [])

    const editApiKeyItem = (item: ApiKeyItem) => {
        setSelectedEditApiKey(item);
        setPutApiKeyModalOpened(true);
    }
    const editEncoderKeyItem = (item: EncoderKeyItem) => {
        setSelectedEditEncoderKey(item);
        setPutEncoderKeyModalOpened(true);
    }
    
    const apiKeyBodyElement= () => {
        if(props.infos) {
            return props.infos.apiKeys.map((value, key) => {
                return [
                    <Text size={14}  weight="reg" color="gray-1">{value.label}</Text>,
                    <Text size={14}  weight="reg" color="gray-1">{value.clientId}</Text>,
                    <Text size={14}  weight="reg" color="gray-1">{value.authToken}</Text>,
                    <Text size={14}  weight="reg" color="gray-1">{value.type === 'ro' ? 'Read-Only' : 'Read-Write' }</Text>,
                    <Text size={14}  weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <IconContainer><Icon>delete</Icon><Icon onClick={() => { editApiKeyItem(value) }} >edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const apiKeyHeaderElement= () => {
        return[
            <Text size={14}  weight="med" color="gray-1">Name</Text>,
            <Text size={14}  weight="med" color="gray-1">ID</Text>,
            <Text size={14}  weight="med" color="gray-1">Token</Text>,
            <Text size={14}  weight="med" color="gray-1">Type</Text>,
            <Text size={14}  weight="med" color="gray-1">Created</Text>,
            <Button className="right mr2" sizeButton="small" typeButton="secondary" buttonColor="blue" onClick={() => setPostApiKeyModalOpened(true)}>New API Key</Button>
        ]
    }

    const encoderKeyBodyElement= () => {
        if(props.infos) {
            return props.infos.encoderKeys.map((value, key) => {
                return [
                    <Text size={14}  weight="reg" color="gray-1">{value.encoder}</Text>,
                    <Text size={14}  weight="reg" color="gray-1">{value.authToken}</Text>,
                    <Text size={14}  weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <IconContainer><Icon >delete</Icon><Icon onClick={() => { editEncoderKeyItem(value) }}>edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const webHooksHeaderElement= () => {
        return[
            <Text size={14}  weight="med" color="gray-1">Url</Text>,
            <Text size={14}  weight="med" color="gray-1">Method</Text>,
            <Button className="right mr2" sizeButton="small" typeButton="secondary" buttonColor="blue">New Webhook</Button>
        ]
    }

    const webHooksBodyElement= () => {
        if(props.infos) {
            return props.infos.webHook.map((value, key) => {
                return [
                    <Text size={14}  weight="reg" color="gray-1">{value.url}</Text>,
                    <Text size={14}  weight="reg" color="gray-1">{value.method}</Text>,
                    <IconContainer><Icon>delete</Icon><Icon>edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const encoderKeyHeaderElement= () => {
        return[
            <Text size={14}  weight="med" color="gray-1">Encoder</Text>,
            <Text size={14}  weight="med" color="gray-1">Key</Text>,
            <Text size={14}  weight="med" color="gray-1">Created</Text>,
            <Button className="right mr2" onClick={() => setPostEncoderKeyModalOpened(true)} sizeButton="small" typeButton="secondary" buttonColor="blue">New Encoding Key</Button>
        ]
    }
    
    
    if(props.infos) {
        return (
            <>
                <Card className='clearfix p2 col-12'>
                    <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >API Key</Text>
                    <Text className="mb3 inline-block" size={14} weight="reg" color="gray-1" >Prior to using or testing the API, you have to generate an API key. Please click the button below to generate a key attached to your account. This key will authenticate your api requests on the Dacast platform.</Text>
                    <Table className="col-12" id="apiKeysTable" header={apiKeyHeaderElement()} body={apiKeyBodyElement()}/>
                    <HrStyle />
                    <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >Encoding Key</Text>
                    <Text className="mb3 inline-block" size={14} weight="reg" color="gray-1" >These keys can be pasted in your encoder settings and will authenticate your list of Dacast live channels. For the Dacast version of OBS Studio please use the OBS Studio key.</Text>
                    <Table className="col-12" id="apiKeysTable" header={encoderKeyHeaderElement()} body={encoderKeyBodyElement()} />
                    <HrStyle />
                    <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >Webhook Settings</Text>
                    <Text className="mb3 inline-block" size={14} weight="reg" color="gray-1" >Send an HTTP request to the URL specified when a video is uploaded. The request body contains information about the video in XML format.</Text>
                    <Table className="col-12" id="apiKeysTable" header={webHooksHeaderElement()} body={webHooksBodyElement()} />
                </Card>
                <Modal title="New API Key" toggle={() => setPostApiKeyModalOpened(!postApiKeyModalOpened)} size="large" opened={postApiKeyModalOpened} > 
                    <ApiKeysForm  toggle={setPostApiKeyModalOpened}/>
                </Modal>
                {selectedEditApiKey ? 
                    <Modal title="Edit API Key" toggle={() => setPutApiKeyModalOpened(!putApiKeyModalOpened)} size="large" opened={putApiKeyModalOpened} > 
                        <ApiKeysForm item={selectedEditApiKey}  toggle={setPutApiKeyModalOpened}/>
                    </Modal> :
                    null
                }
                <Modal title="New Encoding Key" toggle={() => setPostEncoderKeyModalOpened(!postEncoderKeyModalOpened)} size="large" opened={postEncoderKeyModalOpened} > 
                    <ApiKeysForm  toggle={setPostEncoderKeyModalOpened}/>
                </Modal>
                {selectedEditEncoderKey ? 
                    <Modal title="Edit Encoding Key" toggle={() => setPutEncoderKeyModalOpened(!putEncoderKeyModalOpened)} size="large" opened={putEncoderKeyModalOpened} > 
                        <EncoderKeysForm item={selectedEditEncoderKey}  toggle={setPutEncoderKeyModalOpened}/>
                    </Modal> :
                    null
                }
                
            </>
        )
    } else {
        return <LoadingSpinner className="mlauto mrauto" size="large" color="violet" />
    }
    


}

export const HrStyle = styled.hr<{}>`
    height: 1px;
    border: none;
    margin: 32px 0;    
    background-color:  ${props => props.theme.colors["gray-7"]};
`;

export const IconContainer = styled.div`
    float:right;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`

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


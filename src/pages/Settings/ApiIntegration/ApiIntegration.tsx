import { Action, getSettingsIntegrationAction, ApiIntegrationPageInfos, ApiKeyItem, EncoderKeyItem, WebHookItem, S3KeyItem } from "../../../redux-flow/store/Settings/ApiIntegration";
import React from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Table } from '../../../components/Table/Table';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { tsToLocaleDate, useMedia } from '../../../utils/utils';

import styled from "styled-components";
import { ApiKeysForm, EncoderKeysForm, WebHooksForm, S3KeysForm } from './ModalsFormsKeys';
import { DateTime } from 'luxon';
import { Toggle } from '../../../components/Toggle/toggle';
import { Input } from '../../../components/FormsComponents/Input/Input';

export interface ApiIntegrationProps {
    infos: ApiIntegrationPageInfos;
    getSettingsIntegrationAction: Function;
}

export const ApiIntegrationPage = (props: ApiIntegrationProps) => {

    //** Api Keys states */
    const [postApiKeyModalOpened, setPostApiKeyModalOpened] = React.useState<boolean>(false);
    const [putApiKeyModalOpened, setPutApiKeyModalOpened] = React.useState<boolean>(false);
    const [selectedEditApiKey, setSelectedEditApiKey] = React.useState<ApiKeyItem | false>(false);

    //** Encoding Keys states */
    const [postEncoderKeyModalOpened, setPostEncoderKeyModalOpened] = React.useState<boolean>(false);
    const [putEncoderKeyModalOpened, setPutEncoderKeyModalOpened] = React.useState<boolean>(false);
    const [selectedEditEncoderKey, setSelectedEditEncoderKey] = React.useState<EncoderKeyItem | false>(false);

    //** WebHooks Keys states */
    const [postWebHooksModalOpened, setPostWebHooksModalOpened] = React.useState<boolean>(false);
    const [putWebHooksModalOpened, setPutWebHooksModalOpened] = React.useState<boolean>(false);
    const [selectedEditWebHooks, setSelectedEditWebHooks] = React.useState<WebHookItem | false>(false);


    //** S3 Keys states */
    const [postS3KeysModalOpened, setPostS3KeysModalOpened] = React.useState<boolean>(false);
    const [putS3KeysModalOpened, setPutS3KeysModalOpened] = React.useState<boolean>(false);
    const [selectedEditS3Keys, setSelectedEditS3Keys] = React.useState<S3KeyItem | false>(false);

    let smScreen = useMedia('(max-width: 780px)');

    const editApiKeyItem = (item: ApiKeyItem) => {
        setSelectedEditApiKey(item);
        setPutApiKeyModalOpened(true);
    }
    const editEncoderKeyItem = (item: EncoderKeyItem) => {
        setSelectedEditEncoderKey(item);
        setPutEncoderKeyModalOpened(true);
    }

    const editWebHookItem = (item: WebHookItem) => {
        setSelectedEditWebHooks(item);
        setPutWebHooksModalOpened(true);
    }


    const editS3KeyIten = (item: S3KeyItem) => {
        setSelectedEditS3Keys(item);
        setPutS3KeysModalOpened(true);
    }

    const apiKeyBodyElement = () => {
        console.log(props);
        if (props.infos) {
            return props.infos.apiKeys.map((value, key) => {
                return [
                    <Text key={key + value.clientId} size={14} weight="reg" color="gray-1">{value.label}</Text>,
                    <Text key={key + value.clientId} size={14} weight="reg" color="gray-1">{value.clientId}</Text>,
                    <Text key={key + value.clientId} size={14} weight="reg" color="gray-1">{value.authToken}</Text>,
                    <Text key={key + value.clientId} size={14} weight="reg" color="gray-1">{value.type === 'ro' ? 'Read-Only' : 'Read-Write'}</Text>,
                    <Text key={key + value.clientId} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <IconContainer className="iconAction right" key={key + value.clientId}><Icon>delete</Icon><Icon onClick={() => { editApiKeyItem(value) }} >edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const apiKeyHeaderElement = () => {
        return [
            <Text key="nameArrayApiKeys" size={14} weight="med" color="gray-1">Name</Text>,
            <Text key="idArrayApiKeys" size={14} weight="med" color="gray-1">ID</Text>,
            <Text key="tokenArrayApiKeys" size={14} weight="med" color="gray-1">Token</Text>,
            <Text key="typeArrayApiKeys" size={14} weight="med" color="gray-1">Type</Text>,
            <Text key="createdArrayApiKeys" size={14} weight="med" color="gray-1">Created</Text>,
            <Button key="actionArrayApiKeys" className={"right mr2 " + (smScreen ? 'hide' : '')} sizeButton="xs" typeButton="secondary" buttonColor="blue" onClick={() => setPostApiKeyModalOpened(true)}>New API Key</Button>
        ]
    }

    const encoderKeyBodyElement = () => {
        if (props.infos) {
            return props.infos.encoderKeys.map((value, key) => {
                return [
                    <Text key={key + value.created} size={14} weight="reg" color="gray-1">{value.encoder}</Text>,
                    <Text key={key + value.created} size={14} weight="reg" color="gray-1">{value.authToken}</Text>,
                    <Text key={key + value.created} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <IconContainer className="iconAction right" key={key + value.created}><Icon >delete</Icon><Icon onClick={() => { editEncoderKeyItem(value) }}>edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const webHooksHeaderElement = () => {
        return [
            <Text key="urlTableWebHooks" size={14} weight="med" color="gray-1">URL</Text>,
            <Text key="methodTableWebHooks" size={14} weight="med" color="gray-1">Method</Text>,
            <Button key="actionTableWebHooks" onClick={() => setPostWebHooksModalOpened(true)} className={"right mr2 " + (smScreen ? 'hide' : '')} sizeButton="xs" typeButton="secondary" buttonColor="blue">New Webhook</Button>
        ]
    }

    const webHooksBodyElement = () => {
        if (props.infos) {
            return props.infos.webHooks.map((value, key) => {
                return [
                    <Text key={key + value.url} size={14} weight="reg" color="gray-1">{value.url}</Text>,
                    <Text key={key + value.url} size={14} weight="reg" color="gray-1">{value.method}</Text>,
                    <IconContainer className="iconAction right" key={key + value.url}><Icon>delete</Icon><Icon onClick={() => { editWebHookItem(value) }} >edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const encoderKeyHeaderElement = () => {
        return [
            <Text key="encoderTable" size={14} weight="med" color="gray-1">Encoder</Text>,
            <Text key="keyTable" size={14} weight="med" color="gray-1">Key</Text>,
            <Text key="createdTable" size={14} weight="med" color="gray-1">Created</Text>,
            <Button key="actionTable" className={"right mr2 " + (smScreen ? 'hide' : '')} onClick={() => setPostEncoderKeyModalOpened(true)} sizeButton="xs" typeButton="secondary" buttonColor="blue">New Encoding Key</Button>
        ]
    }

    const s3KeyBodyElement = () => {
        if (props.infos) {
            return props.infos.s3Keys.map((value, key) => {
                return [
                    <Text key={key + value.name} size={14} weight="reg" color="gray-1">{value.name}</Text>,
                    <Text key={key + value.created} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                    <Text key={key + value.expires} size={14} weight="reg" color="gray-1">{ tsToLocaleDate(value.expires, DateTime.DATETIME_SHORT)}</Text>,
                    <IconContainer className="iconAction right" key={key + "buttonEdit"}><Icon>delete</Icon><Icon onClick={() => { editS3KeyIten(value) }} >edit</Icon> </IconContainer>
                ]
            })
        }
    }

    const s3KeyHeaderElement = () => {
        return [
            <Text key="encoderTable" size={14} weight="med" color="gray-1">Name</Text>,
            <Text key="keyTable" size={14} weight="med" color="gray-1">Created</Text>,
            <Text key="createdTable" size={14} weight="med" color="gray-1">Expires</Text>,
            <Button key="actionTable" className={"right mr2 " + (smScreen ? 'hide' : '')} onClick={() => setPostS3KeysModalOpened(true)} sizeButton="xs" typeButton="secondary" buttonColor="blue">New S3 Key</Button>
        ]
    }


    return (
        <>
            <Card className='clearfix col-12'>
                <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >API Keys</Text>
                <Text className={"inline-block mb2"} size={14} weight="reg" color="gray-1" >Prior to using or testing the API, you have to generate an API key. Please click the button below to generate a key attached to your account. This key will authenticate your api requests on the Dacast platform.</Text>
                <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                    <Icon className="mr1" >info_outlined</Icon>
                    <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with your API Keys? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                </div>
                <Button className={"mb2 " + (smScreen ? '' : 'hide')} sizeButton="xs" typeButton="secondary" buttonColor="blue" onClick={() => setPostApiKeyModalOpened(true)}>New API Key</Button>
                <Table className="col-12" id="apiKeysTable" header={apiKeyHeaderElement()} body={apiKeyBodyElement()} />
                <HrStyle />
                <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >Webhook Settings</Text>
                <Text className={"inline-block mb2"} size={14} weight="reg" color="gray-1" >Send an HTTP request to the URL specified when a video is uploaded. The request body contains information about the video in XML format.</Text>
                <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                    <Icon className="mr1" >info_outlined</Icon>
                    <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with your Webhook Settings? Visit the <a rel="noopener noreferrer" target="_blank"  href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                </div>
                <Button onClick={() => setPostWebHooksModalOpened(true)} className={"left mb2 " + (smScreen ? '' : 'hide')} sizeButton="xs" typeButton="secondary" buttonColor="blue">New Webhook</Button>
                <Table className="col-12" id="webHooksTable" header={webHooksHeaderElement()} body={webHooksBodyElement()} />
                <HrStyle />
                <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >Encoder Keys</Text>
                <Text className={"inline-block mb2"}  size={14} weight="reg" color="gray-1" >These keys can be pasted into the settings of some video encoders to automatically authenticate your list of Dacast live channels.</Text>
                <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                    <Icon className="mr1" >info_outlined</Icon>
                    <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with your Encoder Keys? Visit the <a rel="noopener noreferrer" target="_blank"  href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                </div>
                <Button className={"left mb2 " + (smScreen ? '' : 'hide')} onClick={() => setPostEncoderKeyModalOpened(true)} sizeButton="xs" typeButton="secondary" buttonColor="blue">New Encoding Key</Button>
                <Table className="col-12" id="encoderKeysTable" header={encoderKeyHeaderElement()} body={encoderKeyBodyElement()} />
                <HrStyle />
                <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >S3 Upload Keys</Text>
                <Text className={"inline-block mb2"}  size={14} weight="reg" color="gray-1" >These keys can be used to upload files to an Amazon S3 (Simple Storage Service) bucket that will then be automatically uploaded to your Dacast account.</Text>
                <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                    <Icon className="mr1" >info_outlined</Icon>
                    <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with your S3 Keys? Visit the <a rel="noopener noreferrer" target="_blank"  href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                </div>
                <Button className={"left mb2 " + (smScreen ? '' : 'hide')} onClick={() => setPostS3KeysModalOpened(true)} sizeButton="xs" typeButton="secondary" buttonColor="blue">New S3 Key</Button>
                <Table className="col-12" id="s3KeysTable" header={s3KeyHeaderElement()} body={s3KeyBodyElement()} />
                <HrStyle />
                <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >Google Analytics</Text>
                <Text className={"inline-block mb2"}  size={14} weight="reg" color="gray-1" >Some text about where to find the Google Analytics number or whatever.</Text>
                <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                    <Icon className="mr1" >info_outlined</Icon>
                    <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with setting up Google Analytics? Visit the <a rel="noopener noreferrer" target="_blank"  href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                </div>
                <Toggle defaultChecked={props.infos.ga.enabled}  label="Google Analytics" className="col col-12 mb2" />
                <Input defaultValue={props.infos.ga.key} disabled={false} id="gaTag" type="text" className="col col-12 mb2" label="Key" placeholder="UA-xxxxxx"  />
            </Card>
            <Modal title="New API Key" toggle={() => setPostApiKeyModalOpened(!postApiKeyModalOpened)} size="small" opened={postApiKeyModalOpened} >
                <ApiKeysForm toggle={setPostApiKeyModalOpened} />
            </Modal>
            {selectedEditApiKey ?
                <Modal title="Edit API Key" toggle={() => setPutApiKeyModalOpened(!putApiKeyModalOpened)} size="small" opened={putApiKeyModalOpened} >
                    <ApiKeysForm item={selectedEditApiKey} toggle={setPutApiKeyModalOpened} />
                </Modal> :
                null
            }
            <Modal title="New Encoding Key" toggle={() => setPostEncoderKeyModalOpened(!postEncoderKeyModalOpened)} size="small" opened={postEncoderKeyModalOpened} >
                <EncoderKeysForm toggle={setPostEncoderKeyModalOpened} />
            </Modal>
            {selectedEditEncoderKey ?
                <Modal title="Edit Encoding Key" toggle={() => setPutEncoderKeyModalOpened(!putEncoderKeyModalOpened)} size="small" opened={putEncoderKeyModalOpened} >
                    <EncoderKeysForm item={selectedEditEncoderKey} toggle={setPutEncoderKeyModalOpened} />
                </Modal> :
                null
            }
            <Modal title="Webhook" toggle={() => setPostWebHooksModalOpened(!postWebHooksModalOpened)} size="small" opened={postWebHooksModalOpened} >
                <WebHooksForm toggle={setPostWebHooksModalOpened} />
            </Modal>
            {selectedEditWebHooks ?
                <Modal title="Edit Webhook" toggle={() => setPutWebHooksModalOpened(!putWebHooksModalOpened)} size="small" opened={putWebHooksModalOpened} >
                    <WebHooksForm item={selectedEditWebHooks} toggle={setPutWebHooksModalOpened} />
                </Modal> :
                null
            }
            <Modal title="New S3 Key" toggle={() => setPostS3KeysModalOpened(!postS3KeysModalOpened)} size="small" opened={postS3KeysModalOpened} >
                <S3KeysForm toggle={setPostS3KeysModalOpened} />
            </Modal>
            {selectedEditS3Keys ?
                <Modal title="Edit S3 Key" toggle={() => setPutS3KeysModalOpened(!putS3KeysModalOpened)} size="small" opened={putS3KeysModalOpened} >
                    <S3KeysForm item={selectedEditS3Keys} toggle={setPutS3KeysModalOpened} />
                </Modal> :
                null
            }
        </>
    )


}

export const HrStyle = styled.hr<{}>`
    height: 1px;
    border: none;
    margin: 32px 0 24px 0;    
    background-color:  ${props => props.theme.colors["gray-7"]};
`;

export const IconContainer = styled.div`
    float:right;
    .material-icons{
        margin-right:16px;
        color:  ${props => props.theme.colors["gray-1"]};
    }
`


import { ApiIntegrationPageInfos, ApiKeyItem, EncoderKeyItem, WebHookItem, S3KeyItem, GaItem } from "../../../redux-flow/store/Settings/ApiIntegration";
import React from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Table } from '../../../../components/Table/Table';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { IconStyle, ActionIcon } from '../../../../shared/Common/Icon';
import { useMedia } from '../../../../utils/utils';
import { tsToLocaleDate } from '../../../../utils/formatUtils';
import { ButtonContainer, ButtonStyle } from "../Embed/EmbedSettings";
import styled from "styled-components";
import { ApiKeysForm, EncoderKeysForm, WebHooksForm, S3KeysForm } from './ModalsFormsKeys';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Label } from '../../../../components/FormsComponents/Label/Label';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { updateClipboard } from '../../../utils/utils';
import { LinkBoxLabel, LinkBox } from '../../../shared/General/GeneralStyle';
import { userToken } from '../../../utils/services/token/tokenService';

export interface ApiIntegrationProps {
    infos: ApiIntegrationPageInfos;
    getApiKeys: () => Promise<void>;
    createApiKey: (apiKey: ApiKeyItem) => Promise<void>;
    updateApiKey: (apiKey: ApiKeyItem) => Promise<void>;
    deleteApiKey: (key: string) => Promise<void>;
    regenerateApiKey: (key: string) => Promise<void>;
}


export const ApiIntegrationPage = (props: ApiIntegrationProps) => {

    const privilegeApi = userToken.getPrivilege('privilege-api');
    const privilegeLive = userToken.getPrivilege('privilege-live');
    const privilegeVod = userToken.getPrivilege('privilege-vod');
    
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
        if (props.infos) {
            return props.infos.apiKeys.map((value, key) => {
                return {
                    data: [
                        <Text key={key + value.clientId} size={14} weight="reg" color="gray-1">{value.label}</Text>,
                        <div className='flex items-center'>
                            <Text className='pr2' key={key + value.clientId} size={14} weight="reg" color="gray-1">{value.authToken}</Text>
                            <ActionIcon className='pointer' id={"editTooltip" + value.authToken}>
                                <IconStyle onClick={() => {updateClipboard(value.authToken, 'Api Key copied')}} className="right mr1" >file_copy_outlined</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"editTooltip" + value.authToken}>Copy to clipboard</Tooltip>
                        </div>,
                        // <Text key={key + value.clientId} size={14} weight="reg" color="gray-1">{value.type === 'ro' ? 'Read-Only' : 'Read-Write'}</Text>,
                        <Text key={key + value.clientId} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                        <IconContainer className="iconAction right" key={key + value.clientId}>
                            <ActionIcon id={"regenerateTooltip" + key}>
                                <IconStyle onClick={() => {props.regenerateApiKey(value.authToken)}}>autorenew</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"regenerateTooltip" + key}>Regenerate</Tooltip>
                            <ActionIcon id={"deleteTooltip" + key}>
                                <IconStyle onClick={() => {props.deleteApiKey(value.authToken)}}>delete</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"deleteTooltip" + key}>Delete</Tooltip>
                            <ActionIcon id={"editTooltip" + key}>
                                <IconStyle onClick={() => { editApiKeyItem(value) }} >edit</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"editTooltip" + key}>Edit</Tooltip>
                        </IconContainer>
                    ]
                }
            })
        }
    }

    const apiKeyHeaderElement = () => {
        return {
            data: [
                { cell: <Text key="nameArrayApiKeys" size={14} weight="med" color="gray-1">Name</Text> },
                { cell: <Text key="tokenArrayApiKeys" size={14} weight="med" color="gray-1">API Key</Text> },
                // { cell: <Text key="typeArrayApiKeys" size={14} weight="med" color="gray-1">Type</Text> },
                { cell: <Text key="createdArrayApiKeys" size={14} weight="med" color="gray-1">Created Date</Text> },
                { cell: <Button key="actionArrayApiKeys" className={"right mr2 " + (smScreen ? 'hide' : '')} sizeButton="xs" typeButton="secondary" buttonColor="blue" onClick={() => setPostApiKeyModalOpened(true)}>New API Key</Button> }
            ]
        }
    }

    const encoderKeyBodyElement = () => {
        if (props.infos) {
            return props.infos.encoderKeys.map((value, key) => {
                return {
                    data: [
                        <Text key={key + value.created} size={14} weight="reg" color="gray-1">{value.encoder}</Text>,
                        <Text key={key + value.created} size={14} weight="reg" color="gray-1">{value.authToken}</Text>,
                        <Text key={key + value.created} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                        <IconContainer className="iconAction" key={key + value.created}>
                            <ActionIcon id={"deleteEncoderTooltip" + key}>
                                <IconStyle>delete</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"deleteEncoderTooltip" + key}>Delete</Tooltip>
                            <ActionIcon id={"editEncoderTooltip" + key}>
                                <IconStyle onClick={() => { editEncoderKeyItem(value) }}>edit</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"editEncoderTooltip" + key}>Edit</Tooltip>
                        </IconContainer>
                    ]
                }
            })
        }
    }

    const webHooksHeaderElement = () => {
        return {
            data: [
                { cell: <Text key="urlTableWebHooks" size={14} weight="med" color="gray-1">URL</Text> },
                { cell: <Text key="methodTableWebHooks" size={14} weight="med" color="gray-1">Method</Text> },
                { cell: <Button key="actionTableWebHooks" onClick={() => setPostWebHooksModalOpened(true)} className={"right mr2 " + (smScreen ? 'hide' : '')} sizeButton="xs" typeButton="secondary" buttonColor="blue">New Webhook</Button> }
            ]
        }
    }

    const webHooksBodyElement = () => {
        if (props.infos) {
            return props.infos.webHooks.map((value, key) => {
                return {
                    data: [
                        <Text key={key + value.url} size={14} weight="reg" color="gray-1">{value.url}</Text>,
                        <Text key={key + value.url} size={14} weight="reg" color="gray-1">{value.method}</Text>,
                        <IconContainer className="iconAction right" key={key + value.url}>
                            <ActionIcon id={"deleteWebhookTooltip" + key}>
                                <IconStyle>delete</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"deleteWebhookTooltip" + key}>Delete</Tooltip>
                            <ActionIcon id={"editWebhookTooltip" + key}>
                                <IconStyle onClick={() => { editWebHookItem(value) }} >edit</IconStyle>
                            </ActionIcon>
                            <Tooltip target={"editWebhookTooltip" + key}>Edit</Tooltip>
                        </IconContainer>
                    ]
                }
            })
        }
    }

    const encoderKeyHeaderElement = () => {
        return {
            data: [
                { cell: <Text key="encoderTable" size={14} weight="med" color="gray-1">Encoder</Text> },
                { cell: <Text key="keyTable" size={14} weight="med" color="gray-1">Key</Text> },
                { cell: <Text key="createdTable" size={14} weight="med" color="gray-1">Created Date</Text> },
                { cell: <Button key="actionTable" className={"right mr2 " + (smScreen ? 'hide' : '')} onClick={() => setPostEncoderKeyModalOpened(true)} sizeButton="xs" typeButton="secondary" buttonColor="blue">New Encoding Key</Button> }
            ]
        }
    }

    const s3KeyBodyElement = () => {
        if (props.infos) {
            return props.infos.s3Keys.map((value, key) => {
                return {
                    data: [
                        <Text key={key + value.name} size={14} weight="reg" color="gray-1">{value.name}</Text>,
                        <Text key={key + value.created} size={14} weight="reg" color="gray-1">{tsToLocaleDate(value.created)}</Text>,
                        <Text key={key + value.expires} size={14} weight="reg" color="gray-1">{Date.now() > value.expires ? <Label label="Expired" size={14} weight="reg" color="red" backgroundColor="red20" /> : tsToLocaleDate(value.expires)}</Text>,
                        <IconContainer className="iconAction right" key={key + "buttonEdit"}>
                            <ActionIcon >
                                <IconStyle>get_app</IconStyle>
                            </ActionIcon>
                            <ActionIcon >
                                <IconStyle>delete</IconStyle>
                            </ActionIcon>
                            <ActionIcon >
                                <IconStyle onClick={() => { editS3KeyIten(value) }} >edit</IconStyle>
                            </ActionIcon>
                        </IconContainer>
                    ]
                }
            })
        }
    }

    const s3KeyHeaderElement = () => {
        return {
            data: [
                { cell: <Text key="encoderTable" size={14} weight="med" color="gray-1">Name</Text> },
                { cell: <Text key="keyTable" size={14} weight="med" color="gray-1">Created Date</Text> },
                { cell: <Text key="createdTable" size={14} weight="med" color="gray-1">Expires</Text> },
                { cell: <Button key="actionTable" className={"right mr2 " + (smScreen ? 'hide' : '')} onClick={() => setPostS3KeysModalOpened(true)} sizeButton="xs" typeButton="secondary" buttonColor="blue">New S3 Key</Button> }
            ]
        }
    }


    return (
        <>
            <Card className='clearfix col-12'>

                { privilegeApi && 
                    <React.Fragment>
                        <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >API Keys</Text>
                        <Text className={"inline-block mb2"} size={14} weight="reg" color="gray-1" >Prior to using or testing the API, you have to generate an API key. Please click the button below to generate a key attached to your account. This key will authenticate your api requests on the Dacast platform.</Text>
                        <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                            <IconStyle className="mr1" >info_outlined</IconStyle>
                            <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with your API Keys? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                        </div>
                        <Button className={(smScreen ? '' : 'hide')} sizeButton="xs" typeButton="secondary" buttonColor="blue" onClick={() => setPostApiKeyModalOpened(true)}>New API Key</Button>
                        <Table className="col-12" id="apiKeysTable" headerBackgroundColor="gray-10" header={apiKeyHeaderElement()} body={apiKeyBodyElement()} />
                        {/* <HrStyle /> */}
                    </React.Fragment>
                }
                {/* {
                    privilegeApi && 
                    <>
                        <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >Webhook Settings</Text>
                        <Text className={"inline-block mb2"} size={14} weight="reg" color="gray-1" >Send an HTTP request to the URL specified when a video is uploaded. The request body contains information about the video in XML format.</Text>
                        <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                            <IconStyle className="mr1" >info_outlined</IconStyle>
                            <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with your Webhook Settings? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                        </div>
                        <Button onClick={() => setPostWebHooksModalOpened(true)} className={"left " + (smScreen ? '' : 'hide')} sizeButton="xs" typeButton="secondary" buttonColor="blue">New Webhook</Button>
                        <Table className="col-12" id="webHooksTable" headerBackgroundColor="gray-10" header={webHooksHeaderElement()} body={webHooksBodyElement()} />
                        <HrStyle />
                    </>
                } */}
                {/* {
                    privilegeLive && 
                    <>
                        <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >Encoder Keys</Text>
                        <Text className={"inline-block mb2"} size={14} weight="reg" color="gray-1" >These keys can be pasted into the settings of some video encoders to automatically authenticate your list of Dacast live channels.</Text>
                        <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                            <IconStyle className="mr1" >info_outlined</IconStyle>
                            <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with your Encoder Keys? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                        </div>
                        <Button className={"left " + (smScreen ? '' : 'hide')} onClick={() => setPostEncoderKeyModalOpened(true)} sizeButton="xs" typeButton="secondary" buttonColor="blue">New Encoding Key</Button>
                        <Table className="col-12" id="encoderKeysTable" headerBackgroundColor="gray-10" header={encoderKeyHeaderElement()} body={encoderKeyBodyElement()} />
                        <HrStyle />
                    </>
                } */}
                {/* {
                    privilegeVod && 
                    <>
                        <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >S3 Upload Keys</Text>
                            <Text className={"inline-block mb2"} size={14} weight="reg" color="gray-1" >These keys can be used to upload files to an Amazon S3 (Simple Storage Service) bucket that will then be automatically uploaded to your Dacast account.</Text>
                            <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                                <IconStyle className="mr1" >info_outlined</IconStyle>
                                <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with your S3 Keys? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                            </div>
                            <Button className={"left " + (smScreen ? '' : 'hide')} onClick={() => setPostS3KeysModalOpened(true)} sizeButton="xs" typeButton="secondary" buttonColor="blue">New S3 Key</Button>
                            <Table className="col-12" id="s3KeysTable" headerBackgroundColor="gray-10" header={s3KeyHeaderElement()} body={s3KeyBodyElement()} />
                            <HrStyle />
                            <Text className="col-12 inline-block mb2" size={20} weight="med" color="gray-1" >FTP</Text>
                            <Text className={"inline-block mb2"} size={14} weight="reg" color="gray-1" >These details can be used to upload files to an FTP (File Transfer Protocol) folder that will then be automatically uploaded to your Dacast account.</Text>
                            <div className={"flex " + (smScreen ? 'mb2' : 'mb25')}>
                                <IconStyle className="mr1" >info_outlined</IconStyle>
                                <Text className={"inline-block"} size={14} weight="reg" color="gray-1" >Need help with setting up FTP? Visit the <a rel="noopener noreferrer" target="_blank" href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                            </div>
                            <div className="clearfix mxn1">
                                <div className={"col col-12 sm-col-4 px1"}>
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">Host</Text>
                                    </LinkBoxLabel>
                                    <LinkBox>
                                        <Text size={14} weight="reg">storage.ftp-auto.dacast.com</Text>
                                        <IconStyle className='pointer' id='host-input-info' onClick={() => updateClipboard('', `Copied`)}>file_copy_outlined</IconStyle>
                                        <Tooltip target={'host-input-info'}>Copy to clipboard</Tooltip>
                                    </LinkBox>
                                </div>
                                <div className={"col col-12 sm-col-4 px1"}>
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">Login</Text>
                                    </LinkBoxLabel>
                                    <LinkBox>
                                        <Text size={14} weight="reg">96941</Text>
                                        <IconStyle className='pointer' id='host-input-info' onClick={() => updateClipboard('', `Copied`)}>file_copy_outlined</IconStyle>
                                        <Tooltip target={'host-input-info'}>Copy to clipboard</Tooltip>
                                    </LinkBox>
                                </div>
                                <div className={"col col-12 sm-col-4 px1"}>
                                    <LinkBoxLabel>
                                        <Text size={14} weight="med">Password</Text>
                                    </LinkBoxLabel>
                                    <LinkBox>
                                        <Text size={14} weight="reg">Use your account password</Text>
                                    </LinkBox>
                                </div>
                            </div>
                            <HrStyle />
                    </>
                } */}
            </Card>
            {/* <ButtonContainer hidden={JSON.stringify(currentStateGa) === JSON.stringify(originalStateGa)} >
                <ButtonStyle typeButton="primary" onClick={() => alert("Post GA Tag")}>Save</ButtonStyle>
                <ButtonStyle onClick={() => setCurrentStateGa(originalStateGa)} typeButton="secondary">Cancel</ButtonStyle>
            </ButtonContainer> */}
            {
                postApiKeyModalOpened &&
                <Modal allowNavigation={false} modalTitle="New API Key" toggle={() => setPostApiKeyModalOpened(!postApiKeyModalOpened)} size="small" opened={postApiKeyModalOpened} >
                    <ApiKeysForm action={props.createApiKey} toggle={setPostApiKeyModalOpened} />
                </Modal>
            }

            {selectedEditApiKey &&
                <Modal allowNavigation={false} modalTitle="Edit API Key" toggle={() => setPutApiKeyModalOpened(!putApiKeyModalOpened)} size="small" opened={putApiKeyModalOpened} >
                    <ApiKeysForm action={props.updateApiKey} item={selectedEditApiKey} toggle={setPutApiKeyModalOpened} />
                </Modal> 
            }
            {/* <Modal allowNavigation={false} className="x-visible" modalTitle="New Encoding Key" toggle={() => setPostEncoderKeyModalOpened(!postEncoderKeyModalOpened)} size="small" opened={postEncoderKeyModalOpened} >
                <EncoderKeysForm toggle={setPostEncoderKeyModalOpened} />
            </Modal>
            {selectedEditEncoderKey &&
                <Modal allowNavigation={false} modalTitle="Edit Encoding Key" toggle={() => setPutEncoderKeyModalOpened(!putEncoderKeyModalOpened)} size="small" opened={putEncoderKeyModalOpened} >
                    <EncoderKeysForm item={selectedEditEncoderKey} toggle={setPutEncoderKeyModalOpened} />
                </Modal> 
            }
            <Modal allowNavigation={false} modalTitle="Webhook" toggle={() => setPostWebHooksModalOpened(!postWebHooksModalOpened)} size="small" opened={postWebHooksModalOpened} >
                <WebHooksForm toggle={setPostWebHooksModalOpened} />
            </Modal>
            {selectedEditWebHooks &&
                <Modal allowNavigation={false} modalTitle="Edit Webhook" toggle={() => setPutWebHooksModalOpened(!putWebHooksModalOpened)} size="small" opened={putWebHooksModalOpened} >
                    <WebHooksForm item={selectedEditWebHooks} toggle={setPutWebHooksModalOpened} />
                </Modal> 
            }
            <Modal allowNavigation={false} modalTitle="New S3 Key" toggle={() => setPostS3KeysModalOpened(!postS3KeysModalOpened)} size="small" opened={postS3KeysModalOpened} >
                <S3KeysForm toggle={setPostS3KeysModalOpened} />
            </Modal>
            {selectedEditS3Keys &&
                <Modal allowNavigation={false} modalTitle="Edit S3 Key" toggle={() => setPutS3KeysModalOpened(!putS3KeysModalOpened)} size="small" opened={putS3KeysModalOpened} >
                    <S3KeysForm item={selectedEditS3Keys} toggle={setPutS3KeysModalOpened} />
                </Modal>
            } */}
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
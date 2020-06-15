import React from 'react';
import { Bubble } from '../../../../components/Bubble/Bubble';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { Toggle } from '../../../../components/Toggle/toggle';
import { IconStyle, IconContainer, ActionIcon } from '../../../../shared/Common/Icon';
import { Table } from '../../../../components/Table/Table';
import { Modal } from '../../../../components/Modal/Modal';
import { MailCatcherModal } from './MailCatcherModal';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { TextStyle } from '../../../shared/Engagement/EngagementStyle';
import { SettingsInteractionComponentProps } from '../../../containers/Settings/Interactions';
import { InteractionsInfos, Ad } from '../../../redux-flow/store/Settings/Interactions';
import { MailCatcher } from '../../../redux-flow/store/Settings/Interactions';
import { NewAdModal } from './NewAdModal';
import { usePlayer } from '../../../utils/player';
import { Prompt } from 'react-router';
import { getPrivilege } from '../../../../utils/utils';
import { DisabledSection } from '../../../shared/Security/SecurityStyle';
import { DragAndDrop } from '../../../../components/DragAndDrop/DragAndDrop';
import { ImageStyle, ButtonStyle, LinkStyle } from '../../Account/Company/CompanyStyle';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { PlayerContainer } from '../../../shared/Theming/ThemingStyle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { emptyContentListBody } from '../../../shared/List/emptyContentListState';

export const InteractionsPage = (props: SettingsInteractionComponentProps) => {

    const emptyMailCatcher: MailCatcher = {
        type: "",
        isDefault: false,
        placement: "",
        position: ""
    }

    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);
    const [interactionInfos, setInteractionsInfos] = React.useState<InteractionsInfos>(props.interactionsInfos);
    const [selectedAd, setSelectedAd] = React.useState<number>(-1)
    const [selectedMailCatcher, setSelectedMailCatcher] = React.useState<MailCatcher>(emptyMailCatcher)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false);
    const [mailCatcherModalOpened, setMailCatcherModalOpened] = React.useState<boolean>(false);

    const newAd = () => {
        setSelectedAd(-1);
        setNewAdModalOpened(true)
    }

    const editAd = (adIndex: number) => {
        setSelectedAd(adIndex);
        setNewAdModalOpened(true);
    }

    const newMailCatcher = () => {
        setSelectedMailCatcher(emptyMailCatcher);
        setMailCatcherModalOpened(true)
    }

    const editMailCatcher = (mailCatcher: MailCatcher) => {
        setSelectedMailCatcher(mailCatcher);
        setMailCatcherModalOpened(true);
    }
    const [playerModalOpened, setPlayerModalOpened] = React.useState<boolean>(false);
    let playerRef = React.useRef<HTMLDivElement>(null);

    let player = usePlayer(playerRef, '1552_f_297509');

    const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>(null);


    React.useEffect(() => {
        setInteractionsInfos(props.interactionsInfos)
    }, [props.interactionsInfos])

    const advertisingTableHeader = () => {
        if (props.interactionsInfos.ads.length > 0) {
            return {
                data: [
                    { cell: <Text key='advertisingTableHeaderPlacement' size={14} weight='med'>Placement</Text> },
                    { cell: <Text key='advertisingTableHeaderPosition' size={14} weight='med'>Position</Text> },
                    { cell: <Text key='advertisingTableHeaderUrl' size={14} weight='med'>Ad URL</Text> },
                    {
                        cell: <div key='advertisingTableHeaderButtons' className='right mr2 flex'>
                            <Button className='mr2 sm-show' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={() => { setPlayerModalOpened(true) }}>Preview</Button>
                            <Button className="sm-show" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newAd() }}>New Ad</Button>
                        </div>
                    }
                ]
            }
        } else {
            return {
                data: [
                    {
                        cell: <div key='advertisingTableHeaderButtons' className='right mr2 flex'>
                            <Button className="sm-show" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newAd() }}>New Ad</Button>
                        </div>
                    }
                ]
            }
        }
    }

    const advertisingTableBody = () => {
        return props.interactionsInfos.ads.map((item, i) => {
            return {
                data: [
                    <Text key={'advertisingTableBodyPlacement' + item["ad-type"] + i} size={14} weight='med'>{item["ad-type"]}</Text>,
                    <Text key={'advertisingTableBodyPosition' + item.timestamp + i} size={14} weight='med'>{item.timestamp}</Text>,
                    <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>,
                    <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                        <ActionIcon>
                            <IconStyle id={'adTableCopy' + i} onClick={() => { console.log('filter', props.interactionsInfos.ads.filter(ad => ad !== item)); props.deleteAd(props.interactionsInfos.ads.filter(ad => ad !== item), props.interactionsInfos.adsId) }} >delete</IconStyle>
                            <Tooltip target={'adTableCopy' + i}>Delete</Tooltip>
                        </ActionIcon>
                        <ActionIcon>
                            <IconStyle id={'adTableEdit' + i} onClick={() => editAd(i)}>edit</IconStyle>
                            <Tooltip target={'adTableEdit' + i}>Edit</Tooltip>
                        </ActionIcon>
                    </IconContainer>
                ]
            }
        })
    }

    const mailCatcherTableHeader = () => {
        if (props.interactionsInfos.mailCatcher.length > 0) {
            return {
                data: [
                    { cell: <Text key='MailCatcherTableHeaderTypeCell' size={14} weight='med'>Type</Text> },
                    { cell: <Text key='MailCatcherTableHeaderDefaultCell' size={14} weight='med'>Default</Text> },
                    { cell: <Button key='MailCatcherTableHeaderActionButtonCell' className='right sm-show mr2' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newMailCatcher() }}>Add Email Catcher</Button> }
                ]
            }
        } else {
            return {
                data: [
                    { cell: <Button key='MailCatcherTableHeaderActionButtonCell' className='right sm-show mr2' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newMailCatcher() }}>Add Email Catcher</Button> }
                ]
            }
        }
    }

    const mailCatcherTableBody = () => {
        return props.interactionsInfos.mailCatcher.map((row, i) => {
            return {
                data: [
                    <Text key={row.type + i.toString()} size={14} weight="reg" color="gray-1">{row.type}</Text>,
                    row.isDefault ? <IconStyle coloricon='green' key={'mailCatcherTableBodyIsDefaultCell' + i.toString()}>checked</IconStyle> : <></>,
                    <IconContainer className="iconAction" key={'mailCatcherTableActionButtons' + i.toString()}>
                        <ActionIcon>
                            <IconStyle id={'mailTableCopy' + i} onClick={() => { props.deleteMailCatcher(row) }} >delete</IconStyle>
                            <Tooltip target={'mailTableCopy' + i}>Delete</Tooltip>
                        </ActionIcon>
                        <ActionIcon>
                            <IconStyle id={'mailTableEdit' + i} onClick={() => editMailCatcher(row)}>edit</IconStyle>
                            <Tooltip target={'mailTableEdit' + i}>Edit</Tooltip>
                        </ActionIcon>


                    </IconContainer>

                ]
            }
        })
    }

    React.useEffect(() => console.log("component props", props.interactionsInfos), [props.interactionsInfos])


    return (
        <div>
            <Bubble type='info'>These global settings can be overidden at content level (Video, Live Stream etc.)</Bubble>
            {getPrivilege('privilege-advertising') &&
                <Card className='my2'>
                    <Text className="pb2" size={20} weight='med'>Advertising</Text>
                    <DisabledSection settingsEditable={props.interactionsInfos.ads.length > 0}>
                        <Toggle id='advertisingEnabled' defaultChecked={props.interactionsInfos.adsEnabled} onChange={() => { setInteractionsInfos({ ...interactionInfos, adsEnabled: !interactionInfos.adsEnabled }); setSettingsEdited(true) }} label='Advertising enabled' />
                    </DisabledSection>
                    <Text className="py2" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    <div className='flex mb2'>
                        <IconStyle className="mr1">info_outlined</IconStyle>
                        <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                    </div>
                    <div className="clearfix mb2">
                        <Button className='xs-show col mb1 col-12' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => { event.preventDefault(); setPlayerModalOpened(true) }}>Preview</Button>
                        <Button className="xs-show col col-12" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => { newAd() }}>New Ad</Button>
                    </div>
                    <Table id='advertisingTable' headerBackgroundColor="gray-10" header={advertisingTableHeader()} body={props.interactionsInfos.ads.length > 0 ? advertisingTableBody() : emptyContentListBody("Create a new Ad before enabling Advertising")} />

                </Card>}
            {/* TODO: MAIL CATCHER
            <Card className='my2'>
                <TextStyle> <Text size={20} weight='med'>Email Catcher</Text></TextStyle>
                <Text className="py2" size={14} weight='reg' color='gray-3'>Prompts viewers to provide their email address before viewing your content and store them wherever you create an integration.</Text>
                <div className='flex'>
                    <IconStyle className="mr1">info_outlined</IconStyle>
                    <Text size={14} weight='reg' color='gray-3'>Need help creating Email Catcher? Visit the <a href="https://www.dacast.com/support/knowledgebase/" target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                <div className='my2'>   
                    <Button typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => {event.preventDefault();setMailCatcherModalOpened(true)}}>Add Mail Catcher</Button>
                </div>
                <Button className='xs-show col col-12' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => {newMailCatcher()}}>Add Email Catcher</Button>
                <Table id='mailCatcherTable' headerBackgroundColor="gray-10" header={mailCatcherTableHeader()} body={props.interactionsInfos.mailCatcher.length > 0 ? mailCatcherTableBody() : emptyContentListBody("Add a Mail Catcher") } />
            </Card> */}

            <Card className="my2">
                <TextStyle> <Text size={20} weight='med'>Brand Image</Text></TextStyle>
                <Text className="py2" size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>


                <div className="lg-col lg-col-12 mb1 flex">
                    <div className="lg-col lg-col-6 mr2">
                        <DragAndDrop className="flex flex-column" hasError={false} handleDrop={() => { }}>
                            {uploadedFileUrl ?
                                <>
                                    {/* {props.CompanyPageDetails.isUploading ? <SpinnerContainer style={{zIndex: 1000}}><LoadingSpinner className='mx-auto' color='violet' size='small' /> </SpinnerContainer>: null} */}
                                    <ImageStyle src={uploadedFileUrl}></ImageStyle>
                                    <Button sizeButton='xs' typeButton='secondary' style={{ position: 'absolute', right: '8px', top: '8px' }} buttonColor='blue'>Delete</Button>
                                    <Button sizeButton='xs' typeButton='primary' style={{ position: 'absolute', right: '8px', top: '40px' }} buttonColor='blue' >Upload</Button>
                                </>
                                :
                                <>
                                    <IconStyle className='pt3 center mx-auto' customsize={40} coloricon='dark-violet'>cloud_upload</IconStyle>
                                    <div className='center'><Text size={14} weight='med' color='gray-1'>Drag and drop files here</Text></div>
                                    <div className='center'><Text size={12} weight='reg' color='gray-3'>or </Text></div>
                                    <ButtonStyle className='my1'>
                                        <Button style={{ marginBottom: 26 }} sizeButton='xs' typeButton='secondary' buttonColor='blue'>
                                            <label htmlFor='browseButton'>
                                                <LinkStyle>
                                                    <input type='file' style={{ display: 'none' }} id='browseButton' />
                                                    Browse Files
                                                </LinkStyle>
                                            </label>
                                        </Button>
                                    </ButtonStyle>
                                </>
                            }
                        </DragAndDrop>
                        <div className="mb25" ><Text size={10} weight='reg' color='gray-3'>2 MB max file size, image formats: JPG, PNG, SVG, GIF </Text></div>
                    </div>
                    <div className="col col-6">
                        <DropdownSingle className="col col-4 pr2" id="brandImagePlacementDropdown" dropdownTitle="Image Placement" list={{ 'Top Right': false, 'Top Left': false, 'Bottom Right': false, 'Bottom Left': false }} dropdownDefaultSelect={props.interactionsInfos.brandImagePosition ? props.interactionsInfos.brandImagePosition : 'Top Right'}></DropdownSingle>
                        <Input className="col col-4 pr2" defaultValue={props.interactionsInfos.brandImageSize && props.interactionsInfos.brandImageSize.toString()} onChange={(event) => setInteractionsInfos({ ...interactionInfos, brandImageSize: parseInt(event.currentTarget.value) })} label="Image Size" suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                        <Input className="col col-4" label="Padding (px)" defaultValue={props.interactionsInfos.brandImagePadding && props.interactionsInfos.brandImagePadding.toString()} onChange={(event) => setInteractionsInfos({ ...interactionInfos, brandImagePadding: parseInt(event.currentTarget.value) })} />
                        <Input className="col col-12 mt2" label="Image Link" indicationLabel="optional" defaultValue={props.interactionsInfos.brandImageLink && props.interactionsInfos.brandImageLink} onChange={(event) => setInteractionsInfos({ ...interactionInfos, brandImageLink: event.currentTarget.value })} />
                    </div>
                </div>

            </Card>

            <Card className='my2'>
                <TextStyle className="pb2" ><Text size={20} weight='med'>Brand Text</Text></TextStyle>
                <Text size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>
                <div className='clearfix mb2'>
                    <Input
                        disabled={interactionInfos.isBrandTextAsTitle} className='xs-mb2 pr1 col xs-no-gutter col-12 md-col-8'
                        label='Brand Text'
                        onChange={(event) => { setInteractionsInfos({ ...interactionInfos, brandText: event.currentTarget.value }) }}
                        value={interactionInfos.brandText ? interactionInfos.brandText : ""}
                    />
                    <Input
                        className='pl1 col col-12 md-col-4 xs-no-gutter'
                        label='Brand Text Link'
                        value={interactionInfos.brandTextLink ? interactionInfos.brandTextLink : ""}
                        onChange={(event) => { setInteractionsInfos({ ...interactionInfos, brandTextLink: event.currentTarget.value }); setSettingsEdited(true) }} />
                </div>
                <Toggle className='' label='Use content title as Brand Text' defaultChecked={interactionInfos.isBrandTextAsTitle} onChange={() => { setInteractionsInfos({ ...interactionInfos, isBrandTextAsTitle: !interactionInfos.isBrandTextAsTitle }); setSettingsEdited(true) }} />
            </Card>

            <Card className='my2'>
                <Text className="pb2" size={20} weight='med'>End Screen Text</Text>
                <Text className="inline-block mb2" size={14} weight='reg' color='gray-3'>This will be displayed when the content ends.</Text>
                <div className='clearfix mb2'>
                    <Input
                        className='xs-no-gutter pr1 col col-12 md-col-8'
                        label='End Screen Text'
                        value={interactionInfos.endScreenText ? interactionInfos.endScreenText : ""}
                        onChange={(event) => { setInteractionsInfos({ ...interactionInfos, endScreenText: event.currentTarget.value }); setSettingsEdited(true) }}
                    />
                    <Input
                        className='xs-no-gutter pl1 col col-12 md-col-4'
                        label='End Screen Text Link'
                        value={interactionInfos.endScreenTextLink ? interactionInfos.endScreenTextLink : ""}
                        onChange={(event) => { setInteractionsInfos({ ...interactionInfos, endScreenTextLink: event.currentTarget.value }); setSettingsEdited(true) }} />
                </div>
            </Card>

            {
                settingsEdited ?
                    <div className="mt1">
                        <Button onClick={() => { props.saveInteractionsInfos(interactionInfos); setSettingsEdited(false) }}>Save</Button>
                        <Button className="ml2" typeButton="tertiary" onClick={() => { setInteractionsInfos(props.interactionsInfos); setSettingsEdited(false) }}>Discard</Button>
                    </div> : null
            }

            <Modal hasClose={false} opened={mailCatcherModalOpened} modalTitle='Add Email Catcher' size='small' toggle={() => setMailCatcherModalOpened(!mailCatcherModalOpened)}>
                {
                    mailCatcherModalOpened ?
                        <MailCatcherModal {...props} toggle={setMailCatcherModalOpened} selectedMailCatcher={selectedMailCatcher} />
                        : null
                }
            </Modal>
            <Modal hasClose={false} opened={newAdModalOpened} modalTitle={selectedAd === -1 ? "New Ad" : "Edit Ad"} size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                {
                    newAdModalOpened ?
                        <NewAdModal {...props} toggle={setNewAdModalOpened} selectedAd={selectedAd} />
                        : null
                }
            </Modal>
            <Modal modalTitle='Preview Ads' hasClose toggle={() => setPlayerModalOpened(!playerModalOpened)} opened={playerModalOpened}>
                <PlayerContainer>
                    <div className="mt2" ref={playerRef}></div>
                </PlayerContainer>
            </Modal>
            <Prompt when={interactionInfos !== props.interactionsInfos} message='' />
        </div>
    )
}
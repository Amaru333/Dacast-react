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
import { AdTableURLContainer } from '../../../shared/Engagement/EngagementStyle';
import { SettingsInteractionComponentProps } from '../../../containers/Settings/Interactions';
import { EngagementInfo, Ad } from '../../../redux-flow/store/Settings/Interactions';
import { MailCatcher } from '../../../redux-flow/store/Settings/Interactions';
import { NewAdModal } from './NewAdModal';
import { usePlayer } from '../../../utils/player';
import { Prompt } from 'react-router';
import { dataToTimeVideo } from '../../../../utils/utils';
import { DisabledSection } from '../../../shared/Security/SecurityStyle';
import { DragAndDrop } from '../../../../components/DragAndDrop/DragAndDrop';
import { ImageStyle, ButtonStyle, LinkStyle } from '../../Account/Company/CompanyStyle';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { PlayerContainer } from '../../../shared/Theming/ThemingStyle';
import { Tooltip } from '../../../../components/Tooltip/Tooltip';
import { emptyContentListBody } from '../../../shared/List/emptyContentListState';
import { PreviewModal } from '../../../shared/Common/PreviewModal';
import { LoadingSpinner } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { userToken } from '../../../utils/token';
import { getKnowledgebaseLink } from '../../../constants/KnowledgbaseLinks';

export const InteractionsPage = (props: SettingsInteractionComponentProps) => {

    const emptyMailCatcher: MailCatcher = {
        type: "",
        isDefault: false,
        placement: "",
        position: ""
    }

    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);
    const [interactionInfos, setInteractionsInfos] = React.useState<EngagementInfo>(props.interactionsInfos);
    const [selectedAd, setSelectedAd] = React.useState<number>(-1)
    const [selectedMailCatcher, setSelectedMailCatcher] = React.useState<MailCatcher>(emptyMailCatcher)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false);
    const [mailCatcherModalOpened, setMailCatcherModalOpened] = React.useState<boolean>(false);
    const [logoFile, setLogoFile] = React.useState<File>(null);

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
    const [previewModalOpen, setPreviewModalOpen] = React.useState<boolean>(false);


    const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>(props.interactionsInfos.brandImageSettings.brandImageURL || '');
    const [uploadButtonLoading, setUploadButtonLoading] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')

    let brandImageBrowseButtonRef = React.useRef<HTMLInputElement>(null)
    let brandImageChangeButtonRef = React.useRef<HTMLInputElement>(null)


    const handleDrop = (file: FileList) => {
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg'];
        if(file.length > 0 && acceptedImageTypes.includes(file[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
                let acceptedRatio = true;
                const img = new Image();
                img.onload = () => {
                    //acceptedRatio = (img.width / img.height) / 4 === 1 && img.width <= 240 ? true : false;
                }
                if(acceptedRatio) {
                    setUploadedFileUrl(reader.result.toString())
                    setLogoFile(file[0])
                    setErrorMessage('')
                    setUploadButtonLoading(true)
                    props.getUploadUrl('player-watermark')
                }
                else {
                    setErrorMessage('Your image ratio is not 4:1 or its width exceeded the limit.')
                }
            }
            reader.readAsDataURL(file[0])
        }
        else{
            setErrorMessage('File provided was not an image, please retry')
        }
    }
    
    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setUploadedFileUrl(null);
        props.deleteFile(interactionInfos.brandImageSettings.brandImageURL).then(() => {
            setTimeout(() => {
                props.getInteractionsInfos()
            }, 3000)
        })
    }


    React.useEffect(() => {
        if(props.interactionsInfos.uploadurl) {
            props.uploadFile(logoFile, props.interactionsInfos.uploadurl).then(() => {
                setUploadButtonLoading(false)
                setTimeout(() => {
                    props.getInteractionsInfos()
                }, 3000)
            })
        }
    }, [props.interactionsInfos.uploadurl])


    React.useEffect(() => {
        setInteractionsInfos(props.interactionsInfos)
    }, [props.interactionsInfos])

    const handleAdPosition = (ad: Ad) => {
        if(ad["ad-type"] === "pre-roll"){
            return "Start"
        } else if(ad["ad-type"] === "post-roll"){
            return "End"
        } else {
            return dataToTimeVideo(ad.timestamp).toString()
        }
    }

    const advertisingTableHeader = () => {
        if (props.interactionsInfos.adsSettings.ads.length > 0) {
            return {
                data: [
                    { cell: <Text key='advertisingTableHeaderPlacement' size={14} weight='med'>Placement</Text> },
                    { cell: <Text key='advertisingTableHeaderPosition' size={14} weight='med'>Position</Text> },
                    { cell: <Text key='advertisingTableHeaderUrl' size={14} weight='med'>Ad URL</Text> },
                    {
                        cell: <div key='advertisingTableHeaderButtons' className='right mr2 flex'>
                            <Button className='mr2 sm-show' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={() => { setPreviewModalOpen(true) }}>Preview</Button>
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
        return props.interactionsInfos.adsSettings.ads.map((item, i) => {
            return {
                data: [
                    <Text key={'advertisingTableBodyPlacement' + item["ad-type"] + i} size={14} weight='med'>{item["ad-type"]}</Text>,
                    <Text key={'advertisingTableBodyPosition' + item.timestamp + i} size={14} weight='med'>{handleAdPosition(item)}</Text>,
                    <AdTableURLContainer>
                        <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>
                    </AdTableURLContainer>,
                    <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                        <ActionIcon>
                            <IconStyle id={'adTableCopy' + i} onClick={() => props.deleteAd(props.interactionsInfos.adsSettings.ads.filter(ad => ad !== item))} >delete</IconStyle>
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

    // const mailCatcherTableHeader = () => {
    //     if (props.interactionsInfos.mailCatcher) {
    //         return {
    //             data: [
    //                 { cell: <Text key='MailCatcherTableHeaderTypeCell' size={14} weight='med'>Type</Text> },
    //                 { cell: <Text key='MailCatcherTableHeaderDefaultCell' size={14} weight='med'>Default</Text> },
    //                 { cell: <Button key='MailCatcherTableHeaderActionButtonCell' className='right sm-show mr2' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newMailCatcher() }}>Add Email Catcher</Button> }
    //             ]
    //         }
    //     } else {
    //         return {
    //             data: [
    //                 { cell: <Button key='MailCatcherTableHeaderActionButtonCell' className='right sm-show mr2' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newMailCatcher() }}>Add Email Catcher</Button> }
    //             ]
    //         }
    //     }
    // }

    // const mailCatcherTableBody = () => {
    //     return props.interactionsInfos.mailCatcher.map((row, i) => {
    //         return {
    //             data: [
    //                 <Text key={row.type + i.toString()} size={14} weight="reg" color="gray-1">{row.type}</Text>,
    //                 row.isDefault ? <IconStyle coloricon='green' key={'mailCatcherTableBodyIsDefaultCell' + i.toString()}>checked</IconStyle> : <></>,
    //                 <IconContainer className="iconAction" key={'mailCatcherTableActionButtons' + i.toString()}>
    //                     <ActionIcon>
    //                         <IconStyle id={'mailTableCopy' + i} onClick={() => { props.deleteMailCatcher(row) }} >delete</IconStyle>
    //                         <Tooltip target={'mailTableCopy' + i}>Delete</Tooltip>
    //                     </ActionIcon>
    //                     <ActionIcon>
    //                         <IconStyle id={'mailTableEdit' + i} onClick={() => editMailCatcher(row)}>edit</IconStyle>
    //                         <Tooltip target={'mailTableEdit' + i}>Edit</Tooltip>
    //                     </ActionIcon>


    //                 </IconContainer>

    //             ]
    //         }
    //     })
    // }

    return (
        <div>
            <Bubble type='info'>These global settings can be overidden at content level (Video, Live Stream etc.)</Bubble>
            {userToken.getPrivilege('privilege-advertising') &&
                <Card className='my2'>
                    <Text className="pb2" size={20} weight='med'>Advertising</Text>
                    <DisabledSection settingsEditable={props.interactionsInfos.adsSettings.ads.length > 0}>
                        <Toggle id='advertisingEnabled' defaultChecked={props.interactionsInfos.adsSettings.adsEnabled} onChange={() => { setInteractionsInfos({ ...interactionInfos, adsSettings: {...interactionInfos.adsSettings, adsEnabled: !interactionInfos.adsSettings.adsEnabled }}); setSettingsEdited(true) }} label='Advertising enabled' />
                    </DisabledSection>
                    <Text className="py2" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    <div className='flex mb2'>
                        <IconStyle className="mr1">info_outlined</IconStyle>
                        <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the <a href={getKnowledgebaseLink("Ads")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                    </div>
                    <div className="clearfix mb2">
                        <Button className='xs-show col mb1 col-12' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => { event.preventDefault(); setPreviewModalOpen(true) }}>Preview</Button>
                        <Button className="xs-show col col-12" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => { newAd() }}>New Ad</Button>
                    </div>
                    <Table id='advertisingTable' headerBackgroundColor="gray-10" header={advertisingTableHeader()} body={props.interactionsInfos.adsSettings.ads.length > 0 ? advertisingTableBody() : emptyContentListBody("Create a new Ad before enabling Advertising")} />

                </Card>}
            {/* TODO: MAIL CATCHER
            <Card className='my2'>
                <div> <Text size={20} weight='med'>Email Catcher</Text></div>
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
                <div> <Text size={20} weight='med'>Brand Image</Text></div>
                <Text className="py2" size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>


                <div className="lg-col lg-col-12 mb1 flex">
                    <div className="lg-col lg-col-6 mr2">
                        <DragAndDrop className="flex flex-column" hasError={false} handleDrop={handleDrop}>

                            {uploadedFileUrl ?
                                <>
                                    {uploadButtonLoading && <SpinnerContainer style={{zIndex: 1000}}>
                                        <LoadingSpinner className='mx-auto' color='violet' size='small' /> 
                                    </SpinnerContainer>}
                                    <ImageStyle src={uploadedFileUrl}></ImageStyle>
                                    <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} ref={brandImageChangeButtonRef} style={{display:'none'}} id='changeButton' />
                                    <Button sizeButton='xs' typeButton='secondary' style={{ position: 'absolute', right: '8px', top: '8px' }} buttonColor='blue' onClick={(e) => handleDelete(e)}>Delete</Button>
                                    <Button onClick={() => {brandImageChangeButtonRef.current.click()} }  sizeButton='xs' typeButton='secondary' style={{ position: 'absolute', right: '70px', top: '8px' }} buttonColor='blue' >Change</Button>
                                </>
                                :
                        <>
                        <IconStyle className='pt3 center mx-auto' customsize={40} coloricon='dark-violet'>cloud_upload</IconStyle>
                        <div className='center'><Text   size={14} weight='med' color='gray-1'>Drag and drop files here</Text></div>
                        <div className='center'><Text size={12} weight='reg' color='gray-3'>or </Text></div>
                        <ButtonStyle className='my1'>
                            <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} ref={brandImageBrowseButtonRef} style={{display:'none'}} id='browseButton' />
                            <Button onClick={() => {brandImageBrowseButtonRef.current.click()} } style={{marginBottom:26}} sizeButton='xs' typeButton='secondary' buttonColor='blue'>    
                                Browse Files
                            </Button>
                        </ButtonStyle>
                        </>
                            } 
                        </DragAndDrop>
                        <div className="mb25" ><Text size={10} weight='reg' color='gray-3'>2 MB max file size, image formats: JPG, PNG, SVG, GIF </Text></div>
                    </div>
                    <div className="col col-6">
                        <DropdownSingle className="col col-4 pr2" id="brandImagePlacementDropdown" dropdownTitle="Image Placement" list={{ 'Top Right': false, 'Top Left': false, 'Bottom Right': false, 'Bottom Left': false }} dropdownDefaultSelect={props.interactionsInfos.brandImageSettings.brandImagePosition || 'Top Right'}
                        callback={(value: string) => {setInteractionsInfos({...interactionInfos, brandImageSettings: {...interactionInfos.brandImageSettings, brandImagePosition: value}});setSettingsEdited(true)}}></DropdownSingle>
                        <Input className="col col-4 pr2" defaultValue={props.interactionsInfos.brandImageSettings.brandImageSize && props.interactionsInfos.brandImageSettings.brandImageSize.toString()} onChange={(event) => {setInteractionsInfos({ ...interactionInfos, brandImageSettings: {...interactionInfos.brandImageSettings, brandImageSize: parseInt(event.currentTarget.value)} });setSettingsEdited(true)}} label="Image Size" suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                        <Input className="col col-4" label="Padding (px)" defaultValue={props.interactionsInfos.brandImageSettings.brandImagePadding && props.interactionsInfos.brandImageSettings.brandImagePadding.toString()} onChange={(event) => {setInteractionsInfos({ ...interactionInfos, brandImageSettings: {...interactionInfos.brandImageSettings, brandImagePadding: parseInt(event.currentTarget.value)} });setSettingsEdited(true)}} />
                        <Input className="col col-12 mt2" label="Image Link" indicationLabel="optional" defaultValue={props.interactionsInfos.brandImageSettings.brandImageLink && props.interactionsInfos.brandImageSettings.brandImageLink} onChange={(event) => {setInteractionsInfos({ ...interactionInfos, brandImageSettings: {...interactionInfos.brandImageSettings, brandImageLink: event.currentTarget.value }});setSettingsEdited(true)}} />
                    </div>
                </div>

            </Card>

            <Card className='my2'>
                <div className="pb2" ><Text size={20} weight='med'>Brand Text</Text></div>
                <Text size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>
                <div className='clearfix mb2'>
                    <Input
                        disabled={interactionInfos.brandTextSettings.isBrandTextAsTitle} className='xs-mb2 pr1 col xs-no-gutter col-12 md-col-8'
                        label='Brand Text'
                        onChange={(event) => { setInteractionsInfos({ ...interactionInfos, brandTextSettings: {...interactionInfos.brandTextSettings, brandText: event.currentTarget.value }}); setSettingsEdited(true) }}
                        value={ interactionInfos.brandTextSettings.brandText || ""}
                    />
                    <Input
                        className='pl1 col col-12 md-col-4 xs-no-gutter'
                        label='Brand Text Link'
                        value={interactionInfos.brandTextSettings.brandTextLink || ""}
                        onChange={(event) => { setInteractionsInfos({ ...interactionInfos, brandTextSettings: {...interactionInfos.brandTextSettings, brandTextLink: event.currentTarget.value }}); setSettingsEdited(true) }} />
                </div>
                <Toggle className='' label='Use content title as Brand Text' defaultChecked={interactionInfos.brandTextSettings.isBrandTextAsTitle} onChange={() => { setInteractionsInfos({ ...interactionInfos, brandTextSettings: {...interactionInfos.brandTextSettings, isBrandTextAsTitle: !interactionInfos.brandTextSettings.isBrandTextAsTitle }}); setSettingsEdited(true) }} />
            </Card>

            <Card className='my2'>
                <Text className="pb2" size={20} weight='med'>End Screen Text</Text>
                <Text className="inline-block mb2" size={14} weight='reg' color='gray-3'>This will be displayed when the content ends.</Text>
                <div className='clearfix mb2'>
                    <Input
                        className='xs-no-gutter pr1 col col-12 md-col-8'
                        label='End Screen Text'
                        value={interactionInfos.endScreenSettings.endScreenText || ""}
                        onChange={(event) => { setInteractionsInfos({ ...interactionInfos, endScreenSettings: {...interactionInfos.endScreenSettings, endScreenText: event.currentTarget.value }}); setSettingsEdited(true) }}
                    />
                    <Input
                        className='xs-no-gutter pl1 col col-12 md-col-4'
                        label='End Screen Text Link'
                        value={interactionInfos.endScreenSettings.endScreenTextLink || ""}
                        onChange={(event) => { setInteractionsInfos({ ...interactionInfos, endScreenSettings: {...interactionInfos.endScreenSettings, endScreenTextLink: event.currentTarget.value }}); setSettingsEdited(true) }} />
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
            <Modal className='x-visible'  hasClose={false} opened={newAdModalOpened} modalTitle={selectedAd === -1 ? "New Ad" : "Edit Ad"} size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                {
                    newAdModalOpened &&
                        <NewAdModal {...props} toggle={setNewAdModalOpened} selectedAd={selectedAd} />
                }
            </Modal>
            {
                previewModalOpen && <PreviewModal contentId='1d6184ed-954f-2ce6-a391-3bfe0552555c-vod-d72b87e4-596f-5057-5810-98f0f2ad0e22' toggle={setPreviewModalOpen} isOpened={previewModalOpen} />
            }
            <Prompt when={settingsEdited} message='' />
        </div>
    )
}
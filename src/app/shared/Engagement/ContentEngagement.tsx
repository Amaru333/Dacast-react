import React from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { IconStyle, IconContainer, ActionIcon } from '../../../shared/Common/Icon';
import { Table } from '../../../components/Table/Table';
import { TextStyle, Header, DisabledSection } from './EngagementStyle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Ad, MailCatcher, InteractionsInfos, ContentEngagementSettings } from '../../redux-flow/store/Settings/Interactions/types';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ContentNewAdModal } from './ContentNewAdModal';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { getPrivilege } from '../../../utils/utils';
import { addTokenToHeader } from '../../utils/token';
import { emptyContentListBody } from '../List/emptyContentListState';
import { PreviewModal } from '../Common/PreviewModal';
import { DragAndDrop } from '../../../components/DragAndDrop/DragAndDrop';
import { ImageStyle, ButtonStyle } from '../../pages/Account/Company/CompanyStyle';

export interface ContentEngagementComponentProps {
    contentEngagementSettings: ContentEngagementSettings;
    getContentEngagementSettings: Function;
    saveContentEngagementSettings: Function;
    saveContentAd: Function;
    createContentAd: Function;
    deleteContentAd: Function;
    contentType?: string;
    contentId: string;
    getUploadUrl: Function;
    uploadContentImage: Function;
    deleteContentImage: Function;
}

export const ContentEngagementPage = (props: ContentEngagementComponentProps) => {

    const emptyAd: Ad = {
        id: "-1",
        "ad-type": "",
        timestamp: 0,
        url: ""
    }

    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);
    const [engagementSettings, setEngagementSettings] = React.useState<InteractionsInfos>(props.contentEngagementSettings.engagementSettings);
    const [selectedAd, setSelectedAd] = React.useState<Ad>(emptyAd)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false);
    const [adSectionEditable, setAdSectionEditable] = React.useState<boolean>(false);
    const [mailSectionEditable, setMailSectionEditable] = React.useState<boolean>(false);
    const [brandSectionEditable, setBrandSectionEditable] = React.useState<boolean>(false);
    const [endScreenSectionEditable, setEndScreenSectionEditable] = React.useState<boolean>(false);
    const [saveAllButtonLoading, setSaveAllButtonLoading] = React.useState<boolean>(false);
    const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>(props.contentEngagementSettings.engagementSettings.brandImageURL);
    let brandImageBrowseButtonRef = React.useRef<HTMLInputElement>(null)
    const [uploadButtonLoading, setUploadButtonLoading] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [logoFile, setLogoFile] = React.useState<File>(null);

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
                    props.getUploadUrl('player-watermark', props.contentId);
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
        props.deleteContentImage(props.contentId);
    }


    React.useEffect(() => {
        if(props.contentEngagementSettings.engagementSettings.uploadurl) {
            props.uploadContentImage(logoFile, props.contentEngagementSettings.engagementSettings.uploadurl, () => setUploadButtonLoading(false) );    
        }
    }, [props.contentEngagementSettings.engagementSettings.uploadurl])



    const newAd = () => {
        setSelectedAd(emptyAd);
        setNewAdModalOpened(true)
    }

    const editAd = (ad: Ad) => {
        setSelectedAd(ad);
        setNewAdModalOpened(true);
    }

    const { userId } = addTokenToHeader()

    const [playerModalOpened, setPlayerModalOpened] = React.useState<boolean>(false);

    React.useEffect(() => {
        setEngagementSettings(props.contentEngagementSettings.engagementSettings)
    }, [props.contentEngagementSettings.engagementSettings])

    const advertisingTableHeader = () => {
        if (props.contentEngagementSettings.engagementSettings.ads.length > 0) {
            return {
                data: [
                    { cell: <Text key='advertisingTableHeaderPlacement' size={14} weight='med'>Placement</Text> },
                    { cell: <Text key='advertisingTableHeaderPosition' size={14} weight='med'>Position</Text> },
                    { cell: <Text key='advertisingTableHeaderUrl' size={14} weight='med'>Ad URL</Text> },
                    {
                        cell: <div key='advertisingTableHeaderButtons' className='right mr2 flex'>
                            <Button className='mr2 sm-show' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => { event.preventDefault(); setPlayerModalOpened(true) }}>Preview</Button>
                            <Button className='sm-show' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => { newAd() }}>New Ad</Button>
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
        return props.contentEngagementSettings.engagementSettings.ads.map((item, i) => {
            return {
                data: [
                    <Text key={'advertisingTableBodyPlacement' + item["ad-type"] + i} size={14} weight='med'>{item["ad-type"]}</Text>,
                    <Text key={'advertisingTableBodyPosition' + item.timestamp + i} size={14} weight='med'>{item.timestamp}</Text>,
                    <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>,
                    <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                        <ActionIcon id={"deleteTooltip" + item.id}>
                            <IconStyle
                                onClick={() => { props.deleteContentAd(item, props.contentEngagementSettings.engagementSettings.adsId, props.contentEngagementSettings.contentId) }}
                            >delete
                            </IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + item.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + item.id}>
                            <IconStyle onClick={() => editAd(item)}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + item.id}>Edit</Tooltip>
                    </IconContainer>
                ]
            }
        })
    }

    const revertSettings = () => {
        setEngagementSettings(props.contentEngagementSettings.engagementSettings);
        setSettingsEdited(false)
        setAdSectionEditable(false);
        setMailSectionEditable(false);
        setEndScreenSectionEditable(false);
    }

    return (
        <div>
            <Bubble className="flex items-center" type='info'>Interactions are a Global Setting so you need to click on the lock <IconStyle>lock</IconStyle> or edit your Advertising Settings </Bubble>
            {getPrivilege('privilege-advertising') &&
                <Card className='my2'>
                    <Header className="mb2">
                        <TextStyle>
                            <Text size={20} weight='med'>Advertising</Text>
                        </TextStyle>
                        <IconStyle className='pointer' id="unlockAdSectionTooltip" onClick={() => setAdSectionEditable(!adSectionEditable)}>
                            {adSectionEditable ? "lock_open" : "lock"}
                        </IconStyle>
                        <Tooltip target="unlockAdSectionTooltip">{adSectionEditable ? "Click to revert Advertising Settings" : "Click to edit Advertising Settings"}</Tooltip>
                    </Header>
                    <DisabledSection settingsEditable={adSectionEditable}>
                        <Toggle
                            className="mb2"
                            id='advertisingEnabled'
                            defaultChecked={engagementSettings.adsEnabled}
                            onChange={() => { setEngagementSettings({ ...engagementSettings, adsEnabled: !engagementSettings.adsEnabled }); setSettingsEdited(true) }} label='Advertising enabled'
                        />
                        <Text className="mb2 inline-block" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                        <div className='flex mb2'>
                            <IconStyle className="mr1">info_outlined</IconStyle>
                            <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                        </div>
                        <div className="clearfix mb2">
                            <Button className='xs-show col mb1 col-12' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => { event.preventDefault(); setPlayerModalOpened(true) }}>Preview</Button>
                            <Button className="xs-show col col-12" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => { newAd() }}>New Ad</Button>
                        </div>
                        <Table id='advertisingTable' headerBackgroundColor="gray-10" header={advertisingTableHeader()} body={props.contentEngagementSettings.engagementSettings.ads.length > 0 ? advertisingTableBody() : emptyContentListBody("Create a new Ad before enabling Advertising")} />

                    </DisabledSection>
                </Card>
            }

            {/* <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>Email Catcher</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockMailSectionTooltip" onClick={() => setMailSectionEditable(!mailSectionEditable)}>
                        {mailSectionEditable ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockMailSectionTooltip">{mailSectionEditable ? "Click to revert Email Catcher Settings" : "Click to edit Email Catcher Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={mailSectionEditable}>
                    <div className="pb2">
                        <Text size={14} weight='reg' color='gray-3'>Prompts viewers to provide their email address before viewing your content and store them wherever you create an integration.</Text>
                    </div>

                    <div className='flex'>
                        <IconStyle className="mr1">info_outlined</IconStyle>
                        <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                    </div>
                    <DropdownSingle
                        className="col col-3 mt2"
                        id="vodMailCatcherList"
                        dropdownTitle="Email Catcher"
                        dropdownDefaultSelect={engagementSettings.selectedMailCatcher}
                        list={props.contentEngagementSettings.engagementSettings.mailCatcher.reduce((reduced: DropdownListType, item: MailCatcher) => { return { ...reduced, [item.type]: false } }, {})}
                        callback={
                            (selectedMailCatcher: string) => {
                                setEngagementSettings({ ...engagementSettings, selectedMailCatcher: selectedMailCatcher }); setSettingsEdited(true)
                            }}

                    />
                </DisabledSection>
            </Card> */}

            <Card className="my2">
                <TextStyle> 
                    <Text size={20} weight='med'>Brand Image</Text>
                </TextStyle>
                <Text className="py2" size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>


                <div className="lg-col lg-col-12 mb1 flex">
                    <div className="lg-col lg-col-6 mr2">
                        <DragAndDrop className="flex flex-column" hasError={false} handleDrop={() => { }}>
                            {uploadedFileUrl ?
                                <>
                                    {/* {props.CompanyPageDetails.isUploading ? <SpinnerContainer style={{zIndex: 1000}}><LoadingSpinner className='mx-auto' color='violet' size='small' /> </SpinnerContainer>: null} */}
                                    <ImageStyle src={uploadedFileUrl}></ImageStyle>
                                    <Button sizeButton='xs' typeButton='secondary' style={{ position: 'absolute', right: '8px', top: '8px' }} buttonColor='blue' onClick={(e) => handleDelete(e)}>Delete</Button>
                                    <Button sizeButton='xs' typeButton='primary' style={{ position: 'absolute', right: '8px', top: '40px' }} buttonColor='blue' >Upload</Button>
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
                        <DropdownSingle className="col col-4 pr2" id="brandImagePlacementDropdown" dropdownTitle="Image Placement" list={{ 'Top Right': false, 'Top Left': false, 'Bottom Right': false, 'Bottom Left': false }} dropdownDefaultSelect={engagementSettings.brandImagePosition ? engagementSettings.brandImagePosition : 'Top Right'}
                        callback={(value: string) => {setEngagementSettings({...engagementSettings, brandImagePosition: value});setSettingsEdited(true)}}
                        ></DropdownSingle>
                        <Input className="col col-4 pr2" defaultValue={engagementSettings.brandImageSize && engagementSettings.brandImageSize.toString()} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImageSize: parseInt(event.currentTarget.value) });setSettingsEdited(true)}} label="Image Size" suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                        <Input className="col col-4" label="Padding (px)" defaultValue={engagementSettings.brandImagePadding && engagementSettings.brandImagePadding.toString()} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImagePadding: parseInt(event.currentTarget.value) });setSettingsEdited(true)}} />
                    <Input className="col col-12 mt2" label="Image Link" indicationLabel="optional" defaultValue={engagementSettings.brandImageLink && engagementSettings.brandImageLink} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImageLink: event.currentTarget.value });setSettingsEdited(true)}} />
                    </div>
                </div>

            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>Brand Text</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockBrandSectionTooltip" onClick={() => setBrandSectionEditable(!brandSectionEditable)}>
                        {brandSectionEditable ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockBrandSectionTooltip">{brandSectionEditable ? "Click to revert Brand Text Settings" : "Click to edit Brand Text Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={brandSectionEditable}>
                    <Text size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>
                    <div className='flex'>
                        <Input
                            disabled={engagementSettings.isBrandTextAsTitle} className='my2 pr1 col col-8'
                            label='Brand Text'
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, brandText: event.currentTarget.value }); setSettingsEdited(true) }}
                            value={engagementSettings.brandText ? engagementSettings.brandText : ""}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='Brand Text Link'
                            value={engagementSettings.brandTextLink ? engagementSettings.brandTextLink : ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, brandTextLink: event.currentTarget.value }); setSettingsEdited(true) }} />
                    </div>
                    <Toggle className='' label='Use content title as Brand Text' defaultChecked={engagementSettings.isBrandTextAsTitle} onChange={() => { setEngagementSettings({ ...engagementSettings, isBrandTextAsTitle: !engagementSettings.isBrandTextAsTitle }); setSettingsEdited(true) }} />
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>End Screen Text</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockEndScreenSectionTooltip" onClick={() => setEndScreenSectionEditable(!endScreenSectionEditable)}>
                        {endScreenSectionEditable ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockEndScreenSectionTooltip">{endScreenSectionEditable ? "Click to revert End Screen Text Settings" : "Click to edit End Screen Text Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={endScreenSectionEditable}>
                    <Text size={14} weight='reg' color='gray-3'>This will be displayed when the content ends.</Text>
                    <div className='flex'>
                        <Input
                            className='my2 pr1 col col-8'
                            label='End Screen Text'
                            value={engagementSettings.endScreenText ? engagementSettings.endScreenText : ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, endScreenText: event.currentTarget.value }); setSettingsEdited(true) }}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='End Screen Text Link'
                            value={engagementSettings.endScreenTextLink ? engagementSettings.endScreenTextLink : ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, endScreenTextLink: event.currentTarget.value }); setSettingsEdited(true) }} />
                    </div>
                </DisabledSection>
            </Card>

            {
                settingsEdited ?
                    <div className="mt1">
                        <Button
                            isLoading={saveAllButtonLoading}
                            onClick={() => { setSaveAllButtonLoading(true); props.saveContentEngagementSettings({ contentId: props.contentId, engagementSettings: engagementSettings }, () => setSaveAllButtonLoading(false)); setSettingsEdited(false) }}
                        >
                            Save
                        </Button>
                        <Button className="ml2" typeButton="tertiary" onClick={() => revertSettings()}>Discard</Button>
                    </div> : null
            }

            <Modal className='x-visible' hasClose={false} opened={newAdModalOpened} modalTitle={selectedAd.id === "-1" ? "New Ad" : "Edit Ad"} size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                <ContentNewAdModal {...props} toggle={setNewAdModalOpened} selectedAd={selectedAd} />
            </Modal>
            {
                playerModalOpened && <PreviewModal contentId={userId + '-' + props.contentType + '-' + props.contentEngagementSettings.contentId} toggle={setPlayerModalOpened} isOpened={playerModalOpened} />
            }
            <Prompt when={engagementSettings !== props.contentEngagementSettings.engagementSettings} message='' />
        </div>
    )
}
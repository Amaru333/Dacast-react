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
import { getPrivilege, dataToTimeVideo } from '../../../utils/utils';
import { addTokenToHeader } from '../../utils/token';
import { emptyContentListBody } from '../List/emptyContentListState';
import { PreviewModal } from '../Common/PreviewModal';
import { DragAndDrop } from '../../../components/DragAndDrop/DragAndDrop';
import { ImageStyle, ButtonStyle } from '../../pages/Account/Company/CompanyStyle';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

export interface ContentEngagementComponentProps {
    contentEngagementSettings: ContentEngagementSettings;
    globalEngagementSettings: InteractionsInfos
    getContentEngagementSettings: (contentId: string) => Promise<void>;
    saveContentEngagementSettings: (data: ContentEngagementSettings) => Promise<void>;
    saveContentAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    createContentAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    deleteContentAd: (data: Ad[], adsId: string, contentId: string) => Promise<void>;
    contentType?: string;
    contentId: string;
    getUploadUrl: (uploadType: string, contentId: string) => Promise<void>;
    uploadContentImage: (data: File, uploadUrl: string) => Promise<void>;
    deleteContentImage: (targetId: string) => Promise<void>;
}

export const ContentEngagementPage = (props: ContentEngagementComponentProps) => {

    const emptyAd: Ad = {
        id: "-1",
        "ad-type": "",
        timestamp: null,
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
    const [uploadButtonLoading, setUploadButtonLoading] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [logoFile, setLogoFile] = React.useState<File>(null);
    const [brandImageSectionEditable, setBrandImageSectionEditable] = React.useState<boolean>(false)

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
            props.uploadContentImage(logoFile, props.contentEngagementSettings.engagementSettings.uploadurl ).then(() => {
                setUploadButtonLoading(false)
            })    
        }
    }, [props.contentEngagementSettings.engagementSettings.uploadurl])

    const objectsEqual = (o1: any, o2: any): boolean => {
        if(typeof o1 === 'object' && Object.keys(o1).length > 0) {
            return Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        }
        return o1 === o2};

    const arraysEqual = (a1: Array<any>, a2: Array<any>): boolean => {
        if(!a1 || !a2) {
            return false
        }
        return a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]))
    }
        
  
    React.useEffect(() => {
        const {brandImageURL, brandImagePadding, brandImagePosition, brandImageText, brandImageSize, brandText, brandTextLink, isBrandTextAsTitle, endScreenText, endScreenTextLink} = props.contentEngagementSettings.engagementSettings
       let tempSettings: InteractionsInfos = engagementSettings
        if(props.contentEngagementSettings.engagementSettings.adsId){
            setAdSectionEditable(true)
            tempSettings = {...tempSettings, adsEnabled: props.contentEngagementSettings.engagementSettings.adsEnabled, ads: props.contentEngagementSettings.engagementSettings.ads}
        } else {
            tempSettings = {...tempSettings, adsEnabled: props.globalEngagementSettings.adsEnabled, ads: props.globalEngagementSettings.ads}
        }
        if(brandImageURL || brandImagePadding || brandImagePosition || brandImageText || brandImageSize ){
            setBrandImageSectionEditable(true)
            tempSettings = {...tempSettings, brandImageID: props.contentEngagementSettings.engagementSettings.brandImageID, brandImageLink: props.contentEngagementSettings.engagementSettings.brandImageLink, brandImagePadding: props.contentEngagementSettings.engagementSettings.brandImagePadding, brandImagePosition: props.contentEngagementSettings.engagementSettings.brandImagePosition, brandImageSize: props.contentEngagementSettings.engagementSettings.brandImageSize, brandImageURL: props.contentEngagementSettings.engagementSettings.brandImageURL}
        } else {
            setUploadedFileUrl(props.globalEngagementSettings.brandImageURL)
            tempSettings = {...tempSettings, brandImageID: props.globalEngagementSettings.brandImageID, brandImageLink: props.globalEngagementSettings.brandImageLink, brandImagePadding: props.globalEngagementSettings.brandImagePadding, brandImagePosition: props.globalEngagementSettings.brandImagePosition, brandImageSize: props.globalEngagementSettings.brandImageSize, brandImageURL: props.globalEngagementSettings.brandImageURL}
        }
        if(brandText || brandTextLink || isBrandTextAsTitle ){
            setBrandSectionEditable(true)
            tempSettings = {...tempSettings, brandText: props.contentEngagementSettings.engagementSettings.brandText, brandTextLink: props.contentEngagementSettings.engagementSettings.brandTextLink, isBrandTextAsTitle: props.contentEngagementSettings.engagementSettings.isBrandTextAsTitle}
        } else {
            tempSettings = {...tempSettings, brandText: props.globalEngagementSettings.brandText, brandTextLink: props.globalEngagementSettings.brandTextLink, isBrandTextAsTitle: props.globalEngagementSettings.isBrandTextAsTitle}
        }
        if(endScreenText || endScreenTextLink ){
            setEndScreenSectionEditable(true)
            tempSettings = {...tempSettings, endScreenText: props.contentEngagementSettings.engagementSettings.endScreenText, endScreenTextLink: props.contentEngagementSettings.engagementSettings.endScreenTextLink}
        } else {
            tempSettings = {...tempSettings, endScreenText: props.globalEngagementSettings.endScreenText, endScreenTextLink: props.globalEngagementSettings.endScreenTextLink}
        }
        setEngagementSettings({...tempSettings})
    }, [props.contentEngagementSettings])

    const newAd = () => {
        setSelectedAd(emptyAd);
        setNewAdModalOpened(true)
    }

    const editAd = (ad: Ad) => {
        setSelectedAd(ad);
        setNewAdModalOpened(true);
    }

    const handleAdPosition = (ad: Ad) => {
        if(ad["ad-type"] === "pre-roll"){
            return "Start"
        } else if(ad["ad-type"] === "post-roll"){
            return "End"
        } else {
            return dataToTimeVideo(ad.timestamp).toString()
        }
    }

    const { userId } = addTokenToHeader()

    const [playerModalOpened, setPlayerModalOpened] = React.useState<boolean>(false);

    const advertisingTableHeader = () => {
        if (engagementSettings.ads && engagementSettings.ads.length > 0) {
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

    const advertisingTableBody = (ads: Ad[]) => {
        return ads && ads.length > 0 ? ads.map((item, i) => {
            return {
                data: [
                    <Text key={'advertisingTableBodyPlacement' + item["ad-type"] + i} size={14} weight='med'>{item["ad-type"]}</Text>,
                    <Text key={'advertisingTableBodyPosition' + item.timestamp + i} size={14} weight='med'>{handleAdPosition(item)}</Text>,
                    <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>,
                    <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                        <ActionIcon id={"deleteTooltip" + item.id}>
                            {adSectionEditable && 
                            <IconStyle
                            onClick={() => { props.deleteContentAd(props.contentEngagementSettings.engagementSettings.ads.filter(ad => ad.id !== item.id ), props.contentEngagementSettings.engagementSettings.adsId, props.contentEngagementSettings.contentId) }}
                            >delete
                        </IconStyle>
                            
                            }
                            
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + item.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + item.id}>
                            <IconStyle onClick={() => editAd(item)}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + item.id}>Edit</Tooltip>
                    </IconContainer>
                ]
            }
        }) : null
    }

    const revertSettings = () => {
        setEngagementSettings(props.contentEngagementSettings.engagementSettings);
        setSettingsEdited(false)
        setAdSectionEditable(false);
        setMailSectionEditable(false);
        setEndScreenSectionEditable(false);
    }

    const handleSectionRevert = (section: string) => {
        switch (section) {
            case 'ads':
                props.saveContentEngagementSettings( {contentId: props.contentId, engagementSettings: {...engagementSettings, adsEnabled: false, ads: null}}).then(() => {
                    setEngagementSettings({...engagementSettings, adsEnabled: props.globalEngagementSettings.adsEnabled, ads: props.globalEngagementSettings.ads})
                    setAdSectionEditable(false)
                })
                break
            case 'brandImage':
                if (engagementSettings.brandImageID) {
                    props.deleteContentImage(engagementSettings.brandImageID)
                }
                props.saveContentEngagementSettings({contentId: props.contentId, engagementSettings: {...engagementSettings, brandImageID: null, brandImageLink: null, brandImagePadding: null, brandImagePosition: null, brandImageSize: null, brandImageURL: null}}).then(() => {
                    setEngagementSettings({...engagementSettings, brandImageID: props.globalEngagementSettings.brandImageID, brandImageLink: props.globalEngagementSettings.brandImageLink, brandImagePadding: props.globalEngagementSettings.brandImagePadding, brandImagePosition: props.globalEngagementSettings.brandImagePosition, brandImageSize: props.globalEngagementSettings.brandImageSize, brandImageURL: props.globalEngagementSettings.brandImageURL})
                    setBrandImageSectionEditable(false)
                })
                break
            case 'brandText': 
                props.saveContentEngagementSettings({contentId: props.contentId, engagementSettings: {...engagementSettings, brandText: null, brandTextLink: null, isBrandTextAsTitle: false}}).then(() => {
                    setEngagementSettings({...engagementSettings, brandText: props.globalEngagementSettings.brandText, brandTextLink: props.globalEngagementSettings.brandTextLink, isBrandTextAsTitle: props.globalEngagementSettings.isBrandTextAsTitle})
                    setBrandSectionEditable(false)
                })
                break
            case 'endScreenText': 
                props.saveContentEngagementSettings({contentId: props.contentId, engagementSettings: {...engagementSettings, endScreenText: null, endScreenTextLink: null}}).then(() => {
                    setEngagementSettings({...engagementSettings, endScreenText: props.globalEngagementSettings.endScreenText, endScreenTextLink: props.globalEngagementSettings.endScreenTextLink})
                    setEndScreenSectionEditable(false)
                })
                break
            default:
                null;
        }
    }

    const handleAdsLockChange = () => {
        if (adSectionEditable) {
            handleSectionRevert('ads')
        } else {
            setSettingsEdited(true)
            setEngagementSettings({...engagementSettings, adsEnabled: false, ads: null})
        }
        setAdSectionEditable(!adSectionEditable)
    }

    const handleBrandImageLockChange = () => {
        if (brandImageSectionEditable) {
            handleSectionRevert('brandImage')
        } else {
            setSettingsEdited(true)
            setUploadedFileUrl(null)
            setEngagementSettings({...engagementSettings, brandImageID: null, brandImageLink: null, brandImagePadding: null, brandImagePosition: null, brandImageSize: null, brandImageURL: null})
        }
        setBrandImageSectionEditable(!brandImageSectionEditable)
    }

    const handleBrandTextLockChange = () => {
        if (brandSectionEditable) {
            handleSectionRevert('brandText')
        } else {
            setSettingsEdited(true)
            setEngagementSettings({...engagementSettings, brandText: null, brandTextLink: null, isBrandTextAsTitle: false})
        }
        setBrandSectionEditable(!brandSectionEditable)
    }

    const handleEndScreenTextLockChange = () => {
        if (endScreenSectionEditable) {
            handleSectionRevert('endScreenText')
        } else {
            setSettingsEdited(true)
            setEngagementSettings({...engagementSettings, endScreenText: null, endScreenTextLink: null})
        }
        setEndScreenSectionEditable(!endScreenSectionEditable)
    }

    const handleSubmit = () => {
        setSaveAllButtonLoading(true)
        props.saveContentEngagementSettings({ 
            contentId: props.contentId, 
            engagementSettings: {
                ads: adSectionEditable ? engagementSettings.ads : null,
                adsEnabled: adSectionEditable ? engagementSettings.adsEnabled : false,
                adsId: adSectionEditable ? engagementSettings.adsId : null,
                brandImageID: brandImageSectionEditable ? engagementSettings.brandImageID : null,
                brandImageLink: brandImageSectionEditable ? engagementSettings.brandImageLink : null,
                brandImagePadding: brandImageSectionEditable ? engagementSettings.brandImagePadding : null,
                brandImagePosition: brandImageSectionEditable ? engagementSettings.brandImagePosition : null,
                brandImageSize: brandImageSectionEditable ? engagementSettings.brandImageSize : null,
                brandImageText: brandImageSectionEditable ? engagementSettings.brandImageText : null,
                brandImageURL: brandImageSectionEditable ? engagementSettings.brandImageURL : null,
                brandText: brandSectionEditable ? engagementSettings.brandText : null,
                brandTextLink: brandSectionEditable ? engagementSettings.brandTextLink : null,
                isBrandTextAsTitle: brandSectionEditable ? engagementSettings.isBrandTextAsTitle : null,
                endScreenText: endScreenSectionEditable ? engagementSettings.endScreenText : null,
                endScreenTextLink: endScreenSectionEditable ? engagementSettings.endScreenTextLink : null
            } 
        }).then(() => {
            setSettingsEdited(false)
            setSaveAllButtonLoading(false)
        })
    }

    return (
        <div>
            <Bubble className="flex items-center" type='info'>When the section is locked, the settings are inherited from your Global Engagement Settings. Click the <IconStyle>lock</IconStyle> padlock to override these settings. To revert back to your Global Engagement Settings you can click the padlock again.</Bubble>
            {getPrivilege('privilege-advertising') &&
                <Card className='my2'>
                    <Header className="mb2">
                        <TextStyle>
                            <Text size={20} weight='med'>Advertising</Text>
                        </TextStyle>
                        <IconStyle className='pointer' id="unlockAdSectionTooltip" onClick={() => {handleAdsLockChange()}}>
                            {adSectionEditable ? "lock_open" : "lock"}
                        </IconStyle>
                        <Tooltip target="unlockAdSectionTooltip">{adSectionEditable ? "Click to revert Advertising Settings" : "Click to edit Advertising Settings"}</Tooltip>
                    </Header>
                    <DisabledSection settingsEditable={adSectionEditable}>
                        <Toggle
                            className="mb2"
                            id='advertisingEnabled'
                            checked={engagementSettings.adsEnabled}
                            defaultChecked={engagementSettings.adsEnabled}
                            onChange={() => { setEngagementSettings({ ...engagementSettings, adsEnabled: !engagementSettings.adsEnabled }); setSettingsEdited(true) }} label='Advertising enabled'
                        />
                        <Text className="mb2 inline-block" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                        <div className='flex mb2'>
                            <IconStyle className="mr1">info_outlined</IconStyle>
                            <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the <a href="https://www.dacast.com/support/knowledgebase/">Knowledge Base</a></Text>
                        </div>
                        <div className="clearfix mb2">
                            <Button className='xs-show col mb1 col-12' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => { event.preventDefault(); setPlayerModalOpened(true) }}>Preview</Button>
                            <Button className="xs-show col col-12" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => { newAd() }}>New Ad</Button>
                        </div>
                        <Table id='advertisingTable' headerBackgroundColor="gray-10" header={advertisingTableHeader()} body={engagementSettings.ads && engagementSettings.ads.length > 0 ? advertisingTableBody(engagementSettings.ads) : emptyContentListBody("Create a new Ad before enabling Advertising")} />

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
                <Header className="mb2">
                    <TextStyle> 
                        <Text size={20} weight='med'>Brand Image</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockBrandImageSectionTooltip" onClick={() => {handleBrandImageLockChange()}}>
                        {brandImageSectionEditable ? "lock_open" : "lock"}
                    </IconStyle>
                </Header>
                
                <DisabledSection settingsEditable={brandImageSectionEditable}>
                    <Text className="py2" size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>
                    <div className="lg-col lg-col-12 mb1 mt25 flex">
                        <div className="lg-col lg-col-6 mr2">
                            <DragAndDrop className="flex flex-column" hasError={false} handleDrop={() => { }}>
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
                            <DropdownSingle className="col col-4 pr2" id="brandImagePlacementDropdown" dropdownTitle="Image Placement" list={{ 'Top Right': false, 'Top Left': false, 'Bottom Right': false, 'Bottom Left': false }} dropdownDefaultSelect={engagementSettings.brandImagePosition ? engagementSettings.brandImagePosition : 'Top Right'}
                            callback={(value: string) => {setEngagementSettings({...engagementSettings, brandImagePosition: value});setSettingsEdited(true)}}
                            ></DropdownSingle>
                            <Input className="col col-4 pr2" value={engagementSettings.brandImageSize ? engagementSettings.brandImageSize.toString() : ''} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImageSize: parseInt(event.currentTarget.value) });setSettingsEdited(true)}} label="Image Size" suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                            <Input className="col col-4" label="Padding (px)" value={engagementSettings.brandImagePadding ? engagementSettings.brandImagePadding.toString() : ''} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImagePadding: parseInt(event.currentTarget.value) });setSettingsEdited(true)}} />
                        <Input className="col col-12 mt2" label="Image Link" indicationLabel="optional" value={engagementSettings.brandImageLink ? engagementSettings.brandImageLink : ''} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImageLink: event.currentTarget.value });setSettingsEdited(true)}} />
                        </div>
                    </div>
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>Brand Text</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockBrandSectionTooltip" onClick={() => {handleBrandTextLockChange()}}>
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
                    <IconStyle className='pointer' id="unlockEndScreenSectionTooltip" onClick={() => {handleEndScreenTextLockChange()}}>
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
                settingsEdited &&
                    <div className="mt1">
                        <Button
                            isLoading={saveAllButtonLoading}
                            onClick={() => { handleSubmit()}}
                        >
                            Save
                        </Button>
                        <Button className="ml2" typeButton="tertiary" onClick={() => revertSettings()}>Discard</Button>
                    </div>
            }

            <Modal className='x-visible' hasClose={false} opened={newAdModalOpened} modalTitle={selectedAd.id === "-1" ? "New Ad" : "Edit Ad"} size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                {
                    newAdModalOpened &&
                        <ContentNewAdModal {...props} toggle={setNewAdModalOpened} selectedAd={selectedAd} />
                }
            </Modal>
            {
                playerModalOpened && <PreviewModal contentId={userId + '-' + props.contentType + '-' + props.contentEngagementSettings.contentId} toggle={setPlayerModalOpened} isOpened={playerModalOpened} />
            }
            <Prompt when={engagementSettings !== props.contentEngagementSettings.engagementSettings} message='' />
        </div>
    )
}
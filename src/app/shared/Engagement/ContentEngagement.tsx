import React from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { IconStyle, IconContainer, ActionIcon } from '../../../shared/Common/Icon';
import { Table } from '../../../components/Table/Table';
import { Header, DisabledSection, AdTableURLContainer } from './EngagementStyle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Ad, MailCatcher, ContentEngagementSettings, EngagementInfo } from '../../redux-flow/store/Settings/Interactions/types';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType, DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ContentNewAdModal } from './ContentNewAdModal';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Prompt } from 'react-router';
import { dataToTimeVideo } from '../../../utils/formatUtils';
import { userToken } from '../../utils/services/token/tokenService';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { emptyContentListBody } from '../List/emptyContentListState';
import { PreviewModal } from '../Common/PreviewModal';
import { DragAndDrop } from '../../../components/DragAndDrop/DragAndDrop';
import { ImageStyle, ButtonStyle } from '../../pages/Account/Company/CompanyStyle';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { imagePlacementDropdownList } from '../../../utils/DropdownLists';

export interface ContentEngagementComponentProps {
    contentEngagementSettings: ContentEngagementSettings;
    globalEngagementSettings: EngagementInfo;
    contentType?: string;
    contentId: string;
    getContentEngagementSettings: (contentId: string, contentType: string) => Promise<void>;
    saveContentEngagementSettings: (data: ContentEngagementSettings, contentType: string) => Promise<void>;
    lockSection: (section: string, contentId: string, contentType: string, unlock?: boolean) => Promise<void>;
    saveContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    createContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    deleteContentAd: (data: Ad[], contentId: string, contentType: string) => Promise<void>;
    getUploadUrl: (uploadType: string, contentId: string, contentType: string) => Promise<void>;
    uploadContentImage: (data: File, uploadUrl: string) => Promise<void>;
    deleteContentImage: (contentId: string, contentType: string) => Promise<void>;
}

export const ContentEngagementPage = (props: ContentEngagementComponentProps) => {

    const emptyAd: Ad = {
        id: "-1",
        "ad-type": "",
        timestamp: null,
        url: ""
    }

    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);
    const [engagementSettings, setEngagementSettings] = React.useState<EngagementInfo>(props.contentEngagementSettings.engagementSettings);
    const [selectedAd, setSelectedAd] = React.useState<Ad>(emptyAd)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false);
    const [saveAllButtonLoading, setSaveAllButtonLoading] = React.useState<boolean>(false);
    const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>(props.contentEngagementSettings.engagementSettings.brandImageSettings.brandImageURL || null);
    const [uploadButtonLoading, setUploadButtonLoading] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [logoFile, setLogoFile] = React.useState<File>(null);

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
                    props.getUploadUrl('player-watermark', props.contentId, props.contentType);
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
        props.deleteContentImage(props.contentId, props.contentType);
    }

    React.useEffect(() => {
        setEngagementSettings({...engagementSettings, adsSettings: {...engagementSettings.adsSettings, ads: props.contentEngagementSettings.engagementSettings.adsSettings.ads}})
    }, [props.contentEngagementSettings.engagementSettings.adsSettings.ads])

    React.useEffect(() => {
        if(props.contentEngagementSettings.engagementSettings.uploadurl) {
            props.uploadContentImage(logoFile, props.contentEngagementSettings.engagementSettings.uploadurl ).then(() => {
                setUploadButtonLoading(false)
                setTimeout(() => {
                    props.getContentEngagementSettings(props.contentId, props.contentType)
                }, 3000)
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

    const userId = userToken.getUserInfoItem('custom:dacast_user_id')

    const [playerModalOpened, setPlayerModalOpened] = React.useState<boolean>(false);

    const advertisingTableHeader = () => {
        if (engagementSettings.adsSettings.ads && engagementSettings.adsSettings.ads.length > 0) {
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
                    <Text key={'advertisingTableBodyPlacement' + item["ad-type"] + i} size={14} weight='med'>{capitalizeFirstLetter(item["ad-type"])}</Text>,
                    <Text key={'advertisingTableBodyPosition' + item.timestamp + i} size={14} weight='med'>{handleAdPosition(item)}</Text>,
                    <AdTableURLContainer>
                        <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>
                    </AdTableURLContainer>,
                    <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                        <ActionIcon id={"deleteTooltip" + item.id}>
                            {!engagementSettings.adsSettings.locked && 
                            <IconStyle
                            onClick={() => { props.deleteContentAd(props.contentEngagementSettings.engagementSettings.adsSettings.ads.filter(ad => ad.id !== item.id ), props.contentEngagementSettings.contentId, props.contentType) }}
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
    }

    const handleSectionRevert = (section: string) => {
        switch (section) {
            case 'ads':
                props.lockSection('ads', props.contentId, props.contentType).then(() => {
                    setEngagementSettings({
                        ...engagementSettings,
                        adsSettings: {
                            locked: true,
                            adsEnabled: props.globalEngagementSettings.adsSettings.adsEnabled, 
                            ads: props.globalEngagementSettings.adsSettings.ads
                        }
                    })
                })
                break
            case 'brandImage':
                if (engagementSettings.brandImageSettings.brandImageURL) {
                    props.deleteContentImage(props.contentId, props.contentType)
                }
                props.lockSection('brand-image', props.contentId, props.contentType).then(() => {
                    setEngagementSettings({
                        ...engagementSettings, 
                        brandImageSettings: {
                            locked: true,
                            brandImageLink: props.globalEngagementSettings.brandImageSettings.brandImageLink, 
                            brandImagePadding: props.globalEngagementSettings.brandImageSettings.brandImagePadding, 
                            brandImagePosition: props.globalEngagementSettings.brandImageSettings.brandImagePosition, 
                            brandImageSize: props.globalEngagementSettings.brandImageSettings.brandImageSize, 
                            brandImageURL: props.globalEngagementSettings.brandImageSettings.brandImageURL
                        }
                    })
                })
                break
            case 'brandText': 
                props.lockSection('brand-text', props.contentId, props.contentType).then(() => {
                    setEngagementSettings({
                        ...engagementSettings, 
                        brandTextSettings: {
                            locked: true,
                            brandText: props.globalEngagementSettings.brandTextSettings.brandText, 
                            brandTextLink: props.globalEngagementSettings.brandTextSettings.brandTextLink, 
                            isBrandTextAsTitle: props.globalEngagementSettings.brandTextSettings.isBrandTextAsTitle
                        }
                    })
                })
                break
            case 'endScreenText': 
                props.lockSection('end-screen-text', props.contentId, props.contentType).then(() => {
                    setEngagementSettings({
                        ...engagementSettings, 
                        endScreenSettings: {
                            locked: true,
                            endScreenText: props.globalEngagementSettings.endScreenSettings.endScreenText, 
                            endScreenTextLink: props.globalEngagementSettings.endScreenSettings.endScreenTextLink
                        }
                    })
                })
                break
            default:
                null;
        }
    }

    const handleAdsLockChange = () => {
        if (!engagementSettings.adsSettings.locked) {
            handleSectionRevert('ads')
        } else {
            setSettingsEdited(true)
            props.lockSection('ads', props.contentId, props.contentType, true).then(() => {
                setEngagementSettings({
                    ...engagementSettings,
                    adsSettings:{
                        locked: false,
                        ads: [],
                        adsEnabled: false
                    }
                })
            })
        }
    }

    const handleBrandImageLockChange = () => {
        if (!engagementSettings.brandImageSettings.locked) {
            handleSectionRevert('brandImage')
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(engagementSettings).filter(f => {return engagementSettings[f] && !engagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: engagementSettings[next]}}, {}),
                    brandImageSettings: {
                        locked:false,
                        brandImageLink: '',
                        brandImagePadding: NaN,
                        brandImagePosition: '',
                        brandImageSize: NaN,
                        brandImageURL: ''
                    }
                }          
            }, props.contentType).then(() => {
                setSettingsEdited(false)
                setEngagementSettings({
                    ...engagementSettings,
                    brandImageSettings: {
                        locked:false,
                        brandImageLink: '',
                        brandImagePadding: NaN,
                        brandImagePosition: '',
                        brandImageSize: NaN,
                        brandImageURL: ''
                    }
                })
                setUploadedFileUrl(null)

            })            
        }
    }

    const handleBrandTextLockChange = () => {
        if (!engagementSettings.brandTextSettings.locked) {
            handleSectionRevert('brandText')
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(engagementSettings).filter(f => {return engagementSettings[f] && !engagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: engagementSettings[next]}}, {}),
                    brandTextSettings: {
                        locked:false,
                        brandText: '',
                        brandTextLink: '',
                        isBrandTextAsTitle: false
                    }
                }          
            }, props.contentType).then(() => {
                setSettingsEdited(false)
                setEngagementSettings({
                    ...engagementSettings,
                    brandTextSettings: {
                        locked:false,
                        brandText: '',
                        brandTextLink: '',
                        isBrandTextAsTitle: false
                    }
                })
            })        
            }
    }

    const handleEndScreenTextLockChange = () => {
        if (!engagementSettings.endScreenSettings.locked) {
            handleSectionRevert('endScreenText')
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(engagementSettings).filter(f => {return engagementSettings[f] && !engagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: engagementSettings[next]}}, {}),
                    endScreenSettings: {
                        locked:false,
                        endScreenText: '',
                        endScreenTextLink: ''
                    }
                }          
            }, props.contentType).then(() => {
                setSettingsEdited(false)
                setEngagementSettings({
                    ...engagementSettings,
                    endScreenSettings: {
                        locked:false,
                        endScreenText: '',
                        endScreenTextLink: ''
                    }
                })
            })
        }
    }

    const handleSubmit = () => {
        setSaveAllButtonLoading(true)
        props.saveContentEngagementSettings({ 
            contentId: props.contentId, 
            engagementSettings: Object.keys(engagementSettings).filter(f => {return engagementSettings[f] && !engagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: engagementSettings[next]}}, {})
        }, props.contentType).then(() => {
            setSettingsEdited(false)
            setSaveAllButtonLoading(false)
        })
    }

    return (
        <div>
            <Bubble className="flex items-center" type='info'>When the section is locked, the settings are inherited from your Global Engagement Settings. Click the <IconStyle>lock</IconStyle> padlock to override these settings. To revert back to your Global Engagement Settings you can click the padlock again.</Bubble>
            {userToken.getPrivilege('privilege-advertising') &&
                <Card className='my2'>
                    <Header className="mb2">
                        <div>
                            <Text size={20} weight='med'>Advertising</Text>
                        </div>
                        <IconStyle className='pointer' id="unlockAdSectionTooltip" onClick={() => {handleAdsLockChange()}}>
                            {!engagementSettings.adsSettings.locked ? "lock_open" : "lock"}
                        </IconStyle>
                        <Tooltip target="unlockAdSectionTooltip">{!engagementSettings.adsSettings.locked ? "Click to revert Advertising Settings" : "Click to edit Advertising Settings"}</Tooltip>
                    </Header>
                    <DisabledSection settingsEditable={!engagementSettings.adsSettings.locked}>
                        <Toggle
                            className="mb2"
                            id='advertisingEnabled'
                            checked={engagementSettings.adsSettings.adsEnabled}
                            defaultChecked={engagementSettings.adsSettings.adsEnabled}
                            onChange={() => { setEngagementSettings({ ...engagementSettings, adsSettings: {...engagementSettings.adsSettings, adsEnabled: !engagementSettings.adsSettings.adsEnabled }}); setSettingsEdited(true) }} label='Advertising enabled'
                        />
                        <Text className="mb2 inline-block" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                        <div className='flex mb2'>
                            <IconStyle className="mr1">info_outlined</IconStyle>
                            <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the <a href={getKnowledgebaseLink("Ads")}>Knowledge Base</a></Text>
                        </div>
                        <div className="clearfix mb2">
                            <Button className='xs-show col mb1 col-12' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => { event.preventDefault(); setPlayerModalOpened(true) }}>Preview</Button>
                            <Button className="xs-show col col-12" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => { newAd() }}>New Ad</Button>
                        </div>
                        <Table id='advertisingTable' headerBackgroundColor="gray-10" header={advertisingTableHeader()} body={engagementSettings.adsSettings.ads && engagementSettings.adsSettings.ads.length > 0 ? advertisingTableBody(engagementSettings.adsSettings.ads) : emptyContentListBody("Create a new Ad before enabling Advertising")} />

                    </DisabledSection>
                </Card>
            }

            {/* <Card className='my2'>
                <Header className="mb2">
                    <div>
                        <Text size={20} weight='med'>Email Catcher</Text>
                    </div>
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
                    <div> 
                        <Text size={20} weight='med'>Brand Image</Text>
                    </div>
                    <IconStyle className='pointer' id="unlockBrandImageSectionTooltip" onClick={() => {handleBrandImageLockChange()}}>
                        {!engagementSettings.brandImageSettings.locked ? "lock_open" : "lock"}
                    </IconStyle>
                </Header>
                
                <DisabledSection settingsEditable={!engagementSettings.brandImageSettings.locked}>
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
                            <DropdownSingle className="col col-4 pr2" id="brandImagePlacementDropdown" dropdownTitle="Image Placement" list={imagePlacementDropdownList} dropdownDefaultSelect={engagementSettings.brandImageSettings.brandImagePosition || 'Top Right'}
                            callback={(item: DropdownSingleListItem) => {setEngagementSettings({...engagementSettings, brandImageSettings: {...engagementSettings.brandImageSettings, brandImagePosition: item.title }});setSettingsEdited(true)}}
                            />
                            <Input className="col col-4 pr2" value={engagementSettings.brandImageSettings.brandImageSize ? engagementSettings.brandImageSettings.brandImageSize.toString() : ''} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImageSettings: {...engagementSettings.brandImageSettings, brandImageSize: parseInt(event.currentTarget.value)}});setSettingsEdited(true)}} label="Image Size" suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                            <Input className="col col-4" label="Padding (px)" value={engagementSettings.brandImageSettings.brandImagePadding ? engagementSettings.brandImageSettings.brandImagePadding.toString() : ''} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImageSettings: {...engagementSettings.brandImageSettings, brandImagePadding: parseInt(event.currentTarget.value)}});setSettingsEdited(true)}} />
                        <Input className="col col-12 mt2" label="Image Link" indicationLabel="optional" value={engagementSettings.brandImageSettings.brandImageLink || ''} onChange={(event) => {setEngagementSettings({ ...engagementSettings, brandImageSettings: {...engagementSettings.brandImageSettings, brandImageLink: event.currentTarget.value }});setSettingsEdited(true)}} />
                        </div>
                    </div>
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <div>
                        <Text size={20} weight='med'>Brand Text</Text>
                    </div>
                    <IconStyle className='pointer' id="unlockBrandSectionTooltip" onClick={() => {handleBrandTextLockChange()}}>
                        {!engagementSettings.brandTextSettings.locked ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockBrandSectionTooltip">{!engagementSettings.brandTextSettings.locked ? "Click to revert Brand Text Settings" : "Click to edit Brand Text Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={!engagementSettings.brandTextSettings.locked}>
                    <Text size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>
                    <div className='flex'>
                        <Input
                            disabled={engagementSettings.brandTextSettings.isBrandTextAsTitle} className='my2 pr1 col col-8'
                            label='Brand Text'
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, brandTextSettings: {...engagementSettings.brandTextSettings, brandText: event.currentTarget.value }}); setSettingsEdited(true) }}
                            value={engagementSettings.brandTextSettings.brandText || ""}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='Brand Text Link'
                            value={engagementSettings.brandTextSettings.brandTextLink || ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, brandTextSettings: {...engagementSettings.brandTextSettings, brandTextLink: event.currentTarget.value }}); setSettingsEdited(true) }} />
                    </div>
                    <Toggle className='' label='Use content title as Brand Text' defaultChecked={engagementSettings.brandTextSettings.isBrandTextAsTitle} onChange={() => { setEngagementSettings({ ...engagementSettings, brandTextSettings: {...engagementSettings.brandTextSettings, isBrandTextAsTitle: !engagementSettings.brandTextSettings.isBrandTextAsTitle }}); setSettingsEdited(true) }} />
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <div>
                        <Text size={20} weight='med'>End Screen Text</Text>
                    </div>
                    <IconStyle className='pointer' id="unlockEndScreenSectionTooltip" onClick={() => {handleEndScreenTextLockChange()}}>
                        {!engagementSettings.endScreenSettings.locked ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockEndScreenSectionTooltip">{!engagementSettings.endScreenSettings.locked ? "Click to revert End Screen Text Settings" : "Click to edit End Screen Text Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={!engagementSettings.endScreenSettings.locked}>
                    <Text size={14} weight='reg' color='gray-3'>This will be displayed when the content ends.</Text>
                    <div className='flex'>
                        <Input
                            className='my2 pr1 col col-8'
                            label='End Screen Text'
                            value={engagementSettings.endScreenSettings.endScreenText || ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, endScreenSettings: {...engagementSettings.endScreenSettings, endScreenText: event.currentTarget.value }}); setSettingsEdited(true) }}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='End Screen Text Link'
                            value={engagementSettings.endScreenSettings.endScreenTextLink || ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, endScreenSettings: {...engagementSettings.endScreenSettings, endScreenTextLink: event.currentTarget.value }}); setSettingsEdited(true) }} />
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
                        <ContentNewAdModal {...props} contentEngagementSettings={{contentId: props.contentId, engagementSettings: engagementSettings}} toggle={setNewAdModalOpened} selectedAd={selectedAd} />
                }
            </Modal>
            {
                playerModalOpened && <PreviewModal contentId={userId + '-' + props.contentType + '-' + props.contentEngagementSettings.contentId} toggle={setPlayerModalOpened} isOpened={playerModalOpened} />
            }
            <Prompt when={settingsEdited} message='' />
        </div>
    )
}
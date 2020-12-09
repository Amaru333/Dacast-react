import React from 'react'
import { Card } from '../../../components/Card/Card'
import { Header } from './EngagementStyle'
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { DisabledSection } from '../Common/MiscStyle';
import { DragAndDrop } from '../../../components/DragAndDrop/DragAndDrop';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ButtonStyle, ImageStyle } from '../../pages/Account/Company/CompanyStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { ContentEngagementSettings, EngagementInfo } from '../../redux-flow/store/Settings/Interactions/types';
import { imagePlacementDropdownList } from '../../../utils/DropdownLists';


export const EngagementBrandImage = (props: {globalEngagementSettings: EngagementInfo, localEngagementSettings: EngagementInfo, setLocalEngagementSettings: React.Dispatch<React.SetStateAction<EngagementInfo>>,  setSettingsEdited: React.Dispatch<React.SetStateAction<boolean>>, getUploadUrl: (uploadType: string, contentId: string, contentType: string) => Promise<void>, uploadFile: (data: File, uploadUrl: string) => Promise<void>, getEngagementSettings: () => Promise<void>, deleteFile?: (targetId: string) => Promise<void>, deleteContentImage?: (contentId: string, contentType: string) => Promise<void>, handleSectionRevert?: (section: string) => void, saveContentEngagementSettings?: (data: ContentEngagementSettings, contentType: string) => Promise<void>, contentId?: string, contentType?: string, contentEngagementSettings?: ContentEngagementSettings}) => {

    const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>(props.localEngagementSettings.brandImageSettings.brandImageURL || null)
    const [uploadButtonLoading, setUploadButtonLoading] = React.useState<boolean>(false)
    const [logoFile, setLogoFile] = React.useState<File>(null);
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

    React.useEffect(() => {
        if(props.globalEngagementSettings.uploadurl) {
            props.uploadFile(logoFile, props.globalEngagementSettings.uploadurl).then(() => {
                setUploadButtonLoading(false)
                setTimeout(() => {
                    props.getEngagementSettings()
                }, 3000)
            })
        }
    }, [props.globalEngagementSettings.uploadurl])
    
    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setUploadedFileUrl(null);
        // props.contentId ? 
        // props.deleteContentImage(props.contentId, props.contentType) :
        props.deleteFile(props.localEngagementSettings.brandImageSettings.brandImageURL)
    }

    const handleBrandImageLockChange = () => {
        if (!props.localEngagementSettings.brandImageSettings.locked) {
            props.handleSectionRevert('brandImage')
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(props.localEngagementSettings).filter(f => {return props.localEngagementSettings[f] && !props.localEngagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: props.localEngagementSettings[next]}}, {}),
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
                props.setSettingsEdited(false)
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings,
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

    return (
        <Card className="my2">
                <Header className="mb2">
                    <div> 
                        <Text size={20} weight='med'>Brand Image</Text>
                    </div>
                    { props.contentType &&
                        <IconStyle className='pointer' id="unlockBrandImageSectionTooltip" onClick={() => {handleBrandImageLockChange()}}>
                        {!props.localEngagementSettings.brandImageSettings.locked ? "lock_open" : "lock"}
                        </IconStyle>
                    }
                    
                </Header>
                
                <DisabledSection settingsEditable={!props.localEngagementSettings.brandImageSettings.locked || !props.contentType}>
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
                            <DropdownSingle className="col col-4 pr2" id="brandImagePlacementDropdown" dropdownTitle="Image Placement" list={imagePlacementDropdownList} dropdownDefaultSelect={props.localEngagementSettings.brandImageSettings.brandImagePosition || 'Top Right'}
                            callback={(item: DropdownSingleListItem) => {props.setLocalEngagementSettings({...props.localEngagementSettings, brandImageSettings: {...props.localEngagementSettings.brandImageSettings, brandImagePosition: item.title }});props.setSettingsEdited(true)}}
                            />
                            <Input className="col col-4 pr2" value={props.localEngagementSettings.brandImageSettings.brandImageSize ? props.localEngagementSettings.brandImageSettings.brandImageSize.toString() : ''} onChange={(event) => {props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandImageSettings: {...props.localEngagementSettings.brandImageSettings, brandImageSize: parseInt(event.currentTarget.value)}});props.setSettingsEdited(true)}} label="Image Size" suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                            <Input className="col col-4" label="Padding (px)" value={props.localEngagementSettings.brandImageSettings.brandImagePadding ? props.localEngagementSettings.brandImageSettings.brandImagePadding.toString() : ''} onChange={(event) => {props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandImageSettings: {...props.localEngagementSettings.brandImageSettings, brandImagePadding: parseInt(event.currentTarget.value)}});props.setSettingsEdited(true)}} />
                        <Input className="col col-12 mt2" label="Image Link" indicationLabel="optional" value={props.localEngagementSettings.brandImageSettings.brandImageLink || ''} onChange={(event) => {props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandImageSettings: {...props.localEngagementSettings.brandImageSettings, brandImageLink: event.currentTarget.value }});props.setSettingsEdited(true)}} />
                        </div>
                    </div>
                </DisabledSection>
            </Card>
    )
}
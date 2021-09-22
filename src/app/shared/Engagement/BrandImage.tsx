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
import { imagePlacementDropdownList } from '../../../utils/DropdownLists';
import { EngagementComponentProps } from '../../redux-flow/store/Content/Engagement/types';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';


export const EngagementBrandImage = (props: EngagementComponentProps) => {

    const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>(props.localEngagementSettings.brandImageSettings.brandImageURL || null)
    const [uploadButtonLoading, setUploadButtonLoading] = React.useState<boolean>(false)
    const [logoFile, setLogoFile] = React.useState<File>(null);
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const { t } = useTranslation()

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
                    props.getUploadUrl(props.contentId, props.contentType);
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
        if(props.localEngagementSettings.uploadurl) {
            props.uploadBrandImage(logoFile, props.localEngagementSettings.uploadurl).then(() => {
                setUploadButtonLoading(false)
                setTimeout(() => {
                    props.getEngagementSettings(props.contentId, props.contentType)
                }, 3000)
            })

        }
    }, [props.localEngagementSettings.uploadurl])

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            handleDrop(e.target.files);
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setUploadedFileUrl(null);
        if (!props.contentType) {
            props.deleteFile(props.localEngagementSettings.brandImageSettings.brandImageURL)
         } else {
            props.deleteFile(props.contentId, props.contentType)
         }
    }

    const handleBrandImageLockChange = () => {
        if (!props.localEngagementSettings.brandImageSettings.locked) {
                if (props.localEngagementSettings.brandImageSettings.brandImageURL) {
                    props.deleteFile(props.contentId, props.contentType)
                }
                props.lockSection('brand-image', props.contentId, props.contentType).then(() => {
                    props.setLocalEngagementSettings({
                        ...props.localEngagementSettings,
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
                        <Text size={20} weight='med'>{t('common_engagement_brand_image_title')}</Text>
                    </div>
                    { props.contentType &&
                        <IconStyle className='pointer' id="unlockBrandImageSectionTooltip" onClick={() => {handleBrandImageLockChange()}}>
                        {!props.localEngagementSettings.brandImageSettings.locked ? "lock_open" : "lock"}
                        </IconStyle>
                    }

                </Header>

                <DisabledSection settingsEditable={!props.localEngagementSettings.brandImageSettings.locked || !props.contentType}>
                    <Text className="py2" size={14} weight='reg' color='gray-3'>{t('common_engagement_brand_image_text')}</Text>
                    <div className={"lg-col lg-col-12 mb1 mt25 flex " + (isMobile ? "flex-column" : '')}>
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
                            <div className='center'><Text size={14} weight='med' color='gray-1'>{t('common_engagement_brand_image_drag_and_drop_instruction')}</Text></div>
                            <div className='center' style={{ marginTop: 2 }}><Text size={14} weight='reg' color='gray-3'>{t('common_engagement_brand_image_drag_and_drop_info_text_1')}</Text></div>
                            <div className='center'><Text size={12} weight='reg' color='gray-3'>{t('common_engagement_brand_image_drag_and_drop_info_text_2')} </Text></div>
                            <ButtonStyle className='my1'>
                                <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBrowse(e)} ref={brandImageBrowseButtonRef} style={{display:'none'}} id='browseButton' />
                                <Button onClick={() => {brandImageBrowseButtonRef.current.click()} } style={{marginBottom:26}} sizeButton='xs' typeButton='secondary' buttonColor='blue'>
                                    {t('common_button_text_browse')}
                                </Button>
                            </ButtonStyle>
                            </>
                                }
                            </DragAndDrop>
                            <div className="mb25" ><Text size={10} weight='reg' color='gray-3'>{t('common_engagement_brand_image_image_size_limit')} </Text></div>
                        </div>
                        <div className="sm-col sm-col-6 col-12">
                            <DropdownSingle className="sm-col sm-col-4 col-12 pr2" id="brandImagePlacementDropdown" dropdownTitle={t('common_engagement_brand_image_image_placement_dropdown_title')} list={imagePlacementDropdownList.map(b => {return {title: t(b.title), data: {...b.data}}})} dropdownDefaultSelect={t(imagePlacementDropdownList.find(b => b.data.id === props.localEngagementSettings.brandImageSettings.brandImagePosition) ? imagePlacementDropdownList.find(b => b.data.id === props.localEngagementSettings.brandImageSettings.brandImagePosition).title : imagePlacementDropdownList[0].title)}
                            callback={(item: DropdownSingleListItem) => {props.setLocalEngagementSettings({...props.localEngagementSettings, brandImageSettings: {...props.localEngagementSettings.brandImageSettings, brandImagePosition: item.title }});props.setSettingsEdited(true)}}
                            />
                            <div className={isMobile ? "col col-12 flex pr2 pt2" : ''}>
                            <Input className="sm-col sm-col-4 col-6 pr2" value={props.localEngagementSettings.brandImageSettings.brandImageSize ? props.localEngagementSettings.brandImageSettings.brandImageSize.toString() : ''} onChange={(event) => {props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandImageSettings: {...props.localEngagementSettings.brandImageSettings, brandImageSize: parseInt(event.currentTarget.value)}});props.setSettingsEdited(true)}} label={t('common_engagment_brand_image_image_size_input_title')} suffix={<Text weight="med" size={14} color="gray-3">%</Text>} />
                            <Input className="sm-col sm-col-4 col-6" label={t('common_engagement_brand_image_padding_input_title')} value={props.localEngagementSettings.brandImageSettings.brandImagePadding ? props.localEngagementSettings.brandImageSettings.brandImagePadding.toString() : ''} onChange={(event) => {props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandImageSettings: {...props.localEngagementSettings.brandImageSettings, brandImagePadding: parseInt(event.currentTarget.value)}});props.setSettingsEdited(true)}} />
                            </div>

                            <Input className="col col-12 mt2" label={t('common_engagement_brand_image_image_link_input_title')} indicationLabel={t('common_input_text_optional')} value={props.localEngagementSettings.brandImageSettings.brandImageLink || ''} onChange={(event) => {props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandImageSettings: {...props.localEngagementSettings.brandImageSettings, brandImageLink: event.currentTarget.value }});props.setSettingsEdited(true)}} />
                        </div>
                    </div>
                </DisabledSection>
            </Card>
    )
}

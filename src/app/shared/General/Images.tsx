import React from 'react';
import { Text } from '../../../components/Typography/Text'
import { ColorPickerLabel } from '../../pages/Paywall/Theming/Theming';
import { ColorPicker } from '../../../components/ColorPicker/ColorPicker';
import { ImageContainer, ImageArea, ImageSection, SelectedImage, ButtonSection, ImagesContainer } from "../../shared/General/GeneralStyle"
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ContentDetails } from '../../redux-flow/store/Content/General/types';
import { ContentType } from '../../redux-flow/store/Common/types';
import { useTranslation } from 'react-i18next';

interface GeneralImagesProps {
    contentType: ContentType, 
    localContentDetails: ContentDetails, 
    contentDetails: ContentDetails, 
    setLocalContentDetails: React.Dispatch<React.SetStateAction<ContentDetails>>, 
    setHasChanged: React.Dispatch<React.SetStateAction<boolean>>, 
    deleteFile: (contentId: string, targetId: string, uploadType: string, contentType: ContentType) => Promise<void>, 
    setImageModalTitle: React.Dispatch<React.SetStateAction<string>>, 
    setSelectedImageName: React.Dispatch<React.SetStateAction<string>>, 
    setImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>

}
export const GeneralImages = (props: GeneralImagesProps) => {

    let posterEnable = props.contentDetails.poster && Object.keys(props.contentDetails.poster).length !== 0;
    let headerEnable = posterEnable;
    let splashScreenEnable = props.contentDetails.splashscreen && Object.keys(props.contentDetails.splashscreen).length !== 0;
    let thumbnailEnable = props.contentDetails.thumbnail && Object.keys(props.contentDetails.thumbnail).length !== 0;
    const { t } = useTranslation()
    
    const handleImageDelete = (imageType: string) => {
        props.deleteFile(props.contentDetails.id, props.contentType === 'expo' ? props.contentDetails[imageType].assetId : props.contentDetails[imageType].targetID, props.contentType, imageType)
    }

    return (
        <div className="col col-12">
            {
                props.contentType === "expo" ?
                    <>
                        <div className="col col-12">
                            <Text className="col col-12" size={20} weight="med">Appearance</Text>
                            <Text className="col col-12 mb25 pt1" size={14} weight="reg">How your Expo looks when seen by your viewers.</Text>
                            <div className="mxn2">
                                <div className='mb1 col col-6 sm-col-3 px2'>
                                    <ColorPickerLabel>
                                        <Text size={14} weight='med'>Header Colour</Text>
                                    </ColorPickerLabel>
                                    <ColorPicker
                                        defaultColor={props.localContentDetails.appearance && props.localContentDetails.appearance.headerColor ? props.localContentDetails.appearance.headerColor : 'white'}
                                        callback={(color: string) =>  { props.setHasChanged(true); props.setLocalContentDetails({...props.localContentDetails, appearance: {...props.localContentDetails.appearance, headerColor: color}}) } }
                                    />
                                </div>
                                <div className='mb1 col col-6 sm-col-3 px2'>
                                    <ColorPickerLabel>
                                        <Text size={14} weight='med'>Font Colour</Text>
                                    </ColorPickerLabel>
                                    <ColorPicker
                                        defaultColor={props.localContentDetails.appearance && props.localContentDetails.appearance.fontColor ? props.localContentDetails.appearance.fontColor : 'white'}
                                        callback={(color: string) => { props.setHasChanged(true); props.setLocalContentDetails({...props.localContentDetails, appearance: {...props.localContentDetails.appearance, fontColor: color}})}}
                                    />
                                </div>
                            </div>
                        </div>
                        <ImageContainer className="col col-6">
                            <div className="flex flex-center">
                                <Text size={16} weight="med" className="mr1">Header</Text>
                                <IconStyle id="splashscreenTooltip">info_outlined</IconStyle>
                                <Tooltip target="splashscreenTooltip">Replaces Header Color if enabled.</Tooltip>
                            </div>
                            <div className="flex flex-center">
                                <ImageArea className="mt2 col col-12">
                                    <ButtonSection>
                                        {
                                            headerEnable &&
                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => handleImageDelete("poster")} >Delete</Button>
                                        }
                                        <Button
                                            className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                            onClick={() => { props.setImageModalTitle("Change Poster"); props.setSelectedImageName(props.contentDetails.poster && props.contentDetails.poster.url); props.setImageModalOpen(true) }}>
                                            {
                                                headerEnable ?
                                                    "Change" : "Add"
                                            }
                                        </Button>
                                    </ButtonSection>
                                    {headerEnable && <ImageSection> <SelectedImage src={props.contentDetails.poster.url} /></ImageSection>}
                                </ImageArea>
                            </div>
                            <Text size={10} weight="reg" color="gray-3">Minimum 480px x 480px, formats: JPG, PNG, SVG, GIF</Text>
                        </ImageContainer>
                    </> 
                    :
                    <>
                        <div className="thumbnail col col-12">
                            <Text className="col col-12" size={20} weight="med">{t('common_content_general_images_title')}</Text>
                            <Text className="col col-12 pt1" size={14} weight="reg">{props.contentType === 'expo' ? "How your Expo looks when seen by your viewers." : t('common_content_general_images_info_text')}</Text>
                            <ImagesContainer className="col col-12 pt2">
                                <ImageContainer className="mr2 xs-mr0 xs-mb25">
                                    <div className="flex flex-center">
                                        <Text size={16} weight="med" className="mr1">{t('common_content_general_images_splashscreen_title')}</Text>
                                        <IconStyle id="splashscreenTooltip">info_outlined</IconStyle>
                                        <Tooltip target="splashscreenTooltip">{t('common_content_general_images_splashscreen_text')}</Tooltip>
                                    </div>
                                    <ImageArea className="mt2">
                                        <ButtonSection>
                                            {
                                                (splashScreenEnable && props.contentType !== "vod") &&
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => handleImageDelete("splashscreen")} >Delete</Button>
                                            }
                                            <Button
                                                className="clearfix right my1 mr1" sizeButton="xs" typeButton="secondary"
                                                onClick={() => { props.setImageModalTitle("Change Splashscreen"); props.setSelectedImageName(props.contentDetails.splashscreen.url); props.setImageModalOpen(true) }}>
                                                {
                                                    splashScreenEnable ?
                                                        t('common_button_text_change') : t('common_button_text_add')
                                                }
                                            </Button>
                                        </ButtonSection>
                                        {splashScreenEnable && <ImageSection> <SelectedImage src={props.contentDetails.splashscreen.url} /></ImageSection>}
                                    </ImageArea>
                                    <Text size={10} weight="reg" color="gray-3">{t('common_content_general_images_splashscreen_dimensions')}</Text>
                                </ImageContainer>
                                <ImageContainer className="mr2 xs-mb25 xs-mr0">
                                    <div className="flex flex-center">
                                        <Text size={16} weight="med" className="mr1">{t('common_content_general_images_thumbnail_title')}</Text>
                                        <IconStyle id="thumbnailTooltip">info_outlined</IconStyle>
                                        <Tooltip target="thumbnailTooltip">{t('common_content_general_images_thumbnail_info_text')}</Tooltip>
                                    </div>
                                    <ImageArea className="mt2">
                                        <ButtonSection>
                                            {
                                                (thumbnailEnable && props.contentType !== "vod") &&
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => handleImageDelete("thumbnail")}>Delete</Button>
                                            }
                                            <Button sizeButton="xs" className="clearfix right m1" typeButton="secondary" onClick={() => { props.setImageModalTitle("Change Thumbnail"); props.setSelectedImageName(props.contentDetails.thumbnail.url); props.setImageModalOpen(true) }}>
                                                {
                                                    thumbnailEnable ?
                                                        t('common_button_text_change') :t('common_button_text_add')
                                                }
                                            </Button>
                                        </ButtonSection>
                                        {thumbnailEnable && <ImageSection> <SelectedImage src={props.contentDetails.thumbnail.url} /></ImageSection>}
                                    </ImageArea>
                                    <Text size={10} weight="reg" color="gray-3">{t('common_content_general_images_thumbnail_dimensions')}</Text>
                                </ImageContainer>
                                <ImageContainer className="">
                                    <div className="flex flex-center">
                                        <Text className="mr1" size={16} weight="med">{t('common_content_general_images_poster_title')}</Text>
                                        <IconStyle id="posterTooltip">info_outlined</IconStyle>
                                        <Tooltip target="posterTooltip">{t('common_content_general_images_poster_info_text')}</Tooltip>
                                    </div>
                                    <ImageArea className="mt2">
                                        <ButtonSection>
                                            {
                                                posterEnable &&
                                                <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => handleImageDelete("poster")}>Delete</Button>
                                            }

                                            <Button sizeButton="xs" className="clearfix right my1 mr1" typeButton="secondary" onClick={() => { props.setImageModalTitle("Change Poster"); props.setSelectedImageName(props.contentDetails.poster.url); props.setImageModalOpen(true) }}>
                                                {
                                                    posterEnable ?
                                                    t('common_button_text_change') :t('common_button_text_add')
                                                }
                                            </Button>
                                        </ButtonSection>
                                        {posterEnable && <ImageSection> <img height='auto' width="160px" src={props.contentDetails.poster.url} /></ImageSection>}
                                    </ImageArea>
                                    <Text size={10} weight="reg" color="gray-3">{t('common_content_general_images_splashscreen_dimensions')}</Text>
                                </ImageContainer>


                            </ImagesContainer>
                        </div>
                        </>
            }
            </div>
)}
import React from 'react';
import { ControlsCard, ControlToggleContainer, TitleSection } from '../../shared/Theming/ThemingStyle';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Toggle } from '../../../components/Toggle/toggle';
import { Divider } from '../../../shared/MiscStyles';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import styled from 'styled-components';
import { DesignComponentProps } from '../../containers/Expos/Design';
import { ExposThemingState } from '../../redux-flow/store/Content/General/types';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ImageAreaExpo } from './ImageAreaExpo';
import { useTranslation } from 'react-i18next';

export const DesignPage = (props: DesignComponentProps & { refresh: Function; uploadUrl: string; designState: ExposThemingState; exposId: string, save: (data: ExposThemingState) => Promise<void>}) => {
    const [stateContentDetails, setStateContentDetails] = React.useState<ExposThemingState>(props.designState)
    const { t } = useTranslation()
    
    const assetsDropdownList = props.contentDataState['expo'][props.exposId].contentList.map((item): DropdownSingleListItem => {
        return {
            title: item.title,
            data: item.id
        }
    })

    React.useEffect(() => {
        if(stateContentDetails.coverBackgroundUrl !== props.designState.coverBackgroundUrl) {
            setStateContentDetails({...stateContentDetails, coverBackgroundUrl: props.designState.coverBackgroundUrl})
        }
    }, [props.designState])

    const handleSaveHeader = (headerColor: string, coverBackgroundUrl: string) => {
        setStateContentDetails({...stateContentDetails, coverBackgroundColor: headerColor})
        return props.save({...stateContentDetails, coverBackgroundColor: headerColor, coverBackgroundUrl: coverBackgroundUrl})
    }
    
    return (
        <div className='col col-12 md-col-4'>
            <ControlsCard>
                <TitleSection className="justify-center mb1">
                    <Text size={20} weight='med'> {t('common_theme_appearance_title')} </Text>
                </TitleSection>
                <Text className="mb2 inline-block" size={14} weight='reg'>
                    {t('expo_design_info_text')}
                </Text>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label={t('expo_design_dark_mode_toggle_text')} defaultChecked={stateContentDetails.darkModeEnable} onChange={() => { setStateContentDetails({ ...stateContentDetails, darkModeEnable: !stateContentDetails.darkModeEnable }) }} />
                    <IconStyle id="darkModeTooltip">info_outlined</IconStyle>
                    <Tooltip  target="darkModeTooltip">{t('expo_design_dark_mode_description')}</Tooltip>
                </ControlToggleContainer>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label={t('expo_design_cover_title')} defaultChecked={stateContentDetails.coverBackgroundEnable} onChange={() => { setStateContentDetails({ ...stateContentDetails, coverBackgroundEnable: !stateContentDetails.coverBackgroundEnable }) } }/>
                    <IconStyle id="coverBackgroundTooltip">info_outlined</IconStyle>
                    <Tooltip  target="coverBackgroundTooltip">{t('expo_design_cover_info_text')}</Tooltip>
                </ControlToggleContainer>
                {
                    stateContentDetails.coverBackgroundEnable && 
                        <ImageAreaExpo 
                            getDetails={props.refresh}
                            saveHeaderColor={handleSaveHeader} 
                            uploadUrl={props.uploadUrl} 
                            submit={props.uploadFile} 
                            contentId={props.exposId} 
                            getUploadUrl={props.getUploadUrl} 
                            deleteFile={props.deleteFile}
                            stateContentDetails={stateContentDetails}
                            headerEnable={stateContentDetails.coverBackgroundEnable} 
                            headerColor={stateContentDetails.coverBackgroundColor} 
                            headerUrl={stateContentDetails.coverBackgroundUrl}
                        />
                }
                {
                    !stateContentDetails.coverBackgroundEnable && 
                    <Text className="inline-block"  size={10} color="gray-3" weight='reg'>
                        When disabled, grey will be the default cover background.
                    </Text>
                }
                
                <Divider className="pt1 pb1 col-12" />
                <TitleSection className="justify-center mb1 mt2">
                    <Text size={20} weight='med'>{t('expo_design_content_layout_toggle_title')}</Text>
                </TitleSection>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label={t('expo_design_contents_description_toggle_title')} defaultChecked={stateContentDetails.contentDescriptions} onChange={() => setStateContentDetails({...stateContentDetails, contentDescriptions: !stateContentDetails.contentDescriptions})} />
                    <IconStyle id="contentDescriptionTooltip">info_outlined</IconStyle>
                    <Tooltip  target="contentDescriptionTooltip">{t('expo_design_contents_description_info_text')}</Tooltip>
                </ControlToggleContainer>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label={t('expo_design_featured_content_title')} defaultChecked={stateContentDetails.featuredContentEnable} onChange={() => setStateContentDetails({ ...stateContentDetails, featuredContentEnable: !stateContentDetails.featuredContentEnable })} />
                    <IconStyle id="featuredContentTooltip">info_outlined</IconStyle>
                    <Tooltip  target="featuredContentTooltip">{t('expo_design_featured_content_info_text')}</Tooltip>
                </ControlToggleContainer>
                {
                    stateContentDetails.featuredContentEnable && 
                    <DropdownSingle
                        id='assetsDropdown'
                        isInModal
                        className='col-12 py1 clearfix'
                        dropdownTitle={t('expo_design_featured_content_title')}
                        defaultSelected={props.contentDataState['expo'][props.exposId].contentList.find(item => item.id === stateContentDetails.featuredContentId) ? props.contentDataState['expo'][props.exposId].contentList.find(item => item.id === stateContentDetails.featuredContentId).title : null}
                        callback={(item: DropdownSingleListItem) => setStateContentDetails({ ...stateContentDetails, featuredContentId: item.data }) }
                        list={assetsDropdownList}
                    />
                }
                
            </ControlsCard>
            <div className='col mt25 flex'>
                <Button onClick={() => props.save(stateContentDetails)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>{t('common_button_text_save')}</Button>
                <Button onClick={() => {}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>{t('common_button_text_cancel')}</Button>
            </div>
        </div>
        

    )

    
}

export const WrapIFrame = styled.div<{}>`
    height: 504px;
    padding: 0;
    overflow: hidden;
`
export const ScaledFrame = styled.iframe<{}>`
    width: 1462px;
    height: 960px;
    border: 0;
    transform: scale(0.5);
    transform-origin: 0 0;
    border: 2px solid #C8D1E0;
`

import React from 'react';
import { ControlsCard, ControlToggleContainer, TitleSection } from '../../shared/Theming/ThemingStyle';
import { PlayerSection } from '../Videos/ChapterMarkers/ChaptersStyle';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Toggle } from '../../../components/Toggle/toggle';
import { Divider } from '../../../shared/MiscStyles';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import styled from 'styled-components';
import { DesignComponentProps } from '../../containers/Expos/Design';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { ImageAreaExpo } from './ImageAreaExpo';
import { isProduction } from '../../utils/services/player/stage';
import { ExposThemingState } from '../../redux-flow/store/Content/General/types';

export const DesignPage = (props: DesignComponentProps & { designState: ExposThemingState; exposId: string, save: (data: ExposThemingState) => void}) => {
    const expoClientBaseUrl = isProduction() ? 'https://dacastexpo.com/?id=' : 'https://singularity-expo.dacast.com/?id='
    const [stateContentDetails, setStateContentDetails] = React.useState<ExposThemingState>(props.designState)

    const assetsDropdownList = props.contentDataState['expo'][props.exposId].contentList.map((item): DropdownSingleListItem => {
        return {
            title: item.title,
            data: item.id
        }
    })
    
    return (
        <React.Fragment>
            <PlayerSection className='xs-mb2 col col-right col-12 md-col-8 relative sm-pl1'>
                <WrapIFrame className='col-12'>
                    <ScaledFrame  src={expoClientBaseUrl+props.exposId} />   
                </WrapIFrame>
            </PlayerSection>
            <ControlsCard>
                <TitleSection className="justify-center mb1">
                    <Text size={20} weight='med'> Appearance </Text>
                </TitleSection>
                <Text className="mb2 inline-block" size={14} weight='reg'>
                    Customize the look of your expo
                </Text>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label='Dark Mode' defaultChecked={stateContentDetails.darkModeEnable} onChange={() => { setStateContentDetails({ ...stateContentDetails, darkModeEnable: !stateContentDetails.darkModeEnable }) }} />
                    <IconStyle id="darkModeTooltip">info_outlined</IconStyle>
                    <Tooltip  target="darkModeTooltip">Change design to a dark theme.</Tooltip>
                </ControlToggleContainer>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label='Cover Background' defaultChecked={stateContentDetails.coverBackgroundEnable} onChange={() => { setStateContentDetails({ ...stateContentDetails, coverBackgroundEnable: !stateContentDetails.coverBackgroundEnable }) } }/>
                    <IconStyle id="coverBackgroundTooltip">info_outlined</IconStyle>
                    <Tooltip  target="coverBackgroundTooltip">Show a header image or color.</Tooltip>
                </ControlToggleContainer>
                {
                    stateContentDetails.coverBackgroundEnable && <ImageAreaExpo getUploadUrl={props.getUploadUrl} contentId={props.exposId} headerEnable={stateContentDetails.coverBackgroundEnable} headerColor={stateContentDetails.coverBackgroundColor} headerUrl={stateContentDetails.coverBackgroundUrl}/>
                }
                <Text className="inline-block"  size={10} color="gray-3" weight='reg'>
                    When disabled, white will be the default cover background.
                </Text>
                <Divider className="pt1 pb1" />
                <TitleSection className="justify-center mb1 mt2">
                    <Text size={20} weight='med'> Content Layout </Text>
                </TitleSection>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label='Content Descriptions' defaultChecked={stateContentDetails.contentDescriptions} onChange={() => setStateContentDetails({...stateContentDetails, contentDescriptions: !stateContentDetails.contentDescriptions})} />
                    <IconStyle id="contentDescriptionTooltip">info_outlined</IconStyle>
                    <Tooltip  target="contentDescriptionTooltip">Show the descriptions of all content.</Tooltip>
                </ControlToggleContainer>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label='Featured Content' defaultChecked={stateContentDetails.featuredContentEnable} onChange={() => setStateContentDetails({ ...stateContentDetails, featuredContentEnable: !stateContentDetails.featuredContentEnable })} />
                    <IconStyle id="featuredContentTooltip">info_outlined</IconStyle>
                    <Tooltip  target="featuredContentTooltip">Fix one piece of content at the top.</Tooltip>
                </ControlToggleContainer>
                {
                    stateContentDetails.featuredContentEnable && 
                    <DropdownSingle
                        id='assetsDropdown'
                        isInModal
                        className='col col-12 py1 clearfix'
                        dropdownTitle='Featured Content'
                        defaultSelected={stateContentDetails.featuredContentId ? props.contentDataState['expo'][props.exposId].contentList.find(item => item.id === stateContentDetails.featuredContentId).title : null}
                        callback={(item: DropdownSingleListItem) => setStateContentDetails({ ...stateContentDetails, featuredContentId: item.data }) }
                        list={assetsDropdownList}
                    />
                }
                <div className='col my1 flex'>
                    <Button onClick={() => props.save(stateContentDetails)} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                    <Button onClick={() => {}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
                </div>
            </ControlsCard>
            
        </React.Fragment>
        

    )

    
}

export const WrapIFrame = styled.div<{}>`
    height: 800px;
    padding: 0;
    overflow: hidden;
`
export const ScaledFrame = styled.iframe<{}>`
    width: 1280px;
    height: 786px;
    border: 0;
    transform: scale(0.5);
    transform-origin: 0 0;
`

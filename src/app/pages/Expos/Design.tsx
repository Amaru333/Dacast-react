import React from 'react';
import { ExposThemingState } from '../../redux-flow/store/Content/Theming/types';
import { ControlsCard, ControlToggleContainer, RadioButtonContainer, TitleSection } from '../../shared/Theming/ThemingStyle';
import { PlayerSection, PlayerContainer } from '../Videos/ChapterMarkers/ChaptersStyle';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Toggle } from '../../../components/Toggle/toggle';
import { Divider } from '../../../shared/MiscStyles';
import { ContentType } from '../../redux-flow/store/Common/types';
import { SubtitleInfo } from '../../redux-flow/store/Content/List/types';
import { ContentSetupState } from '../../redux-flow/store/Content/Setup/types';
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import styled from 'styled-components';

export const DesignPage = (props: { contentDataState: ContentSetupState;  designState: ExposThemingState; exposId: string; getUploadUrl: (uploadType: string, contentId: string, extension: string, contentType: ContentType, subtitleInfo?: SubtitleInfo) => Promise<void>; deleteFile: (contentId: string, targetId: string, uploadType: string, contentType: ContentType) => Promise<void>;uploadFile: (data: File, uploadUrl: string) => Promise<void>;}) => {

    const [backgroundEnable, setBackgroundEnable] = React.useState<boolean>(props.designState.coverBackgroundEnable)

    const [featuredContentEnable, setFeaturedContentEnable] = React.useState<boolean>(props.designState.featuredContentEnable)
    const [selectedFeaturedContent, setSelectedFeaturedContent] = React.useState<string>(props.designState.featuredContentId)

    const assetsDropdownList = props.contentDataState['expo'][props.exposId].contentList.map((item) => {
        let assetDropdownItem: DropdownSingleListItem = {title: null}
        assetDropdownItem.title = item.title
        assetDropdownItem.data = item.id
        return assetDropdownItem
    })
    
    return (
        <React.Fragment>
            <PlayerSection className='xs-mb2 col col-right col-12 md-col-8 relative sm-pl1'>
                <WrapIFrame className='col-12'>
                    <ScaledFrame  src={"https://dacastexpo.com/?id="+props.exposId} />   
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
                    <Toggle label='Dark Mode' checked={props.designState.darkModeEnable} />
                    <IconStyle id="darkModeTooltip">info_outlined</IconStyle>
                    <Tooltip  target="darkModeTooltip"></Tooltip>
                </ControlToggleContainer>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label='Cover Background' defaultChecked={backgroundEnable} onChange={() => { setBackgroundEnable(!backgroundEnable) } }/>
                    <IconStyle id="coverBackgroundTooltip">info_outlined</IconStyle>
                    <Tooltip  target="coverBackgroundTooltip"></Tooltip>
                </ControlToggleContainer>
                {
                    backgroundEnable && <Text>TODO: New Component Here</Text>
                }
                <Text className="inline-block"  size={10} color="gray-3" weight='reg'>
                    When disabled, white will be the default cover background.
                </Text>
                <Divider className="pt1 pb1" />
                <TitleSection className="justify-center mb1 mt2">
                    <Text size={20} weight='med'> Content Layout </Text>
                </TitleSection>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label='Content Descriptions' checked={props.designState.contentDescriptions} />
                    <IconStyle id="contentDescriptionTooltip">info_outlined</IconStyle>
                    <Tooltip  target="contentDescriptionTooltip"></Tooltip>
                </ControlToggleContainer>
                <ControlToggleContainer className='pt1 pb1'>
                    <Toggle label='Featured Content' defaultChecked={props.designState.featuredContentEnable} onChange={() => setFeaturedContentEnable(!featuredContentEnable)} />
                    <IconStyle id="featuredContentTooltip">info_outlined</IconStyle>
                    <Tooltip  target="featuredContentTooltip"></Tooltip>
                </ControlToggleContainer>
                {
                    featuredContentEnable && 
                    <DropdownSingle
                        id='assetsDropdown'
                        isInModal
                        className='col col-12 py1'
                        dropdownTitle='Featured Content'
                        defaultSelected={selectedFeaturedContent ? props.contentDataState['expo'][props.exposId].contentList.find(item => item.id === selectedFeaturedContent).title : null}
                        callback={(item: DropdownSingleListItem) => setSelectedFeaturedContent(item.data)}
                        list={assetsDropdownList}
                    />
                }
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

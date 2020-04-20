import React from 'react';
import { ControlsCard, TitleSection, TextStyle, BorderStyle, ControlToggleContainer, DisabledSection } from './ThemingStyle';
import { Toggle } from '../../../components/Toggle/toggle';
import { Text } from '../../../components/Typography/Text';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { ThemeOptions, ThemesData, ContentTheme } from '../../redux-flow/store/Settings/Theming';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { IconStyle } from '../../../shared/Common/Icon';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { InputCheckbox } from '../../../components/FormsComponents/Input/InputCheckbox';
import { ColorPicker } from '../../../components/ColorPicker/ColorPicker';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Bubble } from '../../../components/Bubble/Bubble';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { getPrivilege } from '../../../utils/utils';

export const ThemingControlsCard = (props: {selectedTheme: ThemeOptions, setSelectedTheme: Function, contentType: string, themeList?: ThemesData, contentTheme?: ContentTheme}) => {

    const togglePadding = 'py1';

    const [showAdvancedPanel, setShowAdvancedPanel] = React.useState<boolean>(false);

    const customEnabled = props.selectedTheme.themeName === "Custom Theme" || props.contentType === 'settings'
    const liveEnabled = (props.selectedTheme.themeName === "Custom Theme" && props.contentType === 'live') || props.contentType === 'settings' 
    const playlistEnabled = (props.selectedTheme.themeName === "Custom Theme" && props.contentType === 'playlist') || props.contentType === 'settings' 
    
    return (
        <ControlsCard>
            <TitleSection className="justify-center">
                <div style={{marginTop: 5}}>
                    <Text size={20} weight='med'>
                        {
                            props.selectedTheme.id === "-1" ?
                                "New Theme"
                                : "Edit Theme"
                        }
                    </Text>
                </div>
                <Button 
                    className='right flex items-center' 
                    sizeButton='xs' 
                    typeButton='tertiary' 
                    buttonColor='blue' 
                    onClick={(event) => {event.preventDefault();setShowAdvancedPanel(!showAdvancedPanel)}}>
                    {showAdvancedPanel ? <><IconStyle fontSize='small' coloricon="dark-violet">keyboard_arrow_left</IconStyle><Text size={12} color='dark-violet' weight='reg'>Back</Text></>: 'Advanced'}
                </Button>
            </TitleSection>
            { showAdvancedPanel ?
            <>
                <DisabledSection enabled={customEnabled}>
                    <TextStyle className="pt25" ><Text size={20} weight='med'>Offline Message</Text></TextStyle>
                    <Input className='my2' value={props.selectedTheme.offlineMessage} onChange={(event) => {props.setSelectedTheme({...props.selectedTheme, offlineMessage: event.currentTarget.value});}} />
                    
                    <DropdownSingle className="mb2" dropdownTitle='Message Position' id='offlineMessagePositionDropdown' list={{'Top': false, 'Middle': false, 'Fullscreen': false}} dropdownDefaultSelect={props.selectedTheme.offlineMessagePosition} callback={(value: string) => {{props.setSelectedTheme({...props.selectedTheme, offlineMessagePosition: value});}}} />
                </DisabledSection>

                <BorderStyle className="p1" />


                <DisabledSection enabled={customEnabled && getPrivilege('privilege-aes')}>
                    <TextStyle className="my2" ><Text size={20} weight='med'>Delivery Method</Text></TextStyle>
                    <Text size={14} weight='reg'>Dacast gives you complete control over the delivery method of your videos. Choose the setting that's right for the type of content you have.</Text>
                    <InputRadio className="mt2" name='delevery-method' value='compatible-delivery' label='Compatible Delivery' defaultChecked={props.selectedTheme.deliveryMethod === 'compatible'} onChange={() => {props.setSelectedTheme({...props.selectedTheme, deliveryMethod:'compatible'});}}/>
                    <InputRadio className="mt1" name='delevery-method' value='secure-delivery' label='Secure Delivery' defaultChecked={props.selectedTheme.deliveryMethod === 'secure'} onChange={() => {props.setSelectedTheme({...props.selectedTheme, deliveryMethod: 'secure'});}} />
                </DisabledSection>
                    
                <BorderStyle className="p1" />

                <DisabledSection enabled={customEnabled && getPrivilege('privilege-china')}>
                    <TitleSection className="my2">
                        <Text size={20} weight='med'>Region Settings</Text>
                        <Button sizeButton='xs' typeButton='secondary' buttonColor='blue' onClick={() => location.href="/help"}>
                            Contact Us
                        </Button>
                    </TitleSection>
                    <Text size={14} weight='reg'>Select the PoPs that will cover the countries where your videos will be played.</Text>
                    <InputRadio className="mt2" name='region-settings' value='standard' label='Standard PoPs' defaultChecked={props.selectedTheme.regionSettings === 'standard'} onChange={() => {props.setSelectedTheme({...props.selectedTheme, regionSettings: 'standard'});}} />
                    <InputRadio className="mt1" name='region-settings' value='premium' label='Premium PoPs' defaultChecked={props.selectedTheme.regionSettings === 'premium'} onChange={() => {props.setSelectedTheme({...props.selectedTheme, regionSettings: 'premium'});}} /> 
                </DisabledSection>
                
                
            </>
                :
            <>
                {
                    props.contentType !== 'settings' ?
                    <>
                        <DropdownSingle 
                            id="vodThemeList" 
                            className="mt2"
                            dropdownTitle="Theme" 
                            list={props.themeList.themes.reduce((reduced: DropdownListType, item: ThemeOptions)=> {return {...reduced, [item.themeName]: false }},{})  }
                            dropdownDefaultSelect={props.contentTheme.selectedTheme.themeName} 
                            callback={
                                (selectedTheme: string) => {
                                    return props.setSelectedTheme(props.themeList.themes.find(rendition => rendition.themeName === selectedTheme));
                                }} />
                            <Bubble className="mt25" type="info">
                                { props.selectedTheme.themeName === "Custom Theme" ?
                                    "Custom Settings override any Theme settings."
                                    :
                                    "If you wish to create a new Theme or edit a Theme, go to Themeing."
                                }
                            </Bubble>
                    </>
                    :
                    <>
                        <Input className='my2' label='Theme Name' id='themeTitle' placeholder='New Theme' value={props.selectedTheme.themeName} onChange={(event) => {props.setSelectedTheme({...props.selectedTheme, themeName: event.currentTarget.value});}} />
                        <InputCheckbox  id='themeIsDefaultCheckbox' label='Make Default Theme' defaultChecked={props.selectedTheme.isDefault} onChange={() => {props.setSelectedTheme({...props.selectedTheme, isDefault: !props.selectedTheme.isDefault});}} />
                    </>
                }
                
                <BorderStyle className="p1" />

                <DisabledSection enabled={customEnabled}>
                    <TextStyle  className='py2'><Text size={20} weight='med'>Controls</Text></TextStyle>
                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Player Controls' defaultChecked={props.selectedTheme.playerControls} onChange={() => {props.setSelectedTheme({...props.selectedTheme, playerControls: !props.selectedTheme.bigPlayButton});}} />
                        <IconStyle id="playerControlsTooltip">info_outlined</IconStyle>
                        <Tooltip target="playerControlsTooltip">Play/Pause</Tooltip>
                    </ControlToggleContainer>
                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Big Play Button' defaultChecked={props.selectedTheme.bigPlayButton} onChange={() => {props.setSelectedTheme({...props.selectedTheme, bigPlayButton: !props.selectedTheme.bigPlayButton});}} />
                        <IconStyle id="bigPlayTooltip">info_outlined</IconStyle>
                        <Tooltip target="bigPlayTooltip">Big Play Button</Tooltip>
                    </ControlToggleContainer>
                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Show Scrubbing Thumbnail' defaultChecked={props.selectedTheme.scrubbingThumbnail} onChange={() => {props.setSelectedTheme({...props.selectedTheme, scrubbingThumbnail: !props.selectedTheme.scrubbingThumbnail});}} />
                        <IconStyle id="scrubberThumbnailTooltip">info_outlined</IconStyle>
                        <Tooltip target="scrubberThumbnailTooltip">Show Scrubbing Thumbnail</Tooltip>
                    </ControlToggleContainer>
                    

                    <BorderStyle className="p1" />
                    
                    
                    <TextStyle className="py2" ><Text size={20} weight='med'>Actions</Text></TextStyle>

                    <ControlToggleContainer>
                    <Toggle className={togglePadding} label='Download Button' defaultChecked={props.selectedTheme.downloadButton} onChange={() => {props.setSelectedTheme({...props.selectedTheme, downloadButton: !props.selectedTheme.downloadButton});}} />
                    <IconStyle id="downloadButtonTooltip">info_outlined</IconStyle>
                    <Tooltip target="downloadButtonTooltip">Download Button</Tooltip>
                    </ControlToggleContainer>

                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Social Sharing' defaultChecked={props.selectedTheme.socialSharing} onChange={() => {props.setSelectedTheme({...props.selectedTheme, socialSharing: !props.selectedTheme.socialSharing});}} />
                        <IconStyle id="socialSharingTooltip">info_outlined</IconStyle>
                        <Tooltip target="socialSharingTooltip">Social Sharing</Tooltip>
                    </ControlToggleContainer>

                    <ControlToggleContainer>
                    <Toggle className={togglePadding} label='Embed Code' defaultChecked={props.selectedTheme.embedCode} onChange={() => {props.setSelectedTheme({...props.selectedTheme, embedCode: !props.selectedTheme.embedCode});}} />
                    <BorderStyle className="p1" />
                    <IconStyle id="embedCodeTooltip">info_outlined</IconStyle>
                    <Tooltip target="embedCodeTooltip">Embed Code</Tooltip>
                    </ControlToggleContainer>
                    
                    <BorderStyle className="p1" />

                    <TextStyle className="py2" ><Text size={20} weight='med'>Appearance</Text></TextStyle>
                    <div className='relative'>
                        <Text className='pb1' size={14} weight='med'>Overlay Color</Text>
                        <ColorPicker defaultColor={props.selectedTheme.customOverlayColor} callback={(value: string) => {props.setSelectedTheme({...props.selectedTheme, customOverlayColor: value});}} />
                    </div>
                    <div className='my2 relative'>
                        <Text className='pb1' size={14} weight='med'>Menu Color</Text>
                        <ColorPicker defaultColor={props.selectedTheme.customMenuColor} callback={(value: string) => {props.setSelectedTheme({...props.selectedTheme, customMenuColor: value});}} />
                    </div>
                        
                    <BorderStyle className="p1" />

                    <TextStyle className="py2" ><Text size={20} weight='med'>Behaviour</Text></TextStyle>

                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Autoplay' defaultChecked={props.selectedTheme.autoplay} onChange={() => {props.setSelectedTheme({...props.selectedTheme, autoplay: !props.selectedTheme.autoplay});}} />
                        <IconStyle id="autoplayTooltip">info_outlined</IconStyle>
                        <Tooltip target="autoplayTooltip">Autoplay</Tooltip>
                    </ControlToggleContainer>

                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Start Video Muted' defaultChecked={props.selectedTheme.startVideoMuted} onChange={() => {props.setSelectedTheme({...props.selectedTheme, startVideoMuted: !props.selectedTheme.startVideoMuted});}} />
                        <IconStyle id="startMutedTooltip">info_outlined</IconStyle>
                        <Tooltip target="startMutedTooltip">Start Video Muted</Tooltip>
                    </ControlToggleContainer>

                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Looping' defaultChecked={props.selectedTheme.looping} onChange={() => {props.setSelectedTheme({...props.selectedTheme, looping: !props.selectedTheme.looping});}} />
                        <IconStyle id="loopingTooltip">info_outlined</IconStyle>
                        <Tooltip target="loopingTooltip">Looping</Tooltip>
                    </ControlToggleContainer>
                
                </DisabledSection>
                
                <BorderStyle className="p1" />

                <DisabledSection enabled={liveEnabled}>
                    <TextStyle className="py2" ><Text size={20} weight='med'>Live Streams</Text></TextStyle>

                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='View Counter' defaultChecked={props.selectedTheme.isViewerCounterEnabled} onChange={() => {props.setSelectedTheme({...props.selectedTheme, isViewerCounterEnabled: !props.selectedTheme.isViewerCounterEnabled});}} />
                        <IconStyle id="viewCounterTooltip">info_outlined</IconStyle>
                        <Tooltip target="viewCounterTooltip">View Counter</Tooltip>
                    </ControlToggleContainer>
                    {
                        props.selectedTheme.isViewerCounterEnabled ?
                            <Input id='viewerCounterInput' type='number' label="Counter Limit" className='' value={props.selectedTheme.viewerCounterLimit.toString()} onChange={(event) => {props.setSelectedTheme({...props.selectedTheme, viewerCounterLimit: parseInt(event.currentTarget.value)});}} />
                            : null
                    }
                </DisabledSection>

                <BorderStyle className="p1" />

                <DisabledSection enabled={playlistEnabled}>
                    <TextStyle className="py2" ><Text size={20} weight='med'>Playlists</Text></TextStyle>
                    <DropdownSingle className="mb2" dropdownTitle='Thumbnail Position' id='thumbnailPositionDropdown' list={{'Left': false, 'Right': false}} dropdownDefaultSelect={props.selectedTheme.thumbnailPosition} callback={(value: string) => {{props.setSelectedTheme({...props.selectedTheme, thumbnailPosition: value});}}} />

                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Continuous Play' defaultChecked={props.selectedTheme.continuousPlay} onChange={() => {props.setSelectedTheme({...props.selectedTheme, continuousPlay: !props.selectedTheme.continuousPlay});}} />
                        <IconStyle id="continuousPlayTooltip">info_outlined</IconStyle>
                        <Tooltip target="continuousPlayTooltip">Continuous Play</Tooltip>
                    </ControlToggleContainer>
                    
                    <ControlToggleContainer>
                        <Toggle className={togglePadding} label='Skip Videos' defaultChecked={props.selectedTheme.skipVideos} onChange={() => {props.setSelectedTheme({...props.selectedTheme, skipVideos: !props.selectedTheme.skipVideos});}} />
                        <IconStyle id="skipVideosTooltip">info_outlined</IconStyle>
                        <Tooltip target="skipVideosTooltip">Skip Videos</Tooltip>
                    </ControlToggleContainer>
                </DisabledSection>
    
            </>  
        }              
        </ControlsCard>
    )
}
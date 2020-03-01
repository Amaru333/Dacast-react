import React from 'react';
import { ThemingContainer, ControlsCard, TitleSection, DisabledSection, TextStyle, BorderStyle, PlayerSection, PlayerContainer } from '../../../shared/Theming/ThemingStyle';
import { Text } from '../../../components/Typography/Text';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Toggle } from '../../../components/Toggle/toggle';
import { ColorPicker } from '../../../components/ColorPicker/ColorPicker';
import { LiveThemingComponentProps } from '../../../containers/Live/Theming';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { usePlayer } from '../../../utils/player';

export const LiveThemingPage = (props: LiveThemingComponentProps) => {

    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(props.theme.selectedTheme);
    const [showAdvancedPanel, setShowAdvancedPanel] = React.useState<boolean>(false);

    const togglePadding = 'py1';

    let playerRef = React.useRef<HTMLDivElement>(null);

    let player = usePlayer(playerRef);

    const handleThemeSave = () => {
        if(selectedTheme.themeName === "Custom Theme") {
            let replacedCustomTheme = props.themeList.themes.splice(props.themeList.themes.length-1, 1, selectedTheme)
            props.setCustomThemeList(props.themeList.themes)
        } 
        props.saveLiveTheme(selectedTheme)
    }

    return (
        <React.Fragment>
            <ThemingContainer>
                <div className='col col-12 md-col-4 mr2 flex flex-column'>
                    <ControlsCard className='col col-12'>
                        <TitleSection>
                            <Text size={20} weight='med'>Edit Theme</Text>
                            <Button 
                                className='right mb2 flex' 
                                sizeButton='large' 
                                typeButton='tertiary' 
                                buttonColor='blue' 
                                onClick={(event) => {event.preventDefault();setShowAdvancedPanel(!showAdvancedPanel)}}>
                                {showAdvancedPanel ? <><Icon>keyboard_arrow_left</Icon><Text size={16} color='dark-violet' weight='reg'>Back</Text></>: 'Advanced'}
                            </Button>
                        </TitleSection>
                        {
                            showAdvancedPanel ?
                            <>
                                <DisabledSection selectedTheme={selectedTheme.themeName}>
                                    <TextStyle className="py2" ><Text size={20} weight='med'>Offline Message</Text></TextStyle>
                                    <Input className='my2' value={selectedTheme.offlineMessage} onChange={(event) => setSelectedTheme({...selectedTheme, offlineMessage: event.currentTarget.value})} />
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Delivery Method</Text></TextStyle>
                                    <Text size={14} weight='reg'>Dacast gives you complete control over the delivery method of your videos. Choose the setting that's right for the type of content you have.</Text>
                                    <InputRadio name='delevery-method' value='compatible-delivery' label='Compatible Delivery' defaultChecked={selectedTheme.deliveryMethod === 'compatible'} onChange={() => setSelectedTheme({...selectedTheme, deliveryMethod:'compatible'})}/>
                                    <InputRadio name='delevery-method' value='secure-delivery' label='Secure Delivery' defaultChecked={selectedTheme.deliveryMethod === 'secure'} onChange={() => setSelectedTheme({...selectedTheme, deliveryMethod: 'secure'})} />
                                    <BorderStyle className="p1" />

                                    <TitleSection className="my2">
                                        <Text size={20} weight='med'>Region Settings</Text>
                                        <Button sizeButton='xs' typeButton='secondary' buttonColor='blue' onClick={() => location.href="/help"}>
                                            Contact Us
                                        </Button>

                                    </TitleSection>
                                    <Text size={14} weight='reg'>Select the PoPs that will cover the countries where your videos will be played.</Text>
                                    <InputRadio name='region-settings' value='standard' label='Standard PoPs' defaultChecked={selectedTheme.regionSettings === 'standard'} onChange={() => setSelectedTheme({...selectedTheme, regionSettings: 'standard'})} />
                                    <InputRadio name='region-settings' value='premium' label='Premium PoPs' defaultChecked={selectedTheme.regionSettings === 'premium'} onChange={() => setSelectedTheme({...selectedTheme, regionSettings: 'premium'})} />
                                </DisabledSection>
                            </>
                                :
                            <>
                            <DropdownSingle id="liveThemeList" dropdownTitle="Select Theme" 
                                list={props.themeList.themes.reduce((reduced: DropdownListType, item: ThemeOptions)=> {return {...reduced, [item.themeName]: false }},{})  }
                                dropdownDefaultSelect={props.theme.selectedTheme.themeName} 
                                callback={
                                    (selectedTheme: string) => {
                                        return setSelectedTheme(props.themeList.themes.find(rendition => rendition.themeName === selectedTheme));
                                    }} />
                                <Bubble className="mt25" type="info">
                                    { selectedTheme.themeName === "Custom Theme" ?
                                        "Custom Settings override any Theme settings."
                                        :
                                        "To create or edit themes, go to your Theme Settings."
                                    }
                                </Bubble>
                                <BorderStyle className="mt3" />

                                <DisabledSection selectedTheme={selectedTheme.themeName}>
                                    <TextStyle  className='py2'><Text size={20} weight='med'>Controls</Text></TextStyle>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Big Play Button' defaultChecked={selectedTheme.bigPlayButton} onChange={() => setSelectedTheme({...selectedTheme, bigPlayButton: !selectedTheme.bigPlayButton})} />
                                        <Icon id="bigPlayTooltip">info_outlined</Icon>
                                        <Tooltip target="bigPlayTooltip">Big Play Button</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Play/Pause' defaultChecked={selectedTheme.playPause} onChange={() => setSelectedTheme({...selectedTheme, playPause: !selectedTheme.playPause})} />
                                        <Icon id="playPauseTooltip">info_outlined</Icon>
                                        <Tooltip target="playPauseTooltip">Play/Pause</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Scrubber' defaultChecked={selectedTheme.scrubber} onChange={() => setSelectedTheme({...selectedTheme, scrubber: !selectedTheme.scrubber})} />
                                        <Icon id="scrubberTooltip">info_outlined</Icon>
                                        <Tooltip target="scrubberTooltip">Scrubber</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Show Scrubbing Thumbnail' defaultChecked={selectedTheme.scrubbingThumbnail} onChange={() => setSelectedTheme({...selectedTheme, scrubbingThumbnail: !selectedTheme.scrubbingThumbnail})} />
                                        <Icon id="scrubberThumbnailTooltip">info_outlined</Icon>
                                        <Tooltip target="scrubberThumbnailTooltip">Show Scrubbing Thumbnail</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Time Code' defaultChecked={selectedTheme.timeCode} onChange={() => setSelectedTheme({...selectedTheme, timeCode: !selectedTheme.timeCode})} />
                                        <Icon id="timeCodeTooltip">info_outlined</Icon>
                                        <Tooltip target="timeCodeTooltip">Time Code</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Speed Controls' defaultChecked={selectedTheme.speedControls} onChange={() => setSelectedTheme({...selectedTheme, speedControls: !selectedTheme.speedControls})} />
                                        <Icon id="speedControlsTooltip">info_outlined</Icon>
                                        <Tooltip target="speedControlsTooltip">Speed Controls</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Quality Options' defaultChecked={selectedTheme.qualityOptions} onChange={() => setSelectedTheme({...selectedTheme, qualityOptions: !selectedTheme.qualityOptions})} />
                                        <Icon id="qualityOptionsTooltip">info_outlined</Icon>
                                        <Tooltip target="qualityOptionsTooltip">Quality Options</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Volume' defaultChecked={selectedTheme.volume} onChange={() => setSelectedTheme({...selectedTheme, volume: !selectedTheme.volume})} />
                                        <Icon id="volumeTooltip">info_outlined</Icon>
                                        <Tooltip target="volumeTooltip">Volume</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Fullscreen' defaultChecked={selectedTheme.fullscreen} onChange={() => setSelectedTheme({...selectedTheme, fullscreen: !selectedTheme.fullscreen})} />
                                        <Icon id="fullscreenTooltip">info_outlined</Icon>
                                        <Tooltip target="fullscreenTooltip">Fullscreen</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='View Counter' defaultChecked={selectedTheme.isViewerCounterEnabled} onChange={() => setSelectedTheme({...selectedTheme, isViewerCounterEnabled: !selectedTheme.isViewerCounterEnabled})} />
                                        <Icon id="viewCounterTooltip">info_outlined</Icon>
                                        <Tooltip target="viewCounterTooltip">View Counter</Tooltip>
                                    </div>
                                    
                                    {
                                        selectedTheme.isViewerCounterEnabled ?
                                            <Input id='viewerCounterInput' type='number' className='' value={selectedTheme.viewerCounterLimit.toString()} onChange={(event) => setSelectedTheme({...selectedTheme, viewerCounterLimit: parseInt(event.currentTarget.value)})} />
                                            : null
                                    }
                                    <DropdownSingle className="mt25" dropdownTitle='Thumbnail Position' id='thumbnailPositionDropdown' list={{'Left': false, 'Right': false}} isInModal={true} dropdownDefaultSelect={selectedTheme.thumbnailPosition} callback={(value: string) => {setSelectedTheme({...selectedTheme, thumbnailPosition: value})}} />
                                    
                                    
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Actions</Text></TextStyle>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Download Button' defaultChecked={selectedTheme.downloadButton} onChange={() => setSelectedTheme({...selectedTheme, downloadButton: !selectedTheme.downloadButton})} />
                                        <Icon id="downloadButtonTooltip">info_outlined</Icon>
                                        <Tooltip target="downloadButtonTooltip">Download Button</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Social Sharing' defaultChecked={selectedTheme.socialSharing} onChange={() => setSelectedTheme({...selectedTheme, socialSharing: !selectedTheme.socialSharing})} />
                                        <Icon id="socialSharingTooltip">info_outlined</Icon>
                                        <Tooltip target="socialSharingTooltip">Social Sharing</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Embed Code' defaultChecked={selectedTheme.embedCode} onChange={() => setSelectedTheme({...selectedTheme, embedCode: !selectedTheme.embedCode})} />
                                        <Icon id="embedCodeTooltip">info_outlined</Icon>
                                        <Tooltip target="embedCodeTooltip">Embed Code</Tooltip>
                                    </div>
                                    
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Appearance</Text></TextStyle>
                                    <div className='relative'>
                                        <div className='flex'>
                                            <Text className='pb1' size={14} weight='med'>Overlay Color</Text>
                                            <Icon className='right' id="customColorTooltip">info_outlined</Icon>
                                        </div>                               
                                        <ColorPicker defaultColor={selectedTheme.customOverlayColor} callback={(value: string) => {setSelectedTheme({...selectedTheme, customOverlayColor: value})}} />
                                    </div>
                                    <div className='my2 relative'>
                                        <div className='flex'>
                                            <Text className='pb1' size={14} weight='med'>Overlay Color</Text>
                                            <Icon className='right' id="customColorTooltip">info_outlined</Icon>
                                        </div>   
                                        <ColorPicker defaultColor={selectedTheme.customMenuColor} callback={(value: string) => {setSelectedTheme({...selectedTheme, customMenuColor: value})}} />
                                    </div>
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Behaviour</Text></TextStyle>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Autoplay' defaultChecked={selectedTheme.autoplay} onChange={() => setSelectedTheme({...selectedTheme, autoplay: !selectedTheme.autoplay})} />
                                        <Icon id="autoplayTooltip">info_outlined</Icon>
                                        <Tooltip target="autoplayTooltip">Autoplay</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Start Video Muted' defaultChecked={selectedTheme.startVideoMuted} onChange={() => setSelectedTheme({...selectedTheme, startVideoMuted: !selectedTheme.startVideoMuted})} />   
                                        <Icon id="startMutedTooltip">info_outlined</Icon>
                                        <Tooltip target="startMutedTooltip">Start Video Muted</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Looping' defaultChecked={selectedTheme.looping} onChange={() => setSelectedTheme({...selectedTheme, looping: !selectedTheme.looping})} />
                                        <Icon id="loopingTooltip">info_outlined</Icon>
                                        <Tooltip target="loopingTooltip">Looping</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Continuous Play' defaultChecked={selectedTheme.continuousPlay} onChange={() => setSelectedTheme({...selectedTheme, continuousPlay: !selectedTheme.continuousPlay})} />
                                        <Icon id="continuousPlayTooltip">info_outlined</Icon>
                                        <Tooltip target="continuousPlayTooltip">Continuous Play</Tooltip>
                                    </div>
                                    <div className="flex items-top justify-between relative">
                                        <Toggle className={togglePadding} label='Skip Videos' defaultChecked={selectedTheme.skipVideos} onChange={() => setSelectedTheme({...selectedTheme, skipVideos: !selectedTheme.skipVideos})} />
                                        <Icon id="skipVideosTooltip">info_outlined</Icon>
                                        <Tooltip target="skipVideosTooltip">Skip Videos</Tooltip>
                                    </div>
                                    
                                </DisabledSection>
                            </>
                        }
                    </ControlsCard>
                    <div className="mt25">
                        <Button onClick={() => handleThemeSave()}>Save</Button>
                        <Button typeButton="tertiary" onClick={() => location.href="/livestreams"}>Cancel</Button>
                    </div>
                </div>
                <PlayerSection className='col col-12 md-col-8 mr2'>
                    <PlayerContainer>
                        <div ref={playerRef}>
                        </div>
                    </PlayerContainer>
                </PlayerSection>
            </ThemingContainer>
        </React.Fragment>
    )
}
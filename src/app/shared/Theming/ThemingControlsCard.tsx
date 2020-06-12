import React from 'react';
import { ControlsCard, TitleSection, TextStyle, BorderStyle, ControlToggleContainer, DisabledSection, PlayerSection, PlayerContainer, RadioButtonContainer } from './ThemingStyle';
import { Toggle } from '../../../components/Toggle/toggle';
import { Text } from '../../../components/Typography/Text';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { ThemeOptions, ContentTheme, defaultTheme } from '../../redux-flow/store/Settings/Theming';
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
import { usePlayer } from '../../utils/player';
import { Prompt, useHistory } from 'react-router';
import { addTokenToHeader } from '../../utils/token';

export interface ControlCardThemingComponentProps {
    theme: ContentTheme;
    saveTheme: Function;
    createTheme?: Function;
    cancelFunction?: Function;
    contentType: 'vod' | 'live' | 'playlist' | 'settings';
    actionType: 'Create' | 'Save';
    contentId?: string;
}

export const ThemingControlsCard = (props: ControlCardThemingComponentProps) => {

    const togglePadding = 'py1'

    let history = useHistory()

    const handleDefaultSelectedTheme = (): ThemeOptions => {
        if(props.contentType === 'settings') {
            return props.theme.themes[0]
        }else if(props.theme.contentThemeId && props.theme.themes.filter(t => t.id === props.theme.contentThemeId).length > 0) {
            return props.theme.themes.filter(t => t.id === props.theme.contentThemeId)[0]
        } else if(props.theme.themes.filter(t => t.isDefault).length > 0) {
            return props.theme.themes.filter(t => t.isDefault)[0]
        } else {
            return props.theme.themes.filter(t => t.themeName === 'default')[0]
        }
    }

    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(handleDefaultSelectedTheme())

    let playerRef = React.useRef<HTMLDivElement>(null)

    const {userId} = addTokenToHeader()

    let player = usePlayer(playerRef, userId + '-' + props.contentType + '-' + props.contentId)
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)

    const handleThemeSave = () => {
        setButtonLoading(true);
        if(props.actionType === 'Create') {
            props.createTheme(selectedTheme, () => setButtonLoading(false))
        } else {
            props.saveTheme(selectedTheme, props.contentId, () => setButtonLoading(false))
        }
    }

    React.useEffect(() => {
        setButtonLoading(false)
    }, [props.theme])

    const handleCancel = () => {
        switch(props.contentType) {
            case 'vod':
                history.push('/videos')
                break
            case 'live':
                history.push('/livestreams')
                break
            case 'playlist':
                history.push('/playlists')
                break
            case 'settings':
                props.cancelFunction()
                break
            default:
                break
        }
    }

    const setThemesDropdownList = () => {
        if(props.theme.themes.filter(t => t.isCustom).length === 0) {
            let themesList: ThemeOptions[] = [...props.theme.themes, {...defaultTheme, themeName: 'Custom Theme', isCustom: true}] 
            return themesList.reduce((reduced: DropdownListType, item: ThemeOptions)=> {return {...reduced, [item.themeName]: false }},{}) 
        }
        return props.theme.themes.reduce((reduced: DropdownListType, item: ThemeOptions)=> {return {...reduced, [item.themeName]: false }},{}) 
    }

    const [showAdvancedPanel, setShowAdvancedPanel] = React.useState<boolean>(false)

    let customEnabled = selectedTheme.isCustom || props.contentType === 'settings'
    const liveEnabled = (selectedTheme.isCustom && props.contentType === 'live') || props.contentType === 'settings'
    const playlistEnabled = (selectedTheme.isCustom && props.contentType === 'playlist') || props.contentType === 'settings'
    
    return (
        <div>
            <PlayerSection className='xs-mb2 col col-right col-12 md-col-8  sm-pl1'>
                <PlayerContainer>
                    <div ref={playerRef}>
                    </div>
                </PlayerContainer>
            </PlayerSection>
            <div className='col col-12 md-col-4 sm-pr1 flex flex-column'>
                <ControlsCard>
                    <TitleSection className="justify-center">
                        <div style={{marginTop: 5}}>
                            <Text size={20} weight='med'>
                                {
                                    selectedTheme.id === "-1" ?
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
                            onClick={() => {setShowAdvancedPanel(!showAdvancedPanel)}}>
                            {showAdvancedPanel ? <><IconStyle fontSize='small' coloricon="dark-violet">keyboard_arrow_left</IconStyle><Text size={12} color='dark-violet' weight='reg'>Back</Text></>: 'Advanced'}
                        </Button>
                    </TitleSection>
                    { showAdvancedPanel ?
                    <>
                        <DisabledSection enabled={customEnabled}>
                            <div className="pt25 flex justify-between">
                                <TextStyle  ><Text size={20} weight='med'>Offline Message</Text></TextStyle>
                                <div>
                                    <IconStyle id="offlineMessageTooltip">info_outlined</IconStyle>
                                    <Tooltip target="offlineMessageTooltip">The text to show viewers when the content is not online</Tooltip>
                                </div>
                            </div>
                            
                            <Input className='my2' value={selectedTheme.offlineMessage} onChange={(event) => {setSelectedTheme({...selectedTheme, offlineMessage: event.currentTarget.value});}} />
                            
                            <DropdownSingle className="mb2" dropdownTitle='Message Position' id='offlineMessagePositionDropdown' list={{'Top': false, 'Middle': false, 'Fullscreen': false}} dropdownDefaultSelect={selectedTheme.offlineMessagePosition} callback={(value: string) => {{setSelectedTheme({...selectedTheme, offlineMessagePosition: value})}}} />
                        </DisabledSection>

                        <BorderStyle className="p1" />


                        <DisabledSection enabled={customEnabled && getPrivilege('privilege-aes')}>
                            <TextStyle className="my2" ><Text size={20} weight='med'>Delivery Method</Text></TextStyle>
                            <Text size={14} weight='reg'>Dacast gives you complete control over the delivery method of your videos. Choose the setting that's right for the type of content you have.</Text>
                            <RadioButtonContainer className="mt2">
                                <InputRadio name='delevery-method' value='compatible-delivery' label='Compatible Delivery' defaultChecked={selectedTheme.deliveryMethod === 'compatible'} onChange={() => {setSelectedTheme({...selectedTheme, deliveryMethod:'compatible'});}}/>
                                <div>
                                    <IconStyle id="compatibleDeliveryTooltip">info_outlined</IconStyle>
                                    <Tooltip target="compatibleDeliveryTooltip">Whether the content will start again when it reaches the end</Tooltip>
                                </div>
                            </RadioButtonContainer>
                            
                            <RadioButtonContainer className="mt1">
                                <InputRadio name='delevery-method' value='secure-delivery' label='Secure Delivery' defaultChecked={selectedTheme.deliveryMethod === 'secure'} onChange={() => {setSelectedTheme({...selectedTheme, deliveryMethod: 'secure'});}} />
                                <div>
                                    <IconStyle id="secureDeliveryTooltip">info_outlined</IconStyle>
                                    <Tooltip target="secureDeliveryTooltip">Attempts to play the content under all circumstances, falling back to insecure methods like Flash if necessary, to increase compatability</Tooltip>
                                </div>
                            </RadioButtonContainer>
                            
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
                            <RadioButtonContainer className="mt2">
                                <InputRadio name='region-settings' value='standard' label='Standard PoPs' defaultChecked={selectedTheme.regionSettings === 'standard'} onChange={() => {setSelectedTheme({...selectedTheme, regionSettings: 'standard'});}} />
                                <div>
                                    <IconStyle id="standardPoPsTooltip">info_outlined</IconStyle>
                                    <Tooltip target="standardPoPsTooltip">Our standard delivery method that may be slow in China</Tooltip>
                                </div>
                            </RadioButtonContainer>
                            <RadioButtonContainer className="mt1">
                                <InputRadio  name='region-settings' value='premium' label='Premium PoPs' defaultChecked={selectedTheme.regionSettings === 'premium'} onChange={() => {setSelectedTheme({...selectedTheme, regionSettings: 'premium'});}} /> 
                                <div>
                                    <IconStyle id="premiumPoPsTooltip">info_outlined</IconStyle>
                                    <Tooltip target="premiumPoPsTooltip">Our premium delivery method with increased performance in China</Tooltip>
                                </div>
                            </RadioButtonContainer> 
                        </DisabledSection>
                        
                        
                    </>
                        :
                    <>
                        {
                            props.contentType !== 'settings' ?
                            <>
                                <DropdownSingle 
                                    id="themeList" 
                                    className="mt2"
                                    dropdownTitle="Theme" 
                                    list={setThemesDropdownList()}
                                    dropdownDefaultSelect={handleDefaultSelectedTheme().themeName} 
                                    callback={
                                        (selectedTheme: string) => {
                                            
                                            setSelectedTheme(props.theme.themes.filter(theme => theme.themeName === selectedTheme).length === 0 ? {...defaultTheme, themeName: 'Custom Theme', isCustom: true} : props.theme.themes.filter(theme => theme.themeName === selectedTheme)[0])
                                        }} />
                                    <Bubble className="mt25" type="info">
                                        { selectedTheme.isCustom ?
                                            "Custom Settings override any Theme settings."
                                            :
                                            "If you wish to create a new Theme or edit a Theme, go to Theming."
                                        }
                                    </Bubble>
                            </>
                                :
                            <>
                                <Input className='my2' label='Theme Name' id='themeTitle' placeholder='New Theme' value={selectedTheme.themeName} onChange={(event) => {setSelectedTheme({...selectedTheme, themeName: event.currentTarget.value});}} />
                                <InputCheckbox  id='themeIsDefaultCheckbox' label='Make Default Theme' defaultChecked={selectedTheme.isDefault} onChange={() => {setSelectedTheme({...selectedTheme, isDefault: !selectedTheme.isDefault});}} />
                            </>
                        }
                        
                        <BorderStyle className="p1" />

                        <DisabledSection enabled={customEnabled}>
                            <TextStyle  className='py2'><Text size={20} weight='med'>Controls</Text></TextStyle>
                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Player Controls' defaultChecked={selectedTheme.playerControls} onChange={() => {setSelectedTheme({...selectedTheme, playerControls: !selectedTheme.playerControls});}} />
                                <IconStyle id="playerControlsTooltip">info_outlined</IconStyle>
                                <Tooltip target="playerControlsTooltip">The controls at the bottom of the player</Tooltip>
                            </ControlToggleContainer>
                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Big Play Button' defaultChecked={selectedTheme.bigPlayButton === 'visible'} onChange={() => {setSelectedTheme({...selectedTheme, bigPlayButton: selectedTheme.bigPlayButton === 'visible' ? 'hidden' : 'visible'});}} />
                                <IconStyle id="bigPlayTooltip">info_outlined</IconStyle>
                                <Tooltip target="bigPlayTooltip">The big button in the middle before playback starts</Tooltip>
                            </ControlToggleContainer>
                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Show Scrubbing Thumbnail' defaultChecked={selectedTheme.scrubbingThumbnail} onChange={() => {setSelectedTheme({...selectedTheme, scrubbingThumbnail: !selectedTheme.scrubbingThumbnail});}} />
                                <IconStyle id="scrubberThumbnailTooltip">info_outlined</IconStyle>
                                <Tooltip target="scrubberThumbnailTooltip">Thumbnails when hovering over the video scrubber (time bar)</Tooltip>
                            </ControlToggleContainer>
                            

                            <BorderStyle className="p1" />
                            
                            
                            <TextStyle className="py2" ><Text size={20} weight='med'>Actions</Text></TextStyle>

                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Download Button' defaultChecked={selectedTheme.downloadButton} onChange={() => {setSelectedTheme({...selectedTheme, downloadButton: !selectedTheme.downloadButton});}} />
                                <IconStyle id="downloadButtonTooltip">info_outlined</IconStyle>
                                { getPrivilege('privilege-player-download') && <Tooltip target="downloadButtonTooltip">Whether viewers can download the video</Tooltip>}
                            </ControlToggleContainer>

                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Social Sharing' defaultChecked={selectedTheme.socialSharing} onChange={() => {setSelectedTheme({...selectedTheme, socialSharing: !selectedTheme.socialSharing});}} />
                                <IconStyle id="socialSharingTooltip">info_outlined</IconStyle>
                                <Tooltip target="socialSharingTooltip">Whether viewers can see links to share content on social media</Tooltip>
                            </ControlToggleContainer>

                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Embed Code' defaultChecked={selectedTheme.embedCode} onChange={() => {setSelectedTheme({...selectedTheme, embedCode: !selectedTheme.embedCode});}} />
                                <BorderStyle className="p1" />
                                <IconStyle id="embedCodeTooltip">info_outlined</IconStyle>
                                <Tooltip target="embedCodeTooltip">Whether viewers can see and copy the embed code for the content</Tooltip>
                            </ControlToggleContainer>
                            
                            <BorderStyle className="p1" />

                            <TextStyle className="py2" ><Text size={20} weight='med'>Appearance</Text></TextStyle>
                            <div className='relative'>
                                <div className='flex justify-between'>
                                    <Text size={14} weight='med'>Overlay Color</Text>
                                    <div>
                                    <IconStyle fontSize="default" id="overlayColorTooltip">info_outlined</IconStyle>
                                    <Tooltip target="overlayColorTooltip">The primary colour of the player</Tooltip>
                                    </div>
                                </div>
                                <ColorPicker defaultColor={selectedTheme.customOverlayColor} callback={(value: string) => {setSelectedTheme({...selectedTheme, customOverlayColor: value});}} />
                            </div>
                            <div className='my2 relative'>
                                <div className='flex justify-between'>
                                    <Text size={14} weight='med'>Menu Color</Text>
                                    <div>
                                        <IconStyle fontSize="default" id="menuColorTooltip">info_outlined</IconStyle>
                                        <Tooltip target="menuColorTooltip">The secondary colour of the player</Tooltip>
                                    </div>
                                </div>
                                
                                <ColorPicker defaultColor={selectedTheme.customMenuColor} callback={(value: string) => {setSelectedTheme({...selectedTheme, customMenuColor: value});}} />
                            </div>
                                
                            <BorderStyle className="p1" />

                            <TextStyle className="py2" ><Text size={20} weight='med'>Behaviour</Text></TextStyle>

                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Autoplay' defaultChecked={selectedTheme.autoplay} onChange={() => {setSelectedTheme({...selectedTheme, autoplay: !selectedTheme.autoplay});}} />
                                <IconStyle id="autoplayTooltip">info_outlined</IconStyle>
                                <Tooltip target="autoplayTooltip">Whether the content starts automatically</Tooltip>
                            </ControlToggleContainer>

                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Start Video Muted' defaultChecked={selectedTheme.startVideoMuted} onChange={() => {setSelectedTheme({...selectedTheme, startVideoMuted: !selectedTheme.startVideoMuted});}} />
                                <IconStyle id="startMutedTooltip">info_outlined</IconStyle>
                                <Tooltip target="startMutedTooltip">Whether the content is muted by default</Tooltip>
                            </ControlToggleContainer>

                            <ControlToggleContainer>
                                <Toggle className={togglePadding} label='Looping' defaultChecked={selectedTheme.looping} onChange={() => {setSelectedTheme({...selectedTheme, looping: !selectedTheme.looping});}} />
                                <IconStyle id="loopingTooltip">info_outlined</IconStyle>
                                <Tooltip target="loopingTooltip">Whether the content will start again when it reaches the end</Tooltip>
                            </ControlToggleContainer>
                        
                        </DisabledSection>
                        
                        {
                            props.contentType === 'live' || props.contentType === 'settings' ?
                                <>
                                    <BorderStyle className="p1" />

                                    <DisabledSection enabled={liveEnabled}>
                                        <TextStyle className="py2" ><Text size={20} weight='med'>Live Streams</Text></TextStyle>

                                        <ControlToggleContainer>
                                            <Toggle className={togglePadding} label='View Counter' defaultChecked={selectedTheme.isViewerCounterEnabled} onChange={() => {setSelectedTheme({...selectedTheme, isViewerCounterEnabled: !selectedTheme.isViewerCounterEnabled});}} />
                                            <IconStyle id="viewCounterTooltip">info_outlined</IconStyle>
                                            <Tooltip target="viewCounterTooltip">Whether viewers can see how many people are currently watching</Tooltip>
                                        </ControlToggleContainer>
                                        {
                                            selectedTheme.isViewerCounterEnabled ?
                                                <Input id='viewerCounterInput' type='number' label="Counter Limit" className='' value={selectedTheme.viewerCounterLimit.toString()} onChange={(event) => {setSelectedTheme({...selectedTheme, viewerCounterLimit: parseInt(event.currentTarget.value)});}} />
                                                : null
                                        }
                                    </DisabledSection>
                                </>
                                : null
                        }


                        {
                            props.contentType === 'playlist' || props.contentType === 'settings' ?
                                <> 
                                    <BorderStyle className="p1" />

                                    <DisabledSection enabled={playlistEnabled}>
                                        <TextStyle className="py2" ><Text size={20} weight='med'>Playlists</Text></TextStyle>
                                        <DropdownSingle className="mb2" dropdownTitle='Thumbnail Position' id='thumbnailPositionDropdown' list={{'Top': false, 'Left': false, 'Right': false, 'Bottom': false}} dropdownDefaultSelect={selectedTheme.thumbnailPosition} callback={(value: string) => {{setSelectedTheme({...selectedTheme, thumbnailPosition: value});}}} tooltip="The position of the links to other content in the Playlist" />

                                        <ControlToggleContainer>
                                            <Toggle className={togglePadding} label='Continuous Play' defaultChecked={selectedTheme.continuousPlay} onChange={() => {setSelectedTheme({...selectedTheme, continuousPlay: !selectedTheme.continuousPlay});}} />
                                            <IconStyle id="continuousPlayTooltip">info_outlined</IconStyle>
                                            <Tooltip target="continuousPlayTooltip">Whether the next piece of content will start automatically when the current one finishes</Tooltip>
                                        </ControlToggleContainer>
                                        
                                        <ControlToggleContainer>
                                            <Toggle className={togglePadding} label='Skip Videos' defaultChecked={selectedTheme.skipVideos} onChange={() => {setSelectedTheme({...selectedTheme, skipVideos: !selectedTheme.skipVideos});}} />
                                            <IconStyle id="skipVideosTooltip">info_outlined</IconStyle>
                                            <Tooltip target="skipVideosTooltip">Whether thumbnails are displayed, allowing viewers to skip from one video to another</Tooltip>
                                        </ControlToggleContainer>
                                    </DisabledSection>
                                </>
                                : null
                        }
            
                    </>  
                    }              
                </ControlsCard>
                <div className="mt25">
                    <Button isLoading={buttonLoading} onClick={() => handleThemeSave()}>{props.actionType}</Button>
                    <Button typeButton="tertiary" onClick={() => handleCancel()}>Cancel</Button>
                </div>
            </div>
            <Prompt when={selectedTheme.isCustom && JSON.stringify(selectedTheme) !== JSON.stringify(props.theme.themes.filter(t => t.isCustom)[0])} message='' />
        </div>
    )
}
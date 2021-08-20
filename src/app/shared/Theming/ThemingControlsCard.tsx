import React from 'react';
import { ControlsCard, TitleSection, ControlToggleContainer, PlayerSection, PlayerContainer, RadioButtonContainer } from './ThemingStyle';
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
import { DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { usePlayer } from '../../utils/services/player/player';
import { Prompt, useHistory } from 'react-router';
import { userToken } from '../../utils/services/token/tokenService';
import { Divider } from '../../../shared/MiscStyles';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { DisabledSection } from '../Common/MiscStyle';
import { ContentType } from '../../redux-flow/store/Common/types';

type ThemeContentType = ContentType | 'settings'

export interface ControlCardThemingComponentProps {
    theme: ContentTheme;
    contentType: ThemeContentType;
    actionType: 'Create' | 'Save';
    contentId?: string;
    saveTheme: (theme: ThemeOptions, contendId: string, contentType: ThemeContentType) => Promise<void>;
    createTheme?: (theme: ThemeOptions, contentType: ThemeContentType) => Promise<void>;
    createContentCustomTheme?: (theme: ThemeOptions, contendId: string, contentType: ThemeContentType) => Promise<void>;
    cancelFunction?: () => void;
}

export const ThemingControlsCard = (props: ControlCardThemingComponentProps) => {

    const togglePadding = 'py1'

    let history = useHistory()

    const handleDefaultSelectedTheme = (): ThemeOptions => {
        if (props.contentType === 'settings') {
            return props.theme.themes[0]
        }

        if (props.theme.contentThemeId && props.theme.themes.filter(t => t.id === props.theme.contentThemeId).length > 0) {
            return props.theme.themes.filter(t => t.id === props.theme.contentThemeId)[0]
        }

        if (props.theme.themes.filter(t => t.isDefault).length > 0) {
            return props.theme.themes.filter(t => t.isDefault)[0]
        }

        return props.theme.themes.filter(t => t.themeName === 'default')[0]
    }

    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(handleDefaultSelectedTheme())

    let playerRef = React.useRef<HTMLDivElement>(null)

    const accountId = userToken.getUserInfoItem('parent-id') || userToken.getUserInfoItem('user-id')

    let player = usePlayer(playerRef, props.contentType !== 'settings' ? accountId + '-' + props.contentType + '-' + props.contentId : '1d6184ed-954f-2ce6-a391-3bfe0552555c-vod-d72b87e4-596f-5057-5810-98f0f2ad0e22')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [editedSettings, setEditedSettings] = React.useState<boolean>(false)

    const handleThemeSave = () => {
        setButtonLoading(true);
        if (props.actionType === 'Create') {
            props.createTheme(selectedTheme, props.contentType).then(() => {
                setButtonLoading(false)
                setEditedSettings(false)
            }).catch(() => {
                setButtonLoading(false)
            })
        } else {
            if(selectedTheme.id === '-1') {
                props.createContentCustomTheme(selectedTheme, props.contentId, props.contentType).then(() => {
                    setButtonLoading(false)
                    setEditedSettings(false)
                }).catch(() => {
                    setButtonLoading(false)
                })
            } else {
                props.saveTheme(selectedTheme, props.contentId, props.contentType).then(() => {
                    setButtonLoading(false)
                    setEditedSettings(false)
                }).catch(() => {
                    setButtonLoading(false)
                })
            }

        }
    }

    const handleCancel = () => {
        switch (props.contentType) {
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
        if (props.theme.themes.filter(t => t.isCustom).length === 0) {
            let themesList: ThemeOptions[] = [...props.theme.themes, { ...defaultTheme, themeName: 'Custom Theme', isCustom: true }]
            return themesList.map(item => {
                let themesListDropdownItem: DropdownSingleListItem = {title: null, data: null}
                themesListDropdownItem.title = item.themeName
                themesListDropdownItem.data = item
                return themesListDropdownItem
            })
        }
        return props.theme.themes.map(item => {
            let themesListDropdownItem: DropdownSingleListItem = {title: null, data: null}
            themesListDropdownItem.title = item.themeName
            themesListDropdownItem.data = item
            return themesListDropdownItem
        })
    }

    const messagePositionDropdownList = [{title: "Top"}, {title: "Middle"}, {title: "Fullscreen"}]
    const thumbnailPositionDropdownList = [{title: "Top"}, {title: "Right"}, {title: "Left"}, {title: "Bottom"}, {title: "Hidden"}]

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
                        <div style={{ marginTop: 5 }}>
                            <Text size={20} weight='med'>
                                {
                                    selectedTheme.id === "-1" ?
                                        "New Theme"
                                        : "Edit Theme"
                                }
                            </Text>
                        </div>

                    </TitleSection>
                    {showAdvancedPanel ?
                        <>


                            // LS - I believe the new designs have this section appearing in security instead
                            // <Divider className="p1" />
                            // <DisabledSection settingsEditable={customEnabled && userToken.getPrivilege('privilege-aes')}>
                            //     <div className="my2" ><Text size={20} weight='med'>Delivery Method</Text></div>
                            //     <Text size={14} weight='reg'>Dacast gives you complete control over the delivery method of your videos. Choose the setting that's right for the type of content you have.</Text>
                            //     <RadioButtonContainer className="mt2">
                            //         <InputRadio name='delevery-method' value='compatible-delivery' label='Compatible Delivery' defaultChecked={selectedTheme.deliveryMethod === 'compatible'} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, deliveryMethod: 'compatible' }); }} />
                            //         <div>
                            //             <IconStyle id="compatibleDeliveryTooltip">info_outlined</IconStyle>
                            //             <Tooltip leftPositionValueToZero target="compatibleDeliveryTooltip">Attempts to play the content under all circumstances, falling back to insecure methods like Flash if necessary, to increase compatibility</Tooltip>
                            //         </div>
                            //     </RadioButtonContainer>
                            //
                            //     <RadioButtonContainer className="mt1">
                            //         <InputRadio name='delevery-method' value='secure-delivery' label='Secure Delivery' defaultChecked={selectedTheme.deliveryMethod === 'secure'} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, deliveryMethod: 'secure' }); }} />
                            //         <div>
                            //             <IconStyle id="secureDeliveryTooltip">info_outlined</IconStyle>
                            //             <Tooltip leftPositionValueToZero target="secureDeliveryTooltip">Encrypts playback with AES, which increases security at the cost of compatibility with older devices/browsers/OSs</Tooltip>
                            //         </div>
                            //     </RadioButtonContainer>
                            //
                            // </DisabledSection>

                            <Divider className="p1" />

                            <DisabledSection settingsEditable={customEnabled && userToken.getPrivilege('privilege-china')}>
                                <TitleSection className="my2">
                                    <Text size={20} weight='med'>Region Settings</Text>
                                    <Button sizeButton='xs' typeButton='secondary' buttonColor='blue' onClick={() => location.href = "/help"}>
                                        Contact Us
                                    </Button>
                                </TitleSection>
                                <Text size={14} weight='reg'>Select the PoPs that will cover the countries where your videos will be played.</Text>
                                <RadioButtonContainer className="mt2">
                                    <InputRadio name='region-settings' value='standard' label='Standard PoPs' defaultChecked={selectedTheme.regionSettings === 'standard'} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, regionSettings: 'standard' }) }} />
                                    <div>
                                        <IconStyle id="standardPoPsTooltip">info_outlined</IconStyle>
                                        <Tooltip leftPositionValueToZero target="standardPoPsTooltip">Our standard delivery method that may be slow in China</Tooltip>
                                    </div>
                                </RadioButtonContainer>
                                <RadioButtonContainer className="mt1">
                                    <InputRadio name='region-settings' value='premium' label='Premium PoPs' defaultChecked={selectedTheme.regionSettings === 'premium'} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, regionSettings: 'premium' }) }} />
                                    <div>
                                        <IconStyle id="premiumPoPsTooltip">info_outlined</IconStyle>
                                        <Tooltip leftPositionValueToZero target="premiumPoPsTooltip">Our premium delivery method with increased performance in China</Tooltip>
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
                                            dropdownDefaultSelect={selectedTheme.themeName}
                                            callback={
                                                (item: DropdownSingleListItem) => {
                                                    setEditedSettings(true);
                                                    setSelectedTheme(item.title === "Custom Theme" ? { ...defaultTheme, themeName: 'Custom Theme', isCustom: true } : item.data)
                                                }} />
                                        <Bubble className="mt25" type="info">
                                            {selectedTheme.isCustom ?
                                                "Custom Settings override any Theme settings."
                                                :
                                                "If you wish to create a new Theme or edit a Theme, go to Theming."
                                            }
                                        </Bubble>
                                    </>
                                    :
                                    <>
                                        <Input className='my2' label='Theme Name' id='themeTitle' placeholder='New Theme' value={selectedTheme.themeName} onChange={(event) => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, themeName: event.currentTarget.value }); }} />
                                        <InputCheckbox id='themeIsDefaultCheckbox' label='Make Default Theme' checked={selectedTheme.isDefault} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, isDefault: !selectedTheme.isDefault }); }} />
                                    </>
                            }

                            <Divider className="p1" />

                            <DisabledSection settingsEditable={customEnabled}>
                                <div className='py2'><Text size={20} weight='med'>Controls</Text></div>
                                <ControlToggleContainer>
                                    <Toggle className={togglePadding} label='Player Controls' checked={selectedTheme.playerControls} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, playerControls: !selectedTheme.playerControls }); }} />
                                    <IconStyle id="playerControlsTooltip">info_outlined</IconStyle>
                                    <Tooltip leftPositionValueToZero target="playerControlsTooltip">The controls at the bottom of the player</Tooltip>
                                </ControlToggleContainer>
                                <ControlToggleContainer>
                                    <Toggle className={togglePadding} label='Big Play Button' checked={selectedTheme.bigPlayButton === 'visible'} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, bigPlayButton: selectedTheme.bigPlayButton === 'visible' ? 'hidden' : 'visible' }); }} />
                                    <IconStyle id="bigPlayTooltip">info_outlined</IconStyle>
                                    <Tooltip leftPositionValueToZero target="bigPlayTooltip">The big button in the middle before playback starts</Tooltip>
                                </ControlToggleContainer>
                                <ControlToggleContainer>
                                    <Toggle className={togglePadding} label='Show Scrubbing Thumbnail' checked={selectedTheme.scrubbingThumbnail} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, scrubbingThumbnail: !selectedTheme.scrubbingThumbnail }); }} />
                                    <IconStyle id="scrubberThumbnailTooltip">info_outlined</IconStyle>
                                    <Tooltip leftPositionValueToZero target="scrubberThumbnailTooltip">Thumbnails when hovering over the video scrubber (time bar)</Tooltip>
                                </ControlToggleContainer>


                                <Divider className="p1" />


                                <div className="py2" ><Text size={20} weight='med'>Actions</Text></div>

                                {
                                    userToken.getPrivilege('privilege-player-download') &&
                                        <ControlToggleContainer>
                                            <Toggle className={togglePadding} label='Download Button' checked={selectedTheme.downloadButton} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, downloadButton: !selectedTheme.downloadButton }); }} />
                                            <IconStyle id="downloadButtonTooltip">info_outlined</IconStyle>
                                            <Tooltip leftPositionValueToZero target="downloadButtonTooltip">Whether viewers can download the video</Tooltip>
                                        </ControlToggleContainer>
                                }

                                <ControlToggleContainer>
                                    <Toggle className={togglePadding} label='Social Sharing' checked={selectedTheme.socialSharing} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, socialSharing: !selectedTheme.socialSharing }); }} />
                                    <IconStyle id="socialSharingTooltip">info_outlined</IconStyle>
                                    <Tooltip leftPositionValueToZero target="socialSharingTooltip">Whether viewers can see links to share content on social media</Tooltip>
                                </ControlToggleContainer>

                                <ControlToggleContainer>
                                    <Toggle className={togglePadding} label='Embed Code' checked={selectedTheme.embedCode} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, embedCode: !selectedTheme.embedCode }); }} />
                                    <Divider className="p1" />
                                    <IconStyle id="embedCodeTooltip">info_outlined</IconStyle>
                                    <Tooltip leftPositionValueToZero target="embedCodeTooltip">Whether viewers can see and copy the embed code for the content</Tooltip>
                                </ControlToggleContainer>

                                <Divider className="p1" />

                                <div className="py2" ><Text size={20} weight='med'>Appearance</Text></div>
                                <div className='relative'>
                                    <div className='flex justify-between'>
                                        <Text size={14} weight='med'>Overlay Color</Text>
                                        <div>
                                            <IconStyle fontSize="default" id="overlayColorTooltip">info_outlined</IconStyle>
                                            <Tooltip leftPositionValueToZero target="overlayColorTooltip">The primary colour of the player</Tooltip>
                                        </div>
                                    </div>
                                    <ColorPicker defaultColor={selectedTheme.customOverlayColor} callback={(value: string) => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, customOverlayColor: value }); }} />
                                </div>
                                <div className='my2 relative'>
                                    <div className='flex justify-between'>
                                        <Text size={14} weight='med'>Menu Color</Text>
                                        <div>
                                            <IconStyle fontSize="default" id="menuColorTooltip">info_outlined</IconStyle>
                                            <Tooltip leftPositionValueToZero target="menuColorTooltip">The secondary colour of the player</Tooltip>
                                        </div>
                                    </div>

                                    <ColorPicker defaultColor={selectedTheme.customMenuColor} callback={(value: string) => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, customMenuColor: value }); }} />
                                </div>

                                <Divider className="p1" />

                                <div className="py2" ><Text size={20} weight='med'>Behavior</Text></div>

                                <ControlToggleContainer>
                                    <Toggle className={togglePadding} label='Autoplay' checked={selectedTheme.autoplay} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, autoplay: !selectedTheme.autoplay }); }} />
                                    <IconStyle id="autoplayTooltip">info_outlined</IconStyle>
                                    <Tooltip leftPositionValueToZero target="autoplayTooltip">Whether the content starts automatically</Tooltip>
                                </ControlToggleContainer>

                                <ControlToggleContainer>
                                    <Toggle className={togglePadding} label='Start Video Muted' checked={selectedTheme.startVideoMuted} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, startVideoMuted: !selectedTheme.startVideoMuted }); }} />
                                    <IconStyle id="startMutedTooltip">info_outlined</IconStyle>
                                    <Tooltip leftPositionValueToZero target="startMutedTooltip">Whether the content is muted by default</Tooltip>
                                </ControlToggleContainer>

                                <ControlToggleContainer>
                                    <Toggle className={togglePadding} label='Looping' checked={selectedTheme.looping} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, looping: !selectedTheme.looping }); }} />
                                    <IconStyle id="loopingTooltip">info_outlined</IconStyle>
                                    <Tooltip leftPositionValueToZero target="loopingTooltip">Whether the content will start again when it reaches the end</Tooltip>
                                </ControlToggleContainer>

                            </DisabledSection>


                            {
                                (props.contentType === 'live' || props.contentType === 'settings') &&
                                <>
                                    <Divider className="p1" />

                                    <DisabledSection settingsEditable={liveEnabled}>
                                        <div className="py2" ><Text size={20} weight='med'>Live Streams</Text></div>

                                        <ControlToggleContainer>
                                            <Toggle className={togglePadding} label='View Counter' checked={selectedTheme.isViewerCounterEnabled} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, isViewerCounterEnabled: !selectedTheme.isViewerCounterEnabled }); }} />
                                            <IconStyle id="viewCounterTooltip">info_outlined</IconStyle>
                                            <Tooltip leftPositionValueToZero target="viewCounterTooltip">Whether viewers can see how many people are currently watching</Tooltip>
                                        </ControlToggleContainer>
                                        {
                                            selectedTheme.isViewerCounterEnabled &&
                                            <Input id='viewerCounterInput' type='number' label="Counter Limit" className='' value={selectedTheme.viewerCounterLimit ? selectedTheme.viewerCounterLimit.toString() : ''} onChange={(event) => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, viewerCounterLimit: parseInt(event.currentTarget.value) }); }} />
                                        }
                                    </DisabledSection>
                                </>
                            }


                            {
                                (props.contentType === 'playlist' || props.contentType === 'settings') &&
                                <>
                                    <Divider className="p1" />

                                    <DisabledSection settingsEditable={playlistEnabled}>
                                        <div className="py2" ><Text size={20} weight='med'>Playlists</Text></div>
                                        <DropdownSingle className="mb2" dropdownTitle='Thumbnail Position' id='thumbnailPositionDropdown' list={thumbnailPositionDropdownList} dropdownDefaultSelect={capitalizeFirstLetter(selectedTheme.thumbnailPosition)} callback={(item: DropdownSingleListItem) => { { setSelectedTheme({ ...selectedTheme, thumbnailPosition: item.title }); } }} tooltip="The position of the links to other content in the Playlist" />

                                        <ControlToggleContainer>
                                            <Toggle className={togglePadding} label='Continuous Play' checked={selectedTheme.continuousPlay} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, continuousPlay: !selectedTheme.continuousPlay }); }} />
                                            <IconStyle id="continuousPlayTooltip">info_outlined</IconStyle>
                                            <Tooltip leftPositionValueToZero target="continuousPlayTooltip">Whether the next piece of content will start automatically when the current one finishes</Tooltip>
                                        </ControlToggleContainer>

                                        <ControlToggleContainer>
                                            <Toggle className={togglePadding} label='Skip Content' checked={selectedTheme.skipVideos} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, skipVideos: !selectedTheme.skipVideos }); }} />
                                            <IconStyle id="skipVideosTooltip">info_outlined</IconStyle>
                                            <Tooltip leftPositionValueToZero target="skipVideosTooltip">Whether thumbnails are displayed, allowing viewers to skip from one video to another</Tooltip>
                                        </ControlToggleContainer>
                                    </DisabledSection>


                                </>
                            }

                            {

                                <>
                                    <Divider className="p1" />
                                    {
                                        (props.contentType === 'vod' || props.contentType === 'settings') &&
                                        <>
                                            <DisabledSection settingsEditable={customEnabled}>
                                                <div className="py2" ><Text size={20} weight='med'>Videos</Text></div>

                                                <ControlToggleContainer>
                                                    <Toggle className={togglePadding} label='Show Full Timecode' checked={selectedTheme.showFullTimeCode} onChange={() => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, showFullTimeCode: !selectedTheme.showFullTimeCode }); }} />
                                                    <IconStyle id="viewCounterTooltip">info_outlined</IconStyle>
                                                    <Tooltip leftPositionValueToZero target="viewCounterTooltip">Displays a full timecode in the player, including milliseconds.</Tooltip>
                                                </ControlToggleContainer>
                                                {
                                                    selectedTheme.isViewerCounterEnabled &&
                                                    <Input id='viewerCounterInput' type='number' label="Counter Limit" className='' value={selectedTheme.viewerCounterLimit ? selectedTheme.viewerCounterLimit.toString() : ''} onChange={(event) => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, viewerCounterLimit: parseInt(event.currentTarget.value) }); }} />
                                                }
                                            </DisabledSection>

                                            <Divider className="p1" />
                                        </>
                                    }

                                    <DisabledSection settingsEditable={customEnabled}>
                                        <div className="pt25 flex justify-between">
                                            <div><Text size={20} weight='med'>Offline Message</Text></div>
                                            <ControlToggleContainer>
                                                <IconStyle id="offlineMessageTooltip">info_outlined</IconStyle>
                                                <Tooltip leftPositionValueToZero target="offlineMessageTooltip">The text to show viewers when the content is not online</Tooltip>
                                            </ControlToggleContainer>
                                        </div>

                                        <Input className='my2' value={selectedTheme.offlineMessage} onChange={(event) => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, offlineMessage: event.currentTarget.value }) }} />

                                        <DropdownSingle className="mb2" dropdownTitle='Message Position' id='offlineMessagePositionDropdown' list={messagePositionDropdownList} dropdownDefaultSelect={capitalizeFirstLetter(selectedTheme.offlineMessagePosition)} callback={(item: DropdownSingleListItem) => { setEditedSettings(true); setSelectedTheme({ ...selectedTheme, offlineMessagePosition: item.title.toLowerCase() }) }} disabled={!customEnabled} />
                                    </DisabledSection>


                                </>
                            }

                        </>
                    }
                </ControlsCard>
                <div className="mt25">
                    <Button isLoading={buttonLoading} onClick={() => handleThemeSave()}>{props.actionType}</Button>
                    <Button typeButton="tertiary" onClick={() => handleCancel()}>Cancel</Button>
                </div>
            </div>
            <Prompt when={editedSettings} message='' />
        </div>
    )
}

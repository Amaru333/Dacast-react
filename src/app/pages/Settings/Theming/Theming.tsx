import React from 'react';
import { ThemingContainer, PlayerSection, PlayerContainer, BorderStyle, TextStyle, TitleSection, Heading, ControlsCard } from '../../../shared/Theming/ThemingStyle'
import { Card } from '../../../../components/Card/Card';
import { Toggle } from '../../../../components/Toggle/toggle';
import { Text } from '../../../../components/Typography/Text';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { Table } from '../../../../components/Table/Table';
import { IconStyle, IconContainer } from '../../../../shared/Common/Icon';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../../components/FormsComponents/Input/InputRadio';
import { ThemingComponentProps} from '../../../containers/Settings/Theming';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { ColorPicker } from '../../../../components/ColorPicker/ColorPicker';
import { InputCheckbox } from '../../../../components/FormsComponents/Input/InputCheckbox';
import { usePlayer } from '../../../utils/player';
import { tsToLocaleDate } from '../../../../utils/utils';
import { DateTime } from 'luxon';

export const ThemingPage = (props: ThemingComponentProps) => {

    const [currentPage, setCurrentPage] = React.useState<'list' | 'options'>('list');
    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(null);
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false)
    const newTheme: ThemeOptions = {
        id: "-1",
        themeName: '',
        isDefault: false,
        createdDate: '',
        themeType: 'vod',
        bigPlayButton: true,
        playPause: true,
        scrubber: true,
        scrubbingThumbnail: false,
        timeCode: true,
        speedControls: true,
        qualityOptions: true,
        volume: true,
        fullscreen: true,
        thumbnailPosition: 'left',
        isViewerCounterEnabled: false,
        viewerCounterLimit: 100,
        downloadButton: false,
        socialSharing: false,
        embedCode: false,
        playerTransparency: false,
        customMenuColor: '',
        customOverlayColor: '',
        autoplay: false,
        startVideoMuted: false,
        looping: false,
        continuousPlay: false,
        skipVideos: false,
        offlineMessage: 'Sorry this media is offline',
        deliveryMethod: 'compatible',
        regionSettings: 'standard'
    };

    const togglePadding = 'py1';
    const [showAdvancedPanel, setShowAdvancedPanel] = React.useState<boolean>(false);

    let playerRef = React.useRef<HTMLDivElement>(null);

    let player = usePlayer(playerRef, '1552_f_297509');

    const ThemingOptions = () => {
        return (
            <>
                <ThemingContainer>
                    <div className='col col-12 md-col-4 mr2 flex flex-column' >
                        <ControlsCard className='col col-12'>
                            <TitleSection>
                                <div style={{marginTop: 5}}>
                                    <Text size={20} weight='med'>
                                        {
                                            selectedTheme.id === "-1" ?
                                                "New Theme"
                                                : "Edit Theme"
                                        }
                                    </Text>
                                </div>
                                <Button className='right mb2 flex' sizeButton='large' typeButton='tertiary' buttonColor='blue' onClick={(event) => {event.preventDefault();setShowAdvancedPanel(!showAdvancedPanel)}}>{showAdvancedPanel ? <><IconStyle>keyboard_arrow_left</IconStyle><Text size={16} color='dark-violet' weight='reg'>Back</Text></>: 'Advanced'}</Button>
                            </TitleSection>
                            {
                                showAdvancedPanel ?
                                <>
                                    <TextStyle className="py2" ><Text size={20} weight='med'>Offline Message</Text></TextStyle>
                                    <Input className='my2' value={selectedTheme.offlineMessage} onChange={(event) => {setSelectedTheme({...selectedTheme, offlineMessage: event.currentTarget.value});setSettingsEdited(true)}} />
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Delivery Method</Text></TextStyle>
                                    <Text size={14} weight='reg'>Dacast gives you complete control over the delivery method of your videos. Choose the setting that's right for the type of content you have.</Text>
                                    <InputRadio name='delevery-method' value='compatible-delivery' label='Compatible Delivery' defaultChecked={selectedTheme.deliveryMethod === 'compatible'} onChange={() => {setSelectedTheme({...selectedTheme, deliveryMethod:'compatible'});setSettingsEdited(true)}}/>
                                    <InputRadio name='delevery-method' value='secure-delivery' label='Secure Delivery' defaultChecked={selectedTheme.deliveryMethod === 'secure'} onChange={() => {setSelectedTheme({...selectedTheme, deliveryMethod: 'secure'});setSettingsEdited(true)}} />
                                    <BorderStyle className="p1" />

                                    <TitleSection className="my2">
                                        <Text size={20} weight='med'>Region Settings</Text>
                                        <Button sizeButton='xs' typeButton='secondary' buttonColor='blue' onClick={() => location.href="/help"}>
                                            Contact Us
                                        </Button>

                                    </TitleSection>
                                    <Text size={14} weight='reg'>Select the PoPs that will cover the countries where your videos will be played.</Text>
                                    <InputRadio name='region-settings' value='standard' label='Standard PoPs' defaultChecked={selectedTheme.regionSettings === 'standard'} onChange={() => {setSelectedTheme({...selectedTheme, regionSettings: 'standard'});setSettingsEdited(true)}} />
                                    <InputRadio name='region-settings' value='premium' label='Premium PoPs' defaultChecked={selectedTheme.regionSettings === 'premium'} onChange={() => {setSelectedTheme({...selectedTheme, regionSettings: 'premium'});setSettingsEdited(true)}} /> 
                                </>
                                    :
                                <>
                                    <Input className='mb2' label='Theme Name' id='themeTitle' placeholder='New Theme' value={selectedTheme.themeName} onChange={(event) => {setSelectedTheme({...selectedTheme, themeName: event.currentTarget.value});setSettingsEdited(true)}} />
                                    <InputCheckbox  id='themeIsDefaultCheckbox' label='Make Default Theme' defaultChecked={selectedTheme.isDefault} onChange={() => {setSelectedTheme({...selectedTheme, isDefault: !selectedTheme.isDefault});setSettingsEdited(true)}} />
                                    <BorderStyle className="p1" />

                                    <TextStyle  className='py2'><Text size={20} weight='med'>Controls</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Big Play Button' defaultChecked={selectedTheme.bigPlayButton} onChange={() => {setSelectedTheme({...selectedTheme, bigPlayButton: !selectedTheme.bigPlayButton});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Play/Pause' defaultChecked={selectedTheme.playPause} onChange={() => {setSelectedTheme({...selectedTheme, playPause: !selectedTheme.playPause});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Scrubber' defaultChecked={selectedTheme.scrubber} onChange={() => {setSelectedTheme({...selectedTheme, scrubber: !selectedTheme.scrubber});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Show Scrubbing Thumbnail' defaultChecked={selectedTheme.scrubbingThumbnail} onChange={() => {setSelectedTheme({...selectedTheme, scrubbingThumbnail: !selectedTheme.scrubbingThumbnail});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Time Code' defaultChecked={selectedTheme.timeCode} onChange={() => {setSelectedTheme({...selectedTheme, timeCode: !selectedTheme.timeCode});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Speed Controls' defaultChecked={selectedTheme.speedControls} onChange={() => {setSelectedTheme({...selectedTheme, speedControls: !selectedTheme.speedControls});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Quality Options' defaultChecked={selectedTheme.qualityOptions} onChange={() => {setSelectedTheme({...selectedTheme, qualityOptions: !selectedTheme.qualityOptions});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Volume' defaultChecked={selectedTheme.volume} onChange={() => {setSelectedTheme({...selectedTheme, volume: !selectedTheme.volume});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Fullscreen' defaultChecked={selectedTheme.fullscreen} onChange={() => {setSelectedTheme({...selectedTheme, fullscreen: !selectedTheme.fullscreen});setSettingsEdited(true)}} />
                                    <DropdownSingle dropdownTitle='Thumbnail Position' id='thumbnailPositionDropdown' list={{'Left': false, 'Right': false}} isInModal={true} dropdownDefaultSelect={selectedTheme.thumbnailPosition} callback={(value: string) => {{setSelectedTheme({...selectedTheme, thumbnailPosition: value});setSettingsEdited(true)}}} />
                                    <Toggle className={togglePadding} label='View Counter' defaultChecked={selectedTheme.isViewerCounterEnabled} onChange={() => {setSelectedTheme({...selectedTheme, isViewerCounterEnabled: !selectedTheme.isViewerCounterEnabled});setSettingsEdited(true)}} />
                                    {
                                        selectedTheme.isViewerCounterEnabled ?
                                            <Input id='viewerCounterInput' type='number' className='' value={selectedTheme.viewerCounterLimit.toString()} onChange={(event) => {setSelectedTheme({...selectedTheme, viewerCounterLimit: parseInt(event.currentTarget.value)});setSettingsEdited(true)}} />
                                            : null
                                    }
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Actions</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Download Button' defaultChecked={selectedTheme.downloadButton} onChange={() => {setSelectedTheme({...selectedTheme, downloadButton: !selectedTheme.downloadButton});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Social Sharing' defaultChecked={selectedTheme.socialSharing} onChange={() => {setSelectedTheme({...selectedTheme, socialSharing: !selectedTheme.socialSharing});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Embed Code' defaultChecked={selectedTheme.embedCode} onChange={() => {setSelectedTheme({...selectedTheme, embedCode: !selectedTheme.embedCode});setSettingsEdited(true)}} />
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Appearance</Text></TextStyle>
                                        <div className='relative'>
                                            <Text className='pb1' size={14} weight='med'>Overlay Color</Text>
                                            <ColorPicker defaultColor={selectedTheme.customOverlayColor} callback={(value: string) => {setSelectedTheme({...selectedTheme, customOverlayColor: value});setSettingsEdited(true)}} />
                                        </div>
                                        <div className='my2 relative'>
                                            <Text className='pb1' size={14} weight='med'>Menu Color</Text>
                                            <ColorPicker defaultColor={selectedTheme.customMenuColor} callback={(value: string) => {setSelectedTheme({...selectedTheme, customMenuColor: value});setSettingsEdited(true)}} />
                                        </div>
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Behaviour</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Autoplay' defaultChecked={selectedTheme.autoplay} onChange={() => {setSelectedTheme({...selectedTheme, autoplay: !selectedTheme.autoplay});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Start Video Muted' defaultChecked={selectedTheme.startVideoMuted} onChange={() => {setSelectedTheme({...selectedTheme, startVideoMuted: !selectedTheme.startVideoMuted});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Looping' defaultChecked={selectedTheme.looping} onChange={() => {setSelectedTheme({...selectedTheme, looping: !selectedTheme.looping});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Continuous Play' defaultChecked={selectedTheme.continuousPlay} onChange={() => {setSelectedTheme({...selectedTheme, continuousPlay: !selectedTheme.continuousPlay});setSettingsEdited(true)}} />
                                    <Toggle className={togglePadding} label='Skip Videos' defaultChecked={selectedTheme.skipVideos} onChange={() => {setSelectedTheme({...selectedTheme, skipVideos: !selectedTheme.skipVideos});setSettingsEdited(true)}} />
                                    
                                </>
                                
                            }
                        </ControlsCard>
                        <div className="mt25">
                            <Button 
                                className="mr1" 
                                disabled={!settingsEdited}
                                onClick={
                                    () => {{
                                        selectedTheme.id === "-1" ?
                                            props.createTheme(selectedTheme)
                                            : props.saveTheme(selectedTheme)
                                    };setCurrentPage('list')}
                                }>
                            Save
                            </Button>
                            <Button typeButton="tertiary" onClick={() => {setCurrentPage('list');setSelectedTheme(null)}}>Cancel</Button>
                        </div>
                    </div>
                    <PlayerSection className='col col-12 md-col-8 mr2'>
                        <PlayerContainer>
                            <div ref={playerRef}>
                            </div>
                        </PlayerContainer>
                    </PlayerSection>
                </ThemingContainer>
            </>
        )
    }

    const ThemingList = () => {
        const themingTableHeader = () => {
            return {data: [
                {cell: <Text key='ThemingTableHeaderName' size={14} weight='med'>Name</Text>},
                {cell: <Text key='ThemingTableHeaderDefault' size={14} weight='med'>Default</Text>},
                {cell: <Text key='ThemingTableHeaderCreated' size={14} weight='med'>Created Date</Text>},
                {cell: <Button className='right mr2' onClick={() => {setSelectedTheme(newTheme);setCurrentPage('options')}} sizeButton='xs' typeButton='secondary' buttonColor='blue'>New Theme</Button>}
            ]}
        }

        const themingTableBody = () => {
            return props.themingList.themes.map((theme, key) => {
                return {data: [
                    <Text key={'ThemingTableBodyNameCell' + key.toString()} size={14} weight='reg'>{theme.themeName}</Text>,
                    theme.isDefault ? <IconStyle coloricon='green' key={'ThemingTableBodyDefaultCell' + key.toString()}>checked</IconStyle> : <></>,
                    <Text key={'ThemingTableBodyCreatedCell' + key.toString()} size={14} weight='reg'>{tsToLocaleDate(theme.createdDate, DateTime.DATETIME_SHORT)}</Text>,
                    <IconContainer className="iconAction" key={'ThemingTableBodyButtonsCell' + key.toString()}><IconStyle onClick={(event) => { event.preventDefault();props.createTheme({...theme, themeName: theme.themeName + ' copy'})}} >filter_none_outlined</IconStyle><IconStyle onClick={(event) => { event.preventDefault();props.deleteTheme(theme)}} >delete</IconStyle><IconStyle onClick={(event) => { event.preventDefault(); setSelectedTheme(props.themingList.themes.filter((item) => {return item.id === theme.id })[0]); setCurrentPage('options') }}>edit</IconStyle> </IconContainer>

                ]}
            })
        }

        return (
            <Card>
                <Text className='py2' size={20} weight='med'>Themes</Text>
                <TextStyle className='py2'><Text size={14} weight='reg'>Some information about Theming</Text></TextStyle>
                <div className='my2 flex'>
                    <IconStyle className="mr1">info_outlined</IconStyle> 
                    <Text size={14} weight='reg'>Need help creating a Theme? Visit the <a>Knowledge Base</a></Text>
                </div>
                <Table id='themesListTable' headerBackgroundColor="gray-10" header={themingTableHeader()} body={themingTableBody()} />
            </Card>
        )
    }

    return (
        <div>
            {   
                currentPage === 'list' ?
                    ThemingList()
                    : ThemingOptions()
            }
        </div>
    )
}
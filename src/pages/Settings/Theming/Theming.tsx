import React from 'react';
import { ThemingContainer, PlayerSection, PlayerContainer, BorderStyle, TextStyle, IconContainer, TitleSection, Heading } from './ThemingStyle'
import { Card } from '../../../components/Card/Card';
import { Toggle } from '../../../components/Toggle/toggle';
import { Text } from '../../../components/Typography/Text';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Table } from '../../../components/Table/Table';
import { Icon } from '@material-ui/core';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Modal } from '../../../components/Modal/Modal';
import { MailCatcherModal } from  './MailCatcherModal';
import { ThemingComponentProps} from '../../../containers/Settings/Theming';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';

export const ThemingPage = (props: ThemingComponentProps) => {

    const [currentPage, setCurrentPage] = React.useState<'list' | 'options'>('list');
    const [themesList, setThemesList] = React.useState<ThemeOptions[]>(props.themingList.themes);
    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(null);
    const newTheme: ThemeOptions = {
        themeName: '',
        isDefault: false,
        createdDate: '',
        themeType: 'vod',
        bigPlayButton: false,
        playPause: false,
        scrubber: false,
        scrubbingThumbnail: false,
        timeCode: false,
        speedControls: false,
        qualityOptions: false,
        volume: false,
        fullscreen: false,
        thumbnailPosition: 'left',
        isViewerCounterEnabled: false,
        viewerCounterLimit: 100,
        downloadButton: false,
        socialSharing: false,
        embedCode: false,
        autoplay: false,
        startVideoMuted: false,
        looping: false,
        continuousPlay: false,
        skipVideos: false,
        mailCatcher: [],
        endScreenText: '',
        endScreenTextLink: '',
        isTitleAsBrandText: false,
        brandText: '',
        brandTextLink: '',
        offlineMessage: '',
        deliveryMethod: 'compatible',
        regionSetting: 'standard'
    };
    let playerRef = React.useRef<HTMLDivElement>(null);
    const [player, setPlayer] = React.useState<any>(null);
    const togglePadding = 'py1';
    const [showAdvancedPanel, setShowAdvancedPanel] = React.useState<boolean>(false);
    const [mailCatcherModalOpened, setMailCatcherModalOpened] = React.useState<boolean>(false);

    React.useEffect(() => {
        if(playerRef && playerRef.current)
        {
            const playerScript = document.createElement('script');
            playerScript.src = "https://player.dacast.com/js/player.js";
            playerRef.current.appendChild(playerScript);
            playerScript.addEventListener('load', () => {

                setPlayer(dacast('104301_f_769886', playerRef.current, {
                    player: 'theo',
                    height: 341,
                    width: '100%'
                }))

            })
        }
        return () => player ? player.dispose() : null;
    }, [])

    React.useEffect(() => {
        if(player) {
            player.onReady(() => {
                if(player.getPlayerInstance().autoplay){
                    let onPlay = () => {
                        player.getPlayerInstance().pause()

                        player.getPlayerInstance().removeEventListener('loadedmetadata', onPlay);
                    };
                    player.getPlayerInstance().addEventListener('loadedmetadata', onPlay);
                    player.play();
                }
            })
        }
    }, [player])

    React.useEffect(() => {console.log(selectedTheme)}, [selectedTheme])

    const ThemingOptions = () => {

        const mailCatcherTableHeader = () => {
            return [
                <Text key='MailCatcherTableHeaderTypeCell' size={14} weight='med'>Type</Text>,
                <Text key='MailCatcherTableHeaderDefaultCell' size={14} weight='med'>Default</Text>,
                <span key='MailCatcherTableHeaderEmptyCell'></span>
            ]
        }

        const mailCatcherTableBody = () => {
            return selectedTheme.mailCatcher.map((row, i) => {
                return [
                    <Text key={row.type + i.toString()} size={14}  weight="reg" color="gray-1">{row.type}</Text>,
                    row.isDefault ? <Icon key={'mailCatcherTableBodyIsDefaultCell' + i.toString()}>checked</Icon> : <></>,
                    <IconContainer className="iconAction" key={'mailCatcherTableActionButtons' + i.toString()}><Icon onClick={(event) => {event.preventDefault()}} >delete</Icon><Icon onClick={(event) => {event.preventDefault()}}>edit</Icon> </IconContainer>
                
                ]
            })
        }
        return (
            <>
                <Heading className='my2'>
                    <Button onClick={() => setCurrentPage('list')} sizeButton='xs' typeButton='secondary' buttonColor='blue'><Icon>keyboard_arrow_left</Icon></Button>
                    <Input className='ml1' id='themeTitle' placeholder='New Theme' value={selectedTheme.themeName} onChange={(event) => setSelectedTheme({...selectedTheme, themeName: event.currentTarget.value})} />
                </Heading>
                <ThemingContainer>

                    <Card className='col col-12 md-col-4 mr2'>
                        <TitleSection className="mb2" >
                            <Text size={20} weight='med'>Controls</Text>
                            <Button className='right mb2' sizeButton='large' typeButton='tertiary' buttonColor='blue' onClick={(event) => {event.preventDefault();setShowAdvancedPanel(!showAdvancedPanel)}}>{showAdvancedPanel ? <><Icon>keyboard_arrow_left</Icon><Text size={16} color='dark-violet' weight='reg'>Back</Text></>: 'Advanced'}</Button>
                        </TitleSection>
                        {
                            showAdvancedPanel ?
                                <>
                                    <Text size={20} weight='med'>End Screen Text</Text>
                                    <Input className='my2' value={selectedTheme.endScreenText} onChange={(event) => setSelectedTheme({...selectedTheme, endScreenText: event.currentTarget.value})}/>
                                    <Input className='my2' label='End Screen Text Link' value={selectedTheme.endScreenTextLink} onChange={(event) => setSelectedTheme({...selectedTheme, endScreenTextLink: event.currentTarget.value})} />
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Brand Text</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Use video title as brand text' defaultChecked={selectedTheme.isTitleAsBrandText} onChange={(event) => {setSelectedTheme({...selectedTheme, isTitleAsBrandText: event.currentTarget.checked})}} />
                                    <Input disabled={selectedTheme.isTitleAsBrandText} className='my2' label='Brand Text' value={selectedTheme.isTitleAsBrandText ? selectedTheme.endScreenText : selectedTheme.brandText} onChange={(event) => setSelectedTheme({...selectedTheme, brandText: event.currentTarget.value})} />
                                    <Input className='my2' label='Brand Text Link' value={selectedTheme.brandTextLink} onChange={(event) => setSelectedTheme({...selectedTheme, brandTextLink: event.currentTarget.value})} />

                                    <BorderStyle className="p1" />

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
                                        <Button sizeButton='xs' typeButton='secondary' buttonColor='blue'>
                                            Contact Us
                                        </Button>

                                    </TitleSection>
                                    <Text size={14} weight='reg'>Select the PoPs that will cover the countries where your videos will be played.</Text>
                                    <InputRadio name='region-settings' value='standard' label='Standard PoPs' defaultChecked={selectedTheme.regionSetting === 'standard'} onChange={() => setSelectedTheme({...selectedTheme, regionSetting: 'standard'})} />
                                    <InputRadio name='region-settings' value='premium' label='Premium PoPs' defaultChecked={selectedTheme.regionSetting === 'premium'} onChange={() => setSelectedTheme({...selectedTheme, regionSetting: 'premium'})} /> 
                                </>
                                :
                                <>
                                    <Toggle className={togglePadding} label='Big Play Button' defaultChecked={selectedTheme.bigPlayButton} onChange={(event) => setSelectedTheme({...selectedTheme, bigPlayButton: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Play/Pause' defaultChecked={selectedTheme.playPause} onChange={(event) => setSelectedTheme({...selectedTheme, playPause: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Scrubber' defaultChecked={selectedTheme.scrubber} onChange={(event) => setSelectedTheme({...selectedTheme, scrubber: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Show Scrubbing Thumbnail' defaultChecked={selectedTheme.scrubbingThumbnail} onChange={(event) => setSelectedTheme({...selectedTheme, scrubbingThumbnail: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Time Code' defaultChecked={selectedTheme.timeCode} onChange={(event) => setSelectedTheme({...selectedTheme, timeCode: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Speed Controls' defaultChecked={selectedTheme.speedControls} onChange={(event) => setSelectedTheme({...selectedTheme, speedControls: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Quality Options' defaultChecked={selectedTheme.qualityOptions} onChange={(event) => setSelectedTheme({...selectedTheme, qualityOptions: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Volume' defaultChecked={selectedTheme.volume} onChange={(event) => setSelectedTheme({...selectedTheme, volume: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Fullscreen' defaultChecked={selectedTheme.fullscreen} onChange={(event) => setSelectedTheme({...selectedTheme, fullscreen: event.currentTarget.checked})} />
                                    <DropdownSingle dropdownTitle='Thumbnail Position' id='thumbnailPositionDropdown' list={{'left': false, 'right': false}} isInModal={true} dropdownDefaultSelect={selectedTheme.thumbnailPosition} callback={(value: string) => {setSelectedTheme({...selectedTheme, thumbnailPosition: value})}} />
                                    <Toggle className={togglePadding} label='View Counter' defaultChecked={selectedTheme.isViewerCounterEnabled} onChange={(event) => setSelectedTheme({...selectedTheme, isViewerCounterEnabled: event.currentTarget.checked})} />
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Actions</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Download Button' defaultChecked={selectedTheme.downloadButton} onChange={(event) => setSelectedTheme({...selectedTheme, downloadButton: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Social Sharing' defaultChecked={selectedTheme.socialSharing} onChange={(event) => setSelectedTheme({...selectedTheme, socialSharing: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Embed Code' defaultChecked={selectedTheme.embedCode} onChange={(event) => setSelectedTheme({...selectedTheme, embedCode: event.currentTarget.checked})} />
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Behaviour</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Autoplay' defaultChecked={selectedTheme.autoplay} onChange={(event) => setSelectedTheme({...selectedTheme, autoplay: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Start Video Muted' defaultChecked={selectedTheme.startVideoMuted} onChange={(event) => setSelectedTheme({...selectedTheme, startVideoMuted: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Looping' defaultChecked={selectedTheme.looping} onChange={(event) => setSelectedTheme({...selectedTheme, looping: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Continuous Play' defaultChecked={selectedTheme.continuousPlay} onChange={(event) => setSelectedTheme({...selectedTheme, continuousPlay: event.currentTarget.checked})} />
                                    <Toggle className={togglePadding} label='Skip Videos' defaultChecked={selectedTheme.skipVideos} onChange={(event) => setSelectedTheme({...selectedTheme, skipVideos: event.currentTarget.checked})} />
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" > <Text size={20} weight='med'>Interactions</Text></TextStyle>
                                    <Text size={16} weight='med'>Mail Catcher</Text>
                                    <div className='my2'>   
                                        <Button typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => {event.preventDefault();setMailCatcherModalOpened(true)}}>Add Mail Catcher</Button>
                                    </div>
                                    <Table className='my2' id='mailCatcherTable' header={mailCatcherTableHeader()} body={mailCatcherTableBody()} />
                                </>
                        }
                    </Card>
                    <PlayerSection className='col col-12 md-col-8 mr2'>
                        <PlayerContainer>
                            <div ref={playerRef}>
                            </div>
                        </PlayerContainer>
                    </PlayerSection>
                    <Modal hasClose={false} opened={mailCatcherModalOpened} title='Add Mail Catcher' size='small' toggle={() => setMailCatcherModalOpened(!mailCatcherModalOpened)}>
                        <MailCatcherModal />
                    </Modal>
                </ThemingContainer>
            </>
        )
    }

    const ThemingList = () => {
        const themingTableHeader = () => {
            return [
                <Text key='ThemingTableHeaderName' size={14} weight='med'>Name</Text>,
                <Text key='ThemingTableHeaderDefault' size={14} weight='med'>Default</Text>,
                <Text key='ThemingTableHeaderCreated' size={14} weight='med'>Created</Text>,
                <Button className='right mr2' onClick={() => {setSelectedTheme(newTheme);setCurrentPage('options')}} sizeButton='xs' typeButton='secondary' buttonColor='blue'>New Theme</Button>
            ]
        }

        const themingTableBody = () => {
            return themesList.map((theme, key) => {
                return [
                    <Text key={'ThemingTableBodyNameCell' + key.toString()} size={14} weight='reg'>{theme.themeName}</Text>,
                    theme.isDefault ? <Icon key={'ThemingTableBodyDefaultCell' + key.toString()}>checked</Icon> : <></>,
                    <Text key={'ThemingTableBodyCreatedCell' + key.toString()} size={14} weight='reg'>{theme.createdDate}</Text>,
                    <IconContainer className="iconAction" key={'ThemingTableBodyButtonsCell' + key.toString()}><Icon onClick={(event) => { event.preventDefault()}} >filter_none_outlined</Icon><Icon onClick={(event) => { event.preventDefault()}} >delete</Icon><Icon onClick={(event) => { event.preventDefault(); setSelectedTheme(themesList.filter((item) => {return item.themeName === theme.themeName })[0]); setCurrentPage('options') }}>edit</Icon> </IconContainer>

                ]
            })
        }

        return (
            <Card>
                <Text className='py2' size={20} weight='med'>Themes</Text>
                <TextStyle className='py2'><Text size={14} weight='reg'>Some information about Theming</Text></TextStyle>
                <div className='my2'>
                    <Icon>info_outlined</Icon> 
                    <Text size={14} weight='reg'>Need help creating a Theme? Visit the <a>Knowledge Base</a></Text>
                </div>
                <Table className='my2' id='themesListTable' header={themingTableHeader()} body={themingTableBody()} />
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
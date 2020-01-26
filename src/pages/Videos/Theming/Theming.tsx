import React from 'react';
import { Heading, ThemingContainer, TitleSection, TextStyle, BorderStyle, PlayerSection, PlayerContainer } from '../../../shared/Theming/ThemingStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Icon } from '@material-ui/core';
import { Text } from '../../../components/Typography/Text';
import { Card } from '../../../components/Card/Card';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { InputRadio } from '../../../components/FormsComponents/Input/InputRadio';
import { Toggle } from '../../../components/Toggle/toggle';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { ThemeOptions } from '../../../redux-flow/store/Settings/Theming';
import { ColorPicker } from '../../../components/ColorPicker/ColorPicker';

export const VodThemingPage = () => {

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
        playerTransparency: false,
        hasCustomColor: false,
        customColor: '',
        autoplay: false,
        startVideoMuted: false,
        looping: false,
        continuousPlay: false,
        skipVideos: false,
        offlineMessage: '',
        deliveryMethod: 'compatible',
        regionSettings: 'standard'
    };

    const [selectedTheme, setSelectedTheme] = React.useState<ThemeOptions>(newTheme);
    const [showAdvancedPanel, setShowAdvancedPanel] = React.useState<boolean>(false);

    const togglePadding = 'py1';

    const [player, setPlayer] = React.useState<any>(null);
    let playerRef = React.useRef<HTMLDivElement>(null);

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

    

    return (
        <React.Fragment>
                <ThemingContainer>

                    <Card className='col col-12 md-col-4 mr2'>
                        <TitleSection>
                            <Text size={20} weight='med'>Edit theme</Text>
                            <Button className='right mb2 flex' sizeButton='large' typeButton='tertiary' buttonColor='blue' onClick={(event) => {event.preventDefault();setShowAdvancedPanel(!showAdvancedPanel)}}>{showAdvancedPanel ? <><Icon>keyboard_arrow_left</Icon><Text size={16} color='dark-violet' weight='reg'>Back</Text></>: 'Advanced'}</Button>
                        </TitleSection>
                        {
                            showAdvancedPanel ?
                                <>
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
                                    <InputRadio name='region-settings' value='standard' label='Standard PoPs' defaultChecked={selectedTheme.regionSettings === 'standard'} onChange={() => setSelectedTheme({...selectedTheme, regionSettings: 'standard'})} />
                                    <InputRadio name='region-settings' value='premium' label='Premium PoPs' defaultChecked={selectedTheme.regionSettings === 'premium'} onChange={() => setSelectedTheme({...selectedTheme, regionSettings: 'premium'})} /> 
                                </>
                                :
                                <>
                                   <DropdownSingle id="vodThemeList" dropdownTitle="Theme List" list={{"theme 1": false, "theme 2": false, "custom theme": false}} />
                                    <BorderStyle className="p1" />

                                    <TextStyle  className='py2'><Text size={20} weight='med'>Controls</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Big Play Button' defaultChecked={selectedTheme.bigPlayButton} onChange={() => setSelectedTheme({...selectedTheme, bigPlayButton: !selectedTheme.bigPlayButton})} />
                                    <Toggle className={togglePadding} label='Play/Pause' defaultChecked={selectedTheme.playPause} onChange={() => setSelectedTheme({...selectedTheme, playPause: !selectedTheme.playPause})} />
                                    <Toggle className={togglePadding} label='Scrubber' defaultChecked={selectedTheme.scrubber} onChange={() => setSelectedTheme({...selectedTheme, scrubber: !selectedTheme.scrubber})} />
                                    <Toggle className={togglePadding} label='Show Scrubbing Thumbnail' defaultChecked={selectedTheme.scrubbingThumbnail} onChange={() => setSelectedTheme({...selectedTheme, scrubbingThumbnail: !selectedTheme.scrubbingThumbnail})} />
                                    <Toggle className={togglePadding} label='Time Code' defaultChecked={selectedTheme.timeCode} onChange={() => setSelectedTheme({...selectedTheme, timeCode: !selectedTheme.timeCode})} />
                                    <Toggle className={togglePadding} label='Speed Controls' defaultChecked={selectedTheme.speedControls} onChange={() => setSelectedTheme({...selectedTheme, speedControls: !selectedTheme.speedControls})} />
                                    <Toggle className={togglePadding} label='Quality Options' defaultChecked={selectedTheme.qualityOptions} onChange={() => setSelectedTheme({...selectedTheme, qualityOptions: !selectedTheme.qualityOptions})} />
                                    <Toggle className={togglePadding} label='Volume' defaultChecked={selectedTheme.volume} onChange={() => setSelectedTheme({...selectedTheme, volume: !selectedTheme.volume})} />
                                    <Toggle className={togglePadding} label='Fullscreen' defaultChecked={selectedTheme.fullscreen} onChange={() => setSelectedTheme({...selectedTheme, fullscreen: !selectedTheme.fullscreen})} />
                                    <DropdownSingle dropdownTitle='Thumbnail Position' id='thumbnailPositionDropdown' list={{'left': false, 'right': false}} isInModal={true} dropdownDefaultSelect={selectedTheme.thumbnailPosition} callback={(value: string) => {setSelectedTheme({...selectedTheme, thumbnailPosition: value})}} />
                                    <Toggle className={togglePadding} label='View Counter' defaultChecked={selectedTheme.isViewerCounterEnabled} onChange={() => setSelectedTheme({...selectedTheme, isViewerCounterEnabled: !selectedTheme.isViewerCounterEnabled})} />
                                    {
                                        selectedTheme.isViewerCounterEnabled ?
                                            <Input id='viewerCounterInput' type='number' className='' value={selectedTheme.viewerCounterLimit.toString()} onChange={(event) => setSelectedTheme({...selectedTheme, viewerCounterLimit: parseInt(event.currentTarget.value)})} />
                                            : null
                                    }
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Actions</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Download Button' defaultChecked={selectedTheme.downloadButton} onChange={() => setSelectedTheme({...selectedTheme, downloadButton: !selectedTheme.downloadButton})} />
                                    <Toggle className={togglePadding} label='Social Sharing' defaultChecked={selectedTheme.socialSharing} onChange={() => setSelectedTheme({...selectedTheme, socialSharing: !selectedTheme.socialSharing})} />
                                    <Toggle className={togglePadding} label='Embed Code' defaultChecked={selectedTheme.embedCode} onChange={() => setSelectedTheme({...selectedTheme, embedCode: !selectedTheme.embedCode})} />
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Appearance</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Player Transparency' defaultChecked={selectedTheme.playerTransparency} onChange={() => setSelectedTheme({...selectedTheme, playerTransparency: !selectedTheme.playerTransparency})} />
                                    <Toggle className={togglePadding} label='Custom Color' defaultChecked={selectedTheme.hasCustomColor} onChange={() => setSelectedTheme({...selectedTheme, hasCustomColor: !selectedTheme.hasCustomColor})} />
                                    {
                                        selectedTheme.hasCustomColor ? 
                                            <ColorPicker defaultColor={selectedTheme.customColor} callback={(value: string) => setSelectedTheme({...selectedTheme, customColor: value})} />
                                            : null
                                    }
                                    <BorderStyle className="p1" />

                                    <TextStyle className="py2" ><Text size={20} weight='med'>Behaviour</Text></TextStyle>
                                    <Toggle className={togglePadding} label='Autoplay' defaultChecked={selectedTheme.autoplay} onChange={() => setSelectedTheme({...selectedTheme, autoplay: !selectedTheme.autoplay})} />
                                    <Toggle className={togglePadding} label='Start Video Muted' defaultChecked={selectedTheme.startVideoMuted} onChange={() => setSelectedTheme({...selectedTheme, startVideoMuted: !selectedTheme.startVideoMuted})} />
                                    <Toggle className={togglePadding} label='Looping' defaultChecked={selectedTheme.looping} onChange={() => setSelectedTheme({...selectedTheme, looping: !selectedTheme.looping})} />
                                    <Toggle className={togglePadding} label='Continuous Play' defaultChecked={selectedTheme.continuousPlay} onChange={() => setSelectedTheme({...selectedTheme, continuousPlay: !selectedTheme.continuousPlay})} />
                                    <Toggle className={togglePadding} label='Skip Videos' defaultChecked={selectedTheme.skipVideos} onChange={() => setSelectedTheme({...selectedTheme, skipVideos: !selectedTheme.skipVideos})} />
                                </>
                        }
                    </Card>
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
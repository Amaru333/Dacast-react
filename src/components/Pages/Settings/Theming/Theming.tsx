import React from 'react';
import { ThemingContainer, PlayerSection, PlayerContainer, BorderStyle, TextStyle, IconContainer, TitleSection } from './ThemingStyle'
import { Card } from '../../../Card/Card';
import { Toggle } from '../../../Toggle/toggle';
import { Text } from '../../../Typography/Text';
import { DropdownSingle } from '../../../FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../FormsComponents/Button/Button';
import { Table } from '../../../Table/Table';
import { Icon } from '@material-ui/core';
import { Input } from '../../../FormsComponents/Input/Input';
import { InputRadio } from '../../../FormsComponents/Input/InputRadio';

export const TableRowsData = [
    {type: 'MailChimp', isDefault: true},
    {type: 'Google Drive', isDefault: false},
    {type: 'Custom API', isDefault: false}
]

export const Theming = () => {

    const togglePadding = 'py1';
    let playerRef = React.useRef<HTMLDivElement>(null);
    const [player, setPlayer] = React.useState<any>(null);
    const [showAdvancedPanel, setShowAdvancedPanel] = React.useState<boolean>(false);

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
                    // player.onPause(() => {
                    //     if(player.paused()) {
                    //         setMarker(player.getPlayerInstance().currentTime)
                    //     }
                    // })
                }
            })
        }
    }, [player])

    const mailCatcherTableHeader = () => {
        return [
            <Text key='MailCatcherTableHeaderTypeCell' size={14} weight='med'>Type</Text>,
            <Text key='MailCatcherTableHeaderDefaultCell' size={14} weight='med'>Default</Text>,
            <span key='MailCatcherTableHeaderEmptyCell'></span>
        ]
    }

    const mailCatcherTableBody = () => {
        return TableRowsData.map((row, i) => {
            return [
                <Text key={row.type + i.toString()} size={14}  weight="reg" color="gray-1">{row.type}</Text>,
                row.isDefault ? <Icon key={row.type + i.toString()}>checked</Icon> : <></>,
                <IconContainer className="iconAction" key={row.type + i.toString()}><Icon onClick={(event) => {event.preventDefault()}} >delete</Icon><Icon onClick={(event) => {event.preventDefault()}}>edit</Icon> </IconContainer>
            
            ]
        })
    }


    return (
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
                            <Input className='my2' />
                            <Input className='my2' label='End Screen Text Link' />
                            <BorderStyle className="p1" />

                            <TextStyle className="py2" ><Text size={20} weight='med'>Brand Text</Text></TextStyle>
                            <Toggle className={togglePadding} label='Use video title as brand text' />
                            <Input className='my2' label='Brand Text Link' />
                            <BorderStyle className="p1" />

                            <TextStyle className="py2" ><Text size={20} weight='med'>Offline Message</Text></TextStyle>
                            <Input className='my2' />
                            <BorderStyle className="p1" />

                            <TextStyle className="py2" ><Text size={20} weight='med'>Delivery Method</Text></TextStyle>
                            <Text size={14} weight='reg'>Dacast gives you complete control over the delivery method of your videos. Choose the setting that's right for the type of content you have.</Text>
                            <InputRadio name='delevery-method' value='compatible-delivery' label='Compatible Delivery' />
                            <InputRadio name='delevery-method' value='secure-delivery' label='Secure Delivery' />
                            <BorderStyle className="p1" />

                            <TitleSection className="my2">
                                <Text size={20} weight='med'>Region Settings</Text>
                                <Button sizeButton='large' typeButton='secondary' buttonColor='blue'>
                                    Contact Us
                                </Button>

                            </TitleSection>
                            <Text size={14} weight='reg'>Select the PoPs that will cover the countries where your videos will be played.</Text>
                            <InputRadio name='region-settings' value='standard' label='Standard PoPs' />
                            <InputRadio name='region-settings' value='premium' label='Premium PoPs' /> 
                        </>
                        :
                        <>
                            <Toggle className={togglePadding} label='Big Play Button' />
                            <Toggle className={togglePadding} label='Play/Pause' />
                            <Toggle className={togglePadding} label='Scrubber' />
                            <Toggle className={togglePadding} label='Show Scrubbing Thumbnail' />
                            <Toggle className={togglePadding} label='Time Code' />
                            <Toggle className={togglePadding} label='Speed Controls' />
                            <Toggle className={togglePadding} label='Quality Options' />
                            <Toggle className={togglePadding} label='Volume' />
                            <Toggle className={togglePadding} label='Fullscreen' />
                            <DropdownSingle dropdownTitle='Thumbnail Position' id='thumbnailPositionDropdown' list={{'left': false, 'right': false}} />
                            <Toggle className={togglePadding} label='View Counter' />
                            <BorderStyle className="p1" />

                            <TextStyle className="py2" ><Text size={20} weight='med'>Actions</Text></TextStyle>
                            <Toggle className={togglePadding} label='Download Button' />
                            <Toggle className={togglePadding} label='Social Sharing' />
                            <Toggle className={togglePadding} label='Embed Code' />
                            <BorderStyle className="p1" />

                            <TextStyle className="py2" ><Text size={20} weight='med'>Behaviour</Text></TextStyle>
                            <Toggle className={togglePadding} label='Autoplay' />
                            <Toggle className={togglePadding} label='Start Video Muted' />
                            <Toggle className={togglePadding} label='Looping' />
                            <Toggle className={togglePadding} label='Continuous Play' />
                            <Toggle className={togglePadding} label='Skip Videos' />
                            <BorderStyle className="p1" />

                            <TextStyle className="py2" > <Text size={20} weight='med'>Interactions</Text></TextStyle>
                            <Text size={16} weight='med'>Mail Catcher</Text>
                            <Button className='py2' typeButton='secondary' sizeButton='xs' buttonColor='blue'>Add Mail Catcher</Button>
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
        </ThemingContainer>
    )
}
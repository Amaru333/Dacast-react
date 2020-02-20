import React from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { Icon } from '@material-ui/core';
import { Table } from '../../../components/Table/Table';
import { TextStyle, IconContainer, Header, UnlockSettingsIcon, DisabledSection } from '../../../shared/Engagement/EngagementStyle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Ad, MailCatcher, InteractionsInfos } from '../../../redux-flow/store/Settings/Interactions/types';
import { PlaylistEngagementComponentProps } from '../../../containers/Playlists/Engagement';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { PlaylistNewAdModal } from './PlaylistNewAdModal';

export const PlaylistEngagementPage = (props: PlaylistEngagementComponentProps) => {

    const emptyAd: Ad = { 
        id: "-1",
        placement: "",
        position: "",
        url: "test"
    }

    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);
    const [engagementSettings, setEngagementSettings] = React.useState<InteractionsInfos>(props.playlistEngagementSettings.engagementSettings);
    const [selectedAd, setSelectedAd] = React.useState<Ad>(emptyAd)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false);
    const [adSectionEditable, setAdSectionEditable] = React.useState<boolean>(false);
    const [mailSectionEditable, setMailSectionEditable] = React.useState<boolean>(false);
    const [brandSectionEditable, setBrandSectionEditable] = React.useState<boolean>(false);
    const [endScreenSectionEditable, setEndScreenSectionEditable] = React.useState<boolean>(false);

    const newAd = () => {
        setSelectedAd(emptyAd);
        setNewAdModalOpened(true) 
    }

    const editAd = (ad: Ad) => {
        setSelectedAd(ad);
        setNewAdModalOpened(true);
    }

    const [player, setPlayer] = React.useState<any>(null);
    const [playerModalOpened, setPlayerModalOpened] = React.useState<boolean>(false);
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


    React.useEffect(() => {
        setEngagementSettings(props.playlistEngagementSettings.engagementSettings)
    }, [props.playlistEngagementSettings.engagementSettings])

    const advertisingTableHeader = () => {
        return [
            <Text key='advertisingTableHeaderPlacement' size={14} weight='med'>Placement</Text>,
            <Text key='advertisingTableHeaderPosition' size={14} weight='med'>Position</Text>,
            <Text key='advertisingTableHeaderUrl' size={14} weight='med'>Ad URL</Text>,
            <div key='advertisingTableHeaderButtons' className='right mr2 flex'> 
                <Button className='mr2' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => {event.preventDefault(); setPlayerModalOpened(true)}}>Preview</Button>
                <Button typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => {newAd()}}>New Ad</Button>
            </div>
        ]
    }

    const advertisingTableBody = () => {
        return props.playlistEngagementSettings.engagementSettings.adList.map((item, i) => {
            return [
                <Text key={'advertisingTableBodyPlacement' + item.placement + i} size={14} weight='med'>{item.placement}</Text>,
                <Text key={'advertisingTableBodyPosition' + item.position + i} size={14} weight='med'>{item.position}</Text>,
                <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>,
                <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                    <Icon 
                        onClick={() => {props.deletePlaylistAd(item)}} 
                    >delete
                    </Icon>
                    <Icon onClick={() => editAd(item)}>edit</Icon> 
                </IconContainer>
            ]
        })
    }

    const revertSettings = () => {
        setEngagementSettings(props.playlistEngagementSettings.engagementSettings);
        setSettingsEdited(false)
        setAdSectionEditable(false);
        setMailSectionEditable(false);
        setEndScreenSectionEditable(false);
    } 

    return (
        <div>
            <Bubble className="flex items-center" type='info'>Interactions are a Global Setting so you need to click on the lock <Icon>lock</Icon> or edit your Advertising Settings </Bubble>
            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>Advertising</Text>
                    </TextStyle>
                    <UnlockSettingsIcon onClick={() => setAdSectionEditable(!adSectionEditable)}>
                        {adSectionEditable ? "lock_open" : "lock"}
                    </UnlockSettingsIcon>
                </Header>
                <DisabledSection settingsEditable={adSectionEditable}>
                    <Toggle
                        className="mb2" 
                        id='advertisingEnabled' 
                        defaultChecked={engagementSettings.adEnabled} 
                        onChange={() => {setEngagementSettings({...engagementSettings, adEnabled: !engagementSettings.adEnabled});setSettingsEdited(true)}} label='Advertising enabled' 
                    />
                    {
                        engagementSettings.adEnabled ?
                        <>
                        <div className="py2">
                            <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                        </div>
                        
                        <div className='flex'>
                            <Icon className="mr1">info_outlined</Icon>
                            <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                        </div>
                        <Table className="my2" id='advertisingTable' header={advertisingTableHeader()} body={advertisingTableBody()} />
                        </>
                            : null
                    }
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>Mail Catcher</Text>
                    </TextStyle>
                    <UnlockSettingsIcon onClick={() => setMailSectionEditable(!mailSectionEditable)}>
                        {mailSectionEditable ? "lock_open" : "lock"}
                    </UnlockSettingsIcon>
                </Header>
                <DisabledSection settingsEditable={mailSectionEditable}>
                    <div className="pb2">
                        <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    </div>
                
                    <div className='flex'>
                        <Icon>info_outlined</Icon>
                        <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                    </div>
                    <DropdownSingle
                        className="col col-3 mt2" 
                        id="playlistMailCatcherList"
                        dropdownTitle="Mail Catcher"
                        dropdownDefaultSelect={engagementSettings.selectedMailCatcher}
                        list={props.playlistEngagementSettings.engagementSettings.mailCatcher.reduce((reduced: DropdownListType, item: MailCatcher)=> {return {...reduced, [item.type]: false }},{})  }
                        callback={
                            (selectedMailCatcher: string) => {
                                setEngagementSettings({...engagementSettings, selectedMailCatcher: selectedMailCatcher});setSettingsEdited(true)}}
                    
                    />
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>Brand Text</Text>
                    </TextStyle>
                    <UnlockSettingsIcon onClick={() => setBrandSectionEditable(!brandSectionEditable)}>
                        {brandSectionEditable ? "lock_open" : "lock"}
                    </UnlockSettingsIcon>
                </Header>
                <DisabledSection settingsEditable={brandSectionEditable}>
                    <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    <div className='flex'>
                        <Input 
                            disabled={engagementSettings.isBrandTextAsTitle} className='my2 pr1 col col-8' 
                            label='Brand Text' 
                            onChange={(event) => {setEngagementSettings({...engagementSettings, brandText: event.currentTarget.value});setSettingsEdited(true)}}
                            value={engagementSettings.brandText ? engagementSettings.brandText : ""} 
                        />
                        <Input 
                            className='my2 pl1 col col-4' 
                            label='Brand Text Link' 
                            value={engagementSettings.brandTextLink ? engagementSettings.brandTextLink : ""} 
                            onChange={(event) => {setEngagementSettings({...engagementSettings, brandTextLink: event.currentTarget.value});setSettingsEdited(true)}} />
                    </div>
                    <Toggle className='' label='Use video title as brand text' defaultChecked={engagementSettings.isBrandTextAsTitle} onChange={() => {setEngagementSettings({...engagementSettings, isBrandTextAsTitle: !engagementSettings.isBrandTextAsTitle});setSettingsEdited(true)}} />
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>End Screen Text</Text>
                    </TextStyle>
                    <UnlockSettingsIcon onClick={() => setEndScreenSectionEditable(!endScreenSectionEditable)}>
                        {endScreenSectionEditable ? "lock_open" : "lock"}
                    </UnlockSettingsIcon>
                </Header>
                <DisabledSection settingsEditable={endScreenSectionEditable}>
                    <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    <div className='flex'>
                        <Input 
                            className='my2 pr1 col col-8' 
                            label='End Screen Text' 
                            value={engagementSettings.endScreenText ? engagementSettings.endScreenText : ""}
                            onChange={(event) => {setEngagementSettings({...engagementSettings, endScreenText: event.currentTarget.value});setSettingsEdited(true)}}
                        />
                        <Input 
                            className='my2 pl1 col col-4' 
                            label='End Screen Text Link' 
                            value={engagementSettings.endScreenTextLink ? engagementSettings.endScreenTextLink : ""} 
                            onChange={(event) => {setEngagementSettings({...engagementSettings, endScreenTextLink: event.currentTarget.value});setSettingsEdited(true)}} />
                    </div>
                </DisabledSection>
            </Card>

            {   
                settingsEdited ?
                    <div className="mt1">
                        <Button 
                            onClick={() => {props.savePlaylistEngagementSettings(engagementSettings);setSettingsEdited(false)}}
                        >
                                Save
                        </Button>
                        <Button className="ml2" typeButton="tertiary" onClick={() => revertSettings()}>Discard</Button>
                    </div> : null
            }

            <Modal hasClose={false} opened={newAdModalOpened} title={selectedAd.id === "-1" ? "New Ad" : "Edit Ad"} size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                <PlaylistNewAdModal {...props} toggle={setNewAdModalOpened} selectedAd={selectedAd}/>
            </Modal>
            <Modal title='Preview Ads' toggle={() => setPlayerModalOpened(!playerModalOpened)} opened={playerModalOpened}>
                <div className="mt2" ref={playerRef}></div>
            </Modal>
        </div>
    )
}
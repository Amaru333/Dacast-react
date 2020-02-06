import React from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { Icon } from '@material-ui/core';
import { Table } from '../../../components/Table/Table';
import { Modal } from '../../../components/Modal/Modal';
import { MailCatcherModal } from  './MailCatcherModal';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { TextStyle, IconContainer } from '../../../shared/Engagement/EngagementStyle';
import { SettingsInteractionComponentProps } from '../../../containers/Settings/Interactions';
import { InteractionsInfos, Ad } from '../../../redux-flow/store/Settings/Interactions';
import { MailCatcher } from '../../../redux-flow/store/Settings/Interactions';
import { NewAdModal } from './NewAdModal';

export const InteractionsPage = (props: SettingsInteractionComponentProps) => {

    const emptyAd: Ad = { 
        id: "-1",
        placement: "",
        position: "",
        url: "test"
    }

    const emptyMailCatcher: MailCatcher = {
        type: "",
        isDefault: false
    }

    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);
    const [interactionInfos, setInteractionsInfos] = React.useState<InteractionsInfos>(props.interactionsInfos);
    const [selectedAd, setSelectedAd] = React.useState<Ad>(emptyAd)
    const [selectedMailCatcher, setSelectedMailCatcher] = React.useState<MailCatcher>(emptyMailCatcher)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false);
    const [mailCatcherModalOpened, setMailCatcherModalOpened] = React.useState<boolean>(false);

    const newAd = () => {
        setSelectedAd(emptyAd);
        setNewAdModalOpened(true) 
    }

    const editAd = (ad: Ad) => {
        setSelectedAd(ad);
        setNewAdModalOpened(true);
    }

    const newMailCatcher = () => {
        setSelectedMailCatcher(emptyMailCatcher);
        setMailCatcherModalOpened(true) 
    }

    const editMailCatcher = (mailCatcher: MailCatcher) => {
        setSelectedMailCatcher(mailCatcher);
        setMailCatcherModalOpened(true);
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
        setInteractionsInfos(props.interactionsInfos)
    }, [props.interactionsInfos])

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
        return props.interactionsInfos.adList.map((item, i) => {
            return [
                <Text key={'advertisingTableBodyPlacement' + item.placement + i} size={14} weight='med'>{item.placement}</Text>,
                <Text key={'advertisingTableBodyPosition' + item.position + i} size={14} weight='med'>{item.position}</Text>,
                <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>,
                <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                    <Icon onClick={(event) => {props.deleteAd(item)}} >delete</Icon>
                    <Icon onClick={() => editAd(item)}>edit</Icon> 
                </IconContainer>
            ]
        })
    }

    const mailCatcherTableHeader = () => {
        return [
            <Text key='MailCatcherTableHeaderTypeCell' size={14} weight='med'>Type</Text>,
            <Text key='MailCatcherTableHeaderDefaultCell' size={14} weight='med'>Default</Text>,
            <Button key='MailCatcherTableHeaderActionButtonCell' className='right mr2' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => {newMailCatcher()}}>Add Mail Catcher</Button>

        ]
    }

    const mailCatcherTableBody = () => {
        return props.interactionsInfos.mailCatcher.map((row, i) => {
            return [
                <Text key={row.type + i.toString()} size={14}  weight="reg" color="gray-1">{row.type}</Text>,
                row.isDefault ? <Icon style={{color:"green"}} key={'mailCatcherTableBodyIsDefaultCell' + i.toString()}>checked</Icon> : <></>,
                <IconContainer className="iconAction" key={'mailCatcherTableActionButtons' + i.toString()}><Icon onClick={() => {props.deleteMailCatcher(row)}} >delete</Icon><Icon onClick={() => editMailCatcher(row)}>edit</Icon> </IconContainer>
            
            ]
        })
    }


 
    return (
        <div>
            <Bubble type='info'>These global settings can be overidden at content level (Video, Live Stream etc.)</Bubble>
            <Card className='my2'>
                <Text className="pb2" size={20} weight='med'>Advertising</Text>
                <Toggle id='advertisingEnabled' defaultChecked={interactionInfos.adEnabled} onChange={() => {setInteractionsInfos({...interactionInfos, adEnabled: !interactionInfos.adEnabled});setSettingsEdited(true)}} label='Advertising enabled' />
                {
                    interactionInfos.adEnabled ?
                        <>
                        <Text className="py2" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                        <div className='flex'>
                            <Icon className="mr1">info_outlined</Icon>
                            <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                        </div>
                        <Table className="my2" id='advertisingTable' header={advertisingTableHeader()} body={advertisingTableBody()} />
                        </>
                        : null
                }
            </Card>

            <Card className='my2'>
                <TextStyle className="pb2" > <Text size={20} weight='med'>Mail Catcher</Text></TextStyle>
                <Text className="py2" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                <div className='flex'>
                    <Icon>info_outlined</Icon>
                    <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                </div>
                {/* <div className='my2'>   
                    <Button typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => {event.preventDefault();setMailCatcherModalOpened(true)}}>Add Mail Catcher</Button>
                </div> */}
                <Table className='my2' id='mailCatcherTable' header={mailCatcherTableHeader()} body={mailCatcherTableBody()} />
            </Card>

            <Card className='my2'>
                <TextStyle className="pb2" ><Text size={20} weight='med'>Brand Text</Text></TextStyle>
                <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                <div className='flex'>
                    <Input 
                        disabled={interactionInfos.isBrandTextAsTitle} className='my2 pr1 col col-8' 
                        label='Brand Text' 
                        onChange={(event) => {setInteractionsInfos({...interactionInfos, brandText: event.currentTarget.value})}}
                        value={interactionInfos.brandText ? interactionInfos.brandText : ""} 
                    />
                    <Input 
                        className='my2 pl1 col col-4' 
                        label='Brand Text Link' 
                        value={interactionInfos.brandTextLink ? interactionInfos.brandTextLink : ""} 
                        onChange={(event) => {setInteractionsInfos({...interactionInfos, brandTextLink: event.currentTarget.value});setSettingsEdited(true)}} />
                </div>
                <Toggle className='' label='Use video title as brand text' defaultChecked={interactionInfos.isBrandTextAsTitle} onChange={() => {setInteractionsInfos({...interactionInfos, isBrandTextAsTitle: !interactionInfos.isBrandTextAsTitle});setSettingsEdited(true)}} />
            </Card>

            <Card className='my2'>
                <Text className="pb2" size={20} weight='med'>End Screen Text</Text>
                <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                <div className='flex'>
                    <Input 
                        className='my2 pr1 col col-8' 
                        label='End Screen Text' 
                        value={interactionInfos.endScreenText ? interactionInfos.endScreenText : ""}
                        onChange={(event) => {setInteractionsInfos({...interactionInfos, endScreenText: event.currentTarget.value});setSettingsEdited(true)}}
                    />
                    <Input 
                        className='my2 pl1 col col-4' 
                        label='End Screen Text Link' 
                        value={interactionInfos.endScreenTextLink ? interactionInfos.endScreenTextLink : ""} 
                        onChange={(event) => {setInteractionsInfos({...interactionInfos, endScreenTextLink: event.currentTarget.value});setSettingsEdited(true)}} />
                </div>
            </Card>

            {   
                settingsEdited ?
                    <div className="mt1">
                        <Button onClick={() => {props.saveInteractionsInfos(interactionInfos);setSettingsEdited(false)}}>Save</Button>
                        <Button className="ml2" typeButton="tertiary" onClick={() => {setInteractionsInfos(props.interactionsInfos);setSettingsEdited(false)}}>Discard</Button>
                    </div> : null
            }

            <Modal hasClose={false} opened={mailCatcherModalOpened} title='Add Mail Catcher' size='small' toggle={() => setMailCatcherModalOpened(!mailCatcherModalOpened)}>
                <MailCatcherModal {...props} toggle={setMailCatcherModalOpened} selectedMailCatcher={selectedMailCatcher} />
            </Modal>
            <Modal hasClose={false} opened={newAdModalOpened} title={selectedAd.id === "-1" ? "New Ad" : "Edit Ad"} size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                <NewAdModal {...props} toggle={setNewAdModalOpened} selectedAd={selectedAd}/>
            </Modal>
            <Modal title='Preview Ads' toggle={() => setPlayerModalOpened(!playerModalOpened)} opened={playerModalOpened}>
                <div className="mt2" ref={playerRef}></div>
            </Modal>
        </div>
    )
}
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
import { TextStyle, IconContainer } from './InteractionsStyle';
import { NewAdModal } from './NewAdModal';
import { SettingsInteractionComponentProps } from '../../../containers/Settings/Interactions';
import { InteractionsInfos } from '../../../redux-flow/store/Settings/Interactions';

export const InteractionsPage = (props: SettingsInteractionComponentProps) => {

    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);
    const [interactionInfos, setInteractionsInfos] = React.useState<InteractionsInfos>(props.interactionsInfos);

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
                <Button typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => {event.preventDefault();setNewAdModalOpened(true)}}>New Ad</Button>
            </div>
        ]
    }

    const advertisingTableBody = () => {
        return props.interactionsInfos.adList.map((item, i) => {
            return [
                <Text key={'advertisingTableBodyPlacement' + item.placement + i} size={14} weight='med'>{item.placement}</Text>,
                <Text key={'advertisingTableBodyPosition' + item.position + i} size={14} weight='med'>{item.position}</Text>,
                <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>,
                <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}><Icon onClick={(event) => {event.preventDefault()}} >delete</Icon><Icon onClick={(event) => {event.preventDefault()}}>edit</Icon> </IconContainer>
            ]
        })
    }

    const [mailCatcherModalOpened, setMailCatcherModalOpened] = React.useState<boolean>(false);

    const mailCatcherTableHeader = () => {
        return [
            <Text key='MailCatcherTableHeaderTypeCell' size={14} weight='med'>Type</Text>,
            <Text key='MailCatcherTableHeaderDefaultCell' size={14} weight='med'>Default</Text>,
            <Button key='MailCatcherTableHeaderActionButtonCell' className='right mr2' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => {event.preventDefault();setMailCatcherModalOpened(true)}}>Add Mail Catcher</Button>

        ]
    }

    const mailCatcherTableBody = () => {
        return props.interactionsInfos.mailCatcher.map((row, i) => {
            return [
                <Text key={row.type + i.toString()} size={14}  weight="reg" color="gray-1">{row.type}</Text>,
                row.isDefault ? <Icon key={'mailCatcherTableBodyIsDefaultCell' + i.toString()}>checked</Icon> : <></>,
                <IconContainer className="iconAction" key={'mailCatcherTableActionButtons' + i.toString()}><Icon onClick={(event) => {event.preventDefault()}} >delete</Icon><Icon onClick={(event) => {event.preventDefault()}}>edit</Icon> </IconContainer>
            
            ]
        })
    }
 
    return (
        <div>
            <Bubble type='info'>These global settings can be overidden at content level (Video, Live Stream etc.)</Bubble>
            <Card className='my2'>
                <Text className="py2" size={20} weight='med'>Advertising</Text>
                <Toggle id='advertisingEnabled' defaultChecked={interactionInfos.adEnabled} onChange={() => setInteractionsInfos({...interactionInfos, adEnabled: !interactionInfos.adEnabled})} label='Advertising enabled' />
                {
                    interactionInfos.adEnabled ?
                        <>
                        <Text className="py2" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                        <div className='flex'>
                            <Icon>info_outlined</Icon>
                            <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                        </div>
                        <Table className="my2" id='advertisingTable' header={advertisingTableHeader()} body={advertisingTableBody()} />
                        </>
                        : null
                }
            </Card>

            <Card className='my1'>
                <TextStyle className="py2" > <Text size={20} weight='med'>Mail Catcher</Text></TextStyle>
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

            <Card className='my1'>
                <TextStyle className="py2" ><Text size={20} weight='med'>Brand Text</Text></TextStyle>
                <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                <div className='flex'>
                    <Input disabled={interactionInfos.isBrandTextAsTitle} className='my2 pr1 col col-8' label='Brand Text' onChange={(event) => {setInteractionsInfos({...interactionInfos, brandText: event.currentTarget.value})}} />
                    <Input className='my2 pl1 col col-4' label='Brand Text Link' value='' onChange={(event) => {setInteractionsInfos({...interactionInfos, brandTextLink: event.currentTarget.value})}} />
                </div>
                <Toggle className='' label='Use video title as brand text' defaultChecked={interactionInfos.isBrandTextAsTitle} onChange={() => {setInteractionsInfos({...interactionInfos, isBrandTextAsTitle: !interactionInfos.isBrandTextAsTitle})}} />
            </Card>

            <Card className='my2'>
                <Text className="py2" size={20} weight='med'>End Screen Text</Text>
                <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                <div className='flex'>
                    <Input className='my2 pr1 col col-8' label='End Screen Text' value='' onChange={(event) => {setInteractionsInfos({...interactionInfos, endScreenText: event.currentTarget.value})}}/>
                    <Input className='my2 pl1 col col-4' label='End Screen Text Link' value='' onChange={(event) => {setInteractionsInfos({...interactionInfos, endScreenTextLink: event.currentTarget.value})}} />
                </div>
            </Card>

            <Modal hasClose={false} opened={mailCatcherModalOpened} title='Add Mail Catcher' size='small' toggle={() => setMailCatcherModalOpened(!mailCatcherModalOpened)}>
                <MailCatcherModal toggle={setMailCatcherModalOpened} />
            </Modal>
            <Modal hasClose={false} opened={newAdModalOpened} title='New Ad' size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                <NewAdModal toggle={setNewAdModalOpened}  />
            </Modal>
            <Modal title='' toggle={() => setPlayerModalOpened(!playerModalOpened)} opened={playerModalOpened}>
                <div ref={playerRef}>
                </div>
            </Modal>
        </div>
    )
}
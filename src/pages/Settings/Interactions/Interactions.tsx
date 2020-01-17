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

const fakeData = [
    {
        placement: 'placement',
        position: "1",
        url: 'http://url',
    },
    {
        placement: 'testte',
        position: "2",
        url: 'http://url',
    },
    {
        placement: 'plkojkok',
        position: "2",
        url: 'http://url',
    },
    {
        placement: 'woiwprws',
        position: "3",
        url: 'http://url',
    },
    {
        placement: 'rfjpefjerp',
        position: "4",
        url: 'http://url',
    }
]

const mailCatcher = [
    {
        type: "MailChimp",
        isDefault: true
    },
    {
        type: "Google Drive",
        isDefault: false
    
    },
    {
        type: "Custom API",
        isDefault: false
    }
]

export const InteractionsPage = () => {

    const advertisingTableHeader = () => {
        return [
            <Text key='advertisingTableHeaderPlacement' size={14} weight='med'>Placement</Text>,
            <Text key='advertisingTableHeaderPosition' size={14} weight='med'>Position</Text>,
            <Text key='advertisingTableHeaderUrl' size={14} weight='med'>Ad URL</Text>,
            <span key='advertisingTableHeaderButtons'></span>
        ]
    }

    const advertisingTableBody = () => {
        return fakeData.map((item, i) => {
            return [
                <Text key={'advertisingTableBodyPlacement' + item.placement + i} size={14} weight='med'>{item.placement}</Text>,
                <Text key={'advertisingTableBodyPosition' + item.position + i} size={14} weight='med'>{item.position}</Text>,
                <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>,
                <span key={'advertisingTableBodyButtons' + i}></span>
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
        return mailCatcher.map((row, i) => {
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
                <Toggle id='advertisingEnabled' defaultChecked={true} label='Advertising enabled' />
                <Text className="py2" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                <div className='flex'>
                    <Icon>info_outlined</Icon>
                    <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                </div>
                <Table className="my2" id='advertisingTable' header={advertisingTableHeader()} body={advertisingTableBody()} />
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
                    <Input disabled={false} className='my2 pr1 col col-8' label='Brand Text' value='' onChange={(event) => {}} />
                    <Input className='my2 pl1 col col-4' label='Brand Text Link' value='' onChange={(event) => {}} />
                </div>
                <Toggle className='' label='Use video title as brand text' defaultChecked={true} onChange={() => {}} />
            </Card>

            <Card className='my2'>
                <Text className="py2" size={20} weight='med'>End Screen Text</Text>
                <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                <div className='flex'>
                    <Input className='my2 pr1 col col-8' label='End Screen Text' value='' onChange={(event) => {}}/>
                    <Input className='my2 pl1 col col-4' label='End Screen Text Link' value='' onChange={(event) => {}} />
                </div>
            </Card>

            <Modal hasClose={false} opened={mailCatcherModalOpened} title='Add Mail Catcher' size='small' toggle={() => setMailCatcherModalOpened(!mailCatcherModalOpened)}>
                <MailCatcherModal toggle={setMailCatcherModalOpened} />
            </Modal>
        </div>
    )
}
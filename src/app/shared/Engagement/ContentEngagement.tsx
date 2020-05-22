import React from 'react';
import { Bubble } from '../../../components/Bubble/Bubble';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Toggle } from '../../../components/Toggle/toggle';
import { IconStyle, IconContainer, ActionIcon } from '../../../shared/Common/Icon';
import { Table } from '../../../components/Table/Table';
import { TextStyle, Header, DisabledSection } from './EngagementStyle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Ad, MailCatcher, InteractionsInfos, ContentEngagementSettings } from '../../redux-flow/store/Settings/Interactions/types';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { DropdownListType } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ContentNewAdModal } from './ContentNewAdModal';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { usePlayer } from '../../utils/player';
import { Prompt } from 'react-router';
import { getPrivilege } from '../../../utils/utils';

export interface ContentEngagementComponentProps {
    contentEngagementSettings: ContentEngagementSettings;
    getContentEngagementSettings: Function;
    saveContentEngagementSettings: Function;
    saveContentAd: Function;
    createContentAd: Function;
    deleteContentAd: Function;
    contentType?: string;
    contentId: string
}

export const ContentEngagementPage = (props: ContentEngagementComponentProps) => {

    const emptyAd: Ad = {
        id: "-1",
        "ad-type": "",
        timestamp: 0,
        url: "test"
    }

    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);
    const [engagementSettings, setEngagementSettings] = React.useState<InteractionsInfos>(props.contentEngagementSettings.engagementSettings);
    const [selectedAd, setSelectedAd] = React.useState<Ad>(emptyAd)
    const [settingsEdited, setSettingsEdited] = React.useState<boolean>(false);
    const [adSectionEditable, setAdSectionEditable] = React.useState<boolean>(false);
    const [mailSectionEditable, setMailSectionEditable] = React.useState<boolean>(false);
    const [brandSectionEditable, setBrandSectionEditable] = React.useState<boolean>(false);
    const [endScreenSectionEditable, setEndScreenSectionEditable] = React.useState<boolean>(false);
    const [saveAllButtonLoading, setSaveAllButtonLoading] = React.useState<boolean>(false);

    
    const newAd = () => {
        setSelectedAd(emptyAd);
        setNewAdModalOpened(true)
    }

    const editAd = (ad: Ad) => {
        setSelectedAd(ad);
        setNewAdModalOpened(true);
    }

    const [playerModalOpened, setPlayerModalOpened] = React.useState<boolean>(false);
    let playerRef = React.useRef<HTMLDivElement>(null);

    let player = usePlayer(playerRef, props.contentType + '-' + props.contentEngagementSettings.contentId);


    React.useEffect(() => {
        setEngagementSettings(props.contentEngagementSettings.engagementSettings)
    }, [props.contentEngagementSettings.engagementSettings])

    const advertisingTableHeader = () => {
        return {
            data: [
                { cell: <Text key='advertisingTableHeaderPlacement' size={14} weight='med'>Placement</Text> },
                { cell: <Text key='advertisingTableHeaderPosition' size={14} weight='med'>Position</Text> },
                { cell: <Text key='advertisingTableHeaderUrl' size={14} weight='med'>Ad URL</Text> },
                {
                    cell: <div key='advertisingTableHeaderButtons' className='right mr2 flex'>
                        <Button className='mr2 sm-show' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => { event.preventDefault(); setPlayerModalOpened(true) }}>Preview</Button>
                        <Button className='sm-show' typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => { newAd() }}>New Ad</Button>
                    </div>
                }
            ]
        }
    }

    const advertisingTableBody = () => {
        return props.contentEngagementSettings.engagementSettings.ads.map((item, i) => {
            return {
                data: [
                    <Text key={'advertisingTableBodyPlacement' + item["ad-type"] + i} size={14} weight='med'>{item["ad-type"]}</Text>,
                    <Text key={'advertisingTableBodyPosition' + item.timestamp + i} size={14} weight='med'>{item.timestamp}</Text>,
                    <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>,
                    <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                        <ActionIcon id={"deleteTooltip" + item.id}>
                            <IconStyle
                                onClick={() => { props.deleteContentAd(item) }}
                            >delete
                            </IconStyle>
                        </ActionIcon>
                        <Tooltip target={"deleteTooltip" + item.id}>Delete</Tooltip>
                        <ActionIcon id={"editTooltip" + item.id}>
                            <IconStyle onClick={() => editAd(item)}>edit</IconStyle>
                        </ActionIcon>
                        <Tooltip target={"editTooltip" + item.id}>Edit</Tooltip>
                    </IconContainer>
                ]
            }
        })
    }

    const revertSettings = () => {
        setEngagementSettings(props.contentEngagementSettings.engagementSettings);
        setSettingsEdited(false)
        setAdSectionEditable(false);
        setMailSectionEditable(false);
        setEndScreenSectionEditable(false);
    }

    return (
        <div>
            <Bubble className="flex items-center" type='info'>Interactions are a Global Setting so you need to click on the lock <IconStyle>lock</IconStyle> or edit your Advertising Settings </Bubble>
            {getPrivilege('privilege-advertising') &&
                <Card className='my2'>
                    <Header className="mb2">
                        <TextStyle>
                            <Text size={20} weight='med'>Advertising</Text>
                        </TextStyle>
                        <IconStyle className='pointer' id="unlockAdSectionTooltip" onClick={() => setAdSectionEditable(!adSectionEditable)}>
                            {adSectionEditable ? "lock_open" : "lock"}
                        </IconStyle>
                        <Tooltip target="unlockAdSectionTooltip">{adSectionEditable ? "Click to revert Advertising Settings" : "Click to edit Advertising Settings"}</Tooltip>
                    </Header>
                    <DisabledSection settingsEditable={adSectionEditable}>
                        <Toggle
                            className="mb2"
                            id='advertisingEnabled'
                            defaultChecked={engagementSettings.adsEnabled}
                            onChange={() => { setEngagementSettings({ ...engagementSettings, adsEnabled: !engagementSettings.adsEnabled }); setSettingsEdited(true) }} label='Advertising enabled'
                        />
                        <Text className="mb2 inline-block" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                        <div className='flex mb2'>
                            <IconStyle className="mr1">info_outlined</IconStyle>
                            <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                        </div>
                        <div className="clearfix mb2">
                            <Button className='xs-show col mb1 col-12' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => {event.preventDefault(); setPlayerModalOpened(true)}}>Preview</Button>
                            <Button className="xs-show col col-12" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => {newAd()}}>New Ad</Button>
                        </div>
                        <Table id='advertisingTable' headerBackgroundColor="gray-10" header={advertisingTableHeader()} body={advertisingTableBody()} />

                    </DisabledSection>
                </Card>
            }

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>Email Catcher</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockMailSectionTooltip" onClick={() => setMailSectionEditable(!mailSectionEditable)}>
                        {mailSectionEditable ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockMailSectionTooltip">{mailSectionEditable ? "Click to revert Email Catcher Settings" : "Click to edit Email Catcher Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={mailSectionEditable}>
                    <div className="pb2">
                        <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    </div>

                    <div className='flex'>
                        <IconStyle className="mr1">info_outlined</IconStyle>
                        <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the Knowledge Base</Text>
                    </div>
                    <DropdownSingle
                        className="col col-3 mt2"
                        id="vodMailCatcherList"
                        dropdownTitle="Email Catcher"
                        dropdownDefaultSelect={engagementSettings.selectedMailCatcher}
                        list={props.contentEngagementSettings.engagementSettings.mailCatcher.reduce((reduced: DropdownListType, item: MailCatcher) => { return { ...reduced, [item.type]: false } }, {})}
                        callback={
                            (selectedMailCatcher: string) => {
                                setEngagementSettings({ ...engagementSettings, selectedMailCatcher: selectedMailCatcher }); setSettingsEdited(true)
                            }}

                    />
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>Brand Text</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockBrandSectionTooltip" onClick={() => setBrandSectionEditable(!brandSectionEditable)}>
                        {brandSectionEditable ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockBrandSectionTooltip">{brandSectionEditable ? "Click to revert Brand Text Settings" : "Click to edit Brand Text Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={brandSectionEditable}>
                    <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    <div className='flex'>
                        <Input
                            disabled={engagementSettings.isBrandTextAsTitle} className='my2 pr1 col col-8'
                            label='Brand Text'
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, brandText: event.currentTarget.value }); setSettingsEdited(true) }}
                            value={engagementSettings.brandText ? engagementSettings.brandText : ""}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='Brand Text Link'
                            value={engagementSettings.brandTextLink ? engagementSettings.brandTextLink : ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, brandTextLink: event.currentTarget.value }); setSettingsEdited(true) }} />
                    </div>
                    <Toggle className='' label='Use content title as Brand Text' defaultChecked={engagementSettings.isBrandTextAsTitle} onChange={() => { setEngagementSettings({ ...engagementSettings, isBrandTextAsTitle: !engagementSettings.isBrandTextAsTitle }); setSettingsEdited(true) }} />
                </DisabledSection>
            </Card>

            <Card className='my2'>
                <Header className="mb2">
                    <TextStyle>
                        <Text size={20} weight='med'>End Screen Text</Text>
                    </TextStyle>
                    <IconStyle className='pointer' id="unlockEndScreenSectionTooltip" onClick={() => setEndScreenSectionEditable(!endScreenSectionEditable)}>
                        {endScreenSectionEditable ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockEndScreenSectionTooltip">{endScreenSectionEditable ? "Click to revert End Screen Text Settings" : "Click to edit End Screen Text Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={endScreenSectionEditable}>
                    <Text size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overriden individuallly. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    <div className='flex'>
                        <Input
                            className='my2 pr1 col col-8'
                            label='End Screen Text'
                            value={engagementSettings.endScreenText ? engagementSettings.endScreenText : ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, endScreenText: event.currentTarget.value }); setSettingsEdited(true) }}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='End Screen Text Link'
                            value={engagementSettings.endScreenTextLink ? engagementSettings.endScreenTextLink : ""}
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, endScreenTextLink: event.currentTarget.value }); setSettingsEdited(true) }} />
                    </div>
                </DisabledSection>
            </Card>

            {
                settingsEdited ?
                    <div className="mt1">
                        <Button
                            isLoading={saveAllButtonLoading}
                            onClick={() => { setSaveAllButtonLoading(true);  props.saveContentEngagementSettings({contentId: props.contentId, engagementSettings: engagementSettings}, () => setSaveAllButtonLoading(false)); setSettingsEdited(false) }}
                        >
                            Save
                        </Button>
                        <Button className="ml2" typeButton="tertiary" onClick={() => revertSettings()}>Discard</Button>
                    </div> : null
            }

            <Modal hasClose={false} opened={newAdModalOpened} modalTitle={selectedAd.id === "-1" ? "New Ad" : "Edit Ad"} size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                <ContentNewAdModal {...props} toggle={setNewAdModalOpened} selectedAd={selectedAd} />
            </Modal>
            <Modal modalTitle='Preview Ads' toggle={() => setPlayerModalOpened(!playerModalOpened)} opened={playerModalOpened}>
                <div className="mt2" ref={playerRef}></div>
            </Modal>
            <Prompt when={engagementSettings !== props.contentEngagementSettings.engagementSettings} message='' />
        </div>
    )
}
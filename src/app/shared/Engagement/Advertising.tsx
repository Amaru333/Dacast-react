import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Table } from '../../../components/Table/Table';
import { Toggle } from '../../../components/Toggle/toggle';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { Text } from '../../../components/Typography/Text';
import { ActionIcon, IconContainer, IconStyle } from '../../../shared/Common/Icon';
import { dataToTimeVideo } from '../../../utils/formatUtils';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';
import { EngagementComponentProps } from '../../redux-flow/store/Content/Engagement/types';
import { Ad } from '../../redux-flow/store/Settings/Engagement';
import { DisabledSection } from '../Common/MiscStyle';
import { emptyContentListBody } from '../List/emptyContentListState';
import { AdTableURLContainer, Header } from './EngagementStyle';
import { NewAdModal } from './NewAdModal';

export const EngagementAdvertising = (props: EngagementComponentProps  ) => {

    const [selectedAd, setSelectedAd] = React.useState<number>(-1)
    const [newAdModalOpened, setNewAdModalOpened] = React.useState<boolean>(false);

    const handleAdsLockChange = () => {
        if (!props.localEngagementSettings.adsSettings.locked) {
            props.lockSection('ads', props.contentId, props.contentType).then(() => {
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings,
                    adsSettings: {
                        locked: true,
                        adsEnabled: props.globalEngagementSettings.adsSettings.adsEnabled, 
                        ads: props.globalEngagementSettings.adsSettings.ads
                    }
                })
            })
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(props.localEngagementSettings).filter(f => {return props.localEngagementSettings[f] && !props.localEngagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: props.localEngagementSettings[next]}}, {}),
                    adsSettings:{
                        locked: false,
                        ads: [],
                        adsEnabled: false
                    }
                }          
            }, props.contentType).then(() => {
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings,
                    adsSettings:{
                        locked: false,
                        ads: [],
                        adsEnabled: false
                    }
                })
            })
        }
    }

    const newAd = () => {
        setSelectedAd(-1);
        setNewAdModalOpened(true)
    }

    const editAd = (adIndex: number) => {
        setSelectedAd(adIndex);
        setNewAdModalOpened(true);
    }

    const handleAdPosition = (ad: Ad) => {
        if(ad.type === "Pre-roll"){
            return "Start"
        } else if(ad.type === "Post-roll"){
            return "End"
        } else {
            return dataToTimeVideo(ad.timestamp).toString()
        }
    }

    const advertisingTableHeader = () => {
        if (props.localEngagementSettings.adsSettings.ads.length > 0) {
            return {
                data: [
                    { cell: <Text key='advertisingTableHeaderPlacement' size={14} weight='med'>Placement</Text> },
                    { cell: <Text key='advertisingTableHeaderPosition' size={14} weight='med'>Position</Text> },
                    { cell: <Text key='advertisingTableHeaderUrl' size={14} weight='med'>Ad URL</Text> },
                    {
                        cell: <div key='advertisingTableHeaderButtons' className='right mr2 flex'>
                            <Button className="sm-show" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newAd() }}>New Ad</Button>
                        </div>
                    }
                ]
            }
        } else {
            return {
                data: [
                    {
                        cell: <div key='advertisingTableHeaderButtons' className='right mr2 flex'>
                            <Button className="sm-show" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newAd() }}>New Ad</Button>
                        </div>
                    }
                ]
            }
        }
    }

    const advertisingTableBody = () => {
        return props.localEngagementSettings.adsSettings.ads.map((item, i) => {
            return {
                data: [
                    <Text key={'advertisingTableBodyPlacement' + item.type + i} size={14} weight='med'>{item.type}</Text>,
                    <Text key={'advertisingTableBodyPosition' + item.timestamp + i} size={14} weight='med'>{handleAdPosition(item)}</Text>,
                    <AdTableURLContainer>
                        <Text key={'advertisingTableBodyUrl' + item.url + i} size={14} weight='med'>{item.url}</Text>
                    </AdTableURLContainer>,
                    <IconContainer className="iconAction" key={'advertisingTableActionButtons' + i.toString()}>
                        <ActionIcon>
                            <IconStyle id={'adTableCopy' + i} onClick={() => props.deleteAd(!props.contentType ? props.localEngagementSettings.adsSettings.ads.filter(ad => ad !== item) : props.localEngagementSettings.adsSettings.ads.filter(ad => ad.id !== item.id ), props.contentId, props.contentType)}>delete</IconStyle>
                            <Tooltip target={'adTableCopy' + i}>Delete</Tooltip>
                        </ActionIcon>
                        <ActionIcon>
                            <IconStyle id={'adTableEdit' + i} onClick={() => editAd(i)}>edit</IconStyle>
                            <Tooltip target={'adTableEdit' + i}>Edit</Tooltip>
                        </ActionIcon>
                    </IconContainer>
                ]
            }
        })
    }

    return(
        <React.Fragment>  
        <Card className='my2'>
        <Header className="mb2">
                        <div>
                            <Text size={20} weight='med'>Advertising</Text>
                        </div>
                        { props.contentType &&
                            <>
                                <IconStyle className='pointer' id="unlockAdSectionTooltip" onClick={() => {handleAdsLockChange()}}>
                                    {!props.localEngagementSettings.adsSettings.locked ? "lock_open" : "lock"}
                                </IconStyle>
                                <Tooltip target="unlockAdSectionTooltip">{!props.localEngagementSettings.adsSettings.locked ? "Click to revert Advertising Settings" : "Click to edit Advertising Settings"}</Tooltip>
                            </>
                        }
                    </Header>
                    <DisabledSection settingsEditable={!props.localEngagementSettings.adsSettings.locked || !props.contentType}>
                        <Toggle className="mb2" id='advertisingEnabled' checked={props.localEngagementSettings.adsSettings.adsEnabled} defaultChecked={(props.localEngagementSettings.adsSettings.locked && props.contentType) ? props.globalEngagementSettings.adsSettings.adsEnabled : props.localEngagementSettings.adsSettings.adsEnabled} onChange={() => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, adsSettings: {...props.localEngagementSettings.adsSettings, adsEnabled: !props.localEngagementSettings.adsSettings.adsEnabled }}); props.setSettingsEdited(true) }} label='Advertising enabled' />
                    
                    <Text className="" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overridden individually. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    <div className='flex my2'>
                        <IconStyle className="mr1">info_outlined</IconStyle>
                        <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the <a href={getKnowledgebaseLink("Ads")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                    </div>
                    <div className="clearfix mb2">
                        <Button className="xs-show col col-12" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={() => { newAd() }}>New Ad</Button>
                    </div>
                    <Table id='advertisingTable' headerBackgroundColor="gray-10" header={advertisingTableHeader()} body={props.localEngagementSettings.adsSettings.ads.length > 0 ? advertisingTableBody() : emptyContentListBody("Create a new Ad before enabling Advertising")} />
                    </DisabledSection>
                </Card>
                
                <Modal className='x-visible'  hasClose={false} opened={newAdModalOpened} modalTitle={selectedAd === -1 ? "New Ad" : "Edit Ad"} size='small' toggle={() => setNewAdModalOpened(!newAdModalOpened)}>
                {
                    newAdModalOpened &&
                        <NewAdModal 
                            toggle={setNewAdModalOpened} 
                            selectedAd={selectedAd}
                            localEngagementSettings={props.localEngagementSettings}
                            createAd={props.createAd}
                            saveAd={props.saveAd}
                            contentType={props.contentType}
                            contentId={props.contentId} 
                        />
                }
            </Modal>
            </React.Fragment>
    )
}
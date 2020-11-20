import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { DisabledSection } from '../Common/MiscStyle';

export const EngagementAdvertising = () => {
    return(
        <Card className='my2'>
                    <Text className="pb2" size={20} weight='med'>Advertising</Text>
                    <DisabledSection settingsEditable={props.interactionsInfos.adsSettings.ads.length > 0}>
                        <Toggle id='advertisingEnabled' defaultChecked={props.interactionsInfos.adsSettings.adsEnabled} onChange={() => { setInteractionsInfos({ ...interactionInfos, adsSettings: {...interactionInfos.adsSettings, adsEnabled: !interactionInfos.adsSettings.adsEnabled }}); setSettingsEdited(true) }} label='Advertising enabled' />
                    </DisabledSection>
                    <Text className="py2" size={14} weight='reg' color='gray-3'>Ads configured here will apply to all your content and can be overridden individually. Be aware that Mid-roll ads will only play if the video/stream duration is long enough.</Text>
                    <div className='flex mb2'>
                        <IconStyle className="mr1">info_outlined</IconStyle>
                        <Text size={14} weight='reg' color='gray-3'>Need help creating Ads? Visit the <a href={getKnowledgebaseLink("Ads")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                    </div>
                    <div className="clearfix mb2">
                        {/* <Button className='xs-show col mb1 col-12' typeButton='primary' sizeButton='xs' buttonColor='blue' onClick={(event) => { event.preventDefault(); setPreviewModalOpen(true) }}>Preview</Button> */}
                        <Button className="xs-show col col-12" typeButton='secondary' sizeButton='xs' buttonColor='blue' onClick={(event) => { newAd() }}>New Ad</Button>
                    </div>
                    <Table id='advertisingTable' headerBackgroundColor="gray-10" header={advertisingTableHeader()} body={props.interactionsInfos.adsSettings.ads.length > 0 ? advertisingTableBody() : emptyContentListBody("Create a new Ad before enabling Advertising")} />

                </Card>
    )
}
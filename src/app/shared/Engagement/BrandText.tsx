import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Header } from './EngagementStyle';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';

export const EngagementBrandText = () => {
    return (
        <Card className='my2'>
                <Header className="mb2">
                    <div>
                        <Text size={20} weight='med'>Brand Text</Text>
                    </div>
                    <IconStyle className='pointer' id="unlockBrandSectionTooltip" onClick={() => {handleBrandTextLockChange()}}>
                        {!engagementSettings.brandTextSettings.locked ? "lock_open" : "lock"}
                    </IconStyle>
                    <Tooltip target="unlockBrandSectionTooltip">{!engagementSettings.brandTextSettings.locked ? "Click to revert Brand Text Settings" : "Click to edit Brand Text Settings"}</Tooltip>
                </Header>
                <DisabledSection settingsEditable={!engagementSettings.brandTextSettings.locked}>
                    <Text size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>
                    <div className='flex'>
                        <Input
                            disabled={engagementSettings.brandTextSettings.isBrandTextAsTitle} className='my2 pr1 col col-8'
                            label='Brand Text'
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, brandTextSettings: {...engagementSettings.brandTextSettings, brandText: event.currentTarget.value }}); setSettingsEdited(true) }}
                            value={engagementSettings.brandTextSettings.brandText || ""}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='Brand Text Link'
                            value={engagementSettings.brandTextSettings.brandTextLink || ""}
                            tooltip='Enter a URL starting with "https://".'
                            onChange={(event) => { setEngagementSettings({ ...engagementSettings, brandTextSettings: {...engagementSettings.brandTextSettings, brandTextLink: event.currentTarget.value }}); setSettingsEdited(true) }} />
                    </div>
                    <Toggle className='' label='Use content title as Brand Text' defaultChecked={engagementSettings.brandTextSettings.isBrandTextAsTitle} onChange={() => { setEngagementSettings({ ...engagementSettings, brandTextSettings: {...engagementSettings.brandTextSettings, isBrandTextAsTitle: !engagementSettings.brandTextSettings.isBrandTextAsTitle }}); setSettingsEdited(true) }} />
                </DisabledSection>
            </Card>
    )
}
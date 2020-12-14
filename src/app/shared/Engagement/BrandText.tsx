import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Header } from './EngagementStyle';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { ContentEngagementSettings, EngagementInfo } from '../../redux-flow/store/Settings/Interactions/types';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { DisabledSection } from '../Common/MiscStyle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Toggle } from '../../../components/Toggle/toggle';

export const EngagementBrandText = (props: {localEngagementSettings: EngagementInfo, setLocalEngagementSettings: React.Dispatch<React.SetStateAction<EngagementInfo>>, setSettingsEdited: React.Dispatch<React.SetStateAction<boolean>>, contentType?: string, contentId?: string, handleSectionRevert?: (section: string) => void, saveContentEngagementSettings?: (data: ContentEngagementSettings, contentType: string) => Promise<void>, globalEngagementSettings?: EngagementInfo, lockSection?: (section: string, contentId: string, contentType: string, unlock?: boolean) => Promise<void> }) => {

    const handleBrandTextLockChange = () => {
        if (!props.localEngagementSettings.brandTextSettings.locked) {
            props.lockSection('brand-text', props.contentId, props.contentType).then(() => {
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings, 
                    brandTextSettings: {
                        locked: true,
                        brandText: props.globalEngagementSettings.brandTextSettings.brandText, 
                        brandTextLink: props.globalEngagementSettings.brandTextSettings.brandTextLink, 
                        isBrandTextAsTitle: props.globalEngagementSettings.brandTextSettings.isBrandTextAsTitle
                    }
                })
            })
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(props.localEngagementSettings).filter(f => {return props.localEngagementSettings[f] && !props.localEngagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: props.localEngagementSettings[next]}}, {}),
                    brandTextSettings: {
                        locked:false,
                        brandText: '',
                        brandTextLink: '',
                        isBrandTextAsTitle: false
                    }
                }          
            }, props.contentType).then(() => {
                props.setSettingsEdited(false)
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings,
                    brandTextSettings: {
                        locked:false,
                        brandText: '',
                        brandTextLink: '',
                        isBrandTextAsTitle: false
                    }
                })
            })        
            }
    }

    return (
        <Card className='my2'>
                <Header className="mb2">
                    <div>
                        <Text size={20} weight='med'>Brand Text</Text>
                    </div>
                    {   props.contentType &&
                        <>
                            <IconStyle className='pointer' id="unlockBrandSectionTooltip" onClick={() => {handleBrandTextLockChange()}}>
                            {!props.localEngagementSettings.brandTextSettings.locked ? "lock_open" : "lock"}
                            </IconStyle>
                            <Tooltip target="unlockBrandSectionTooltip">{!props.localEngagementSettings.brandTextSettings.locked ? "Click to revert Brand Text Settings" : "Click to edit Brand Text Settings"}</Tooltip>
                        </>
                    }
                    
                </Header>
                <DisabledSection settingsEditable={!props.contentType || !props.localEngagementSettings.brandTextSettings.locked}>
                    <Text size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>
                    <div className='flex'>
                        <Input
                            disabled={props.localEngagementSettings.brandTextSettings.isBrandTextAsTitle} className='my2 pr1 col col-8'
                            label='Brand Text'
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandTextSettings: {...props.localEngagementSettings.brandTextSettings, brandText: event.currentTarget.value }}); props.setSettingsEdited(true) }}
                            value={props.localEngagementSettings.brandTextSettings.brandText || ""}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='Brand Text Link'
                            value={props.localEngagementSettings.brandTextSettings.brandTextLink || ""}
                            tooltip='Enter a URL starting with "https://".'
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandTextSettings: {...props.localEngagementSettings.brandTextSettings, brandTextLink: event.currentTarget.value }}); props.setSettingsEdited(true) }} />
                    </div>
                    <Toggle className='' label='Use content title as Brand Text' defaultChecked={props.localEngagementSettings.brandTextSettings.isBrandTextAsTitle} onChange={() => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, brandTextSettings: {...props.localEngagementSettings.brandTextSettings, isBrandTextAsTitle: !props.localEngagementSettings.brandTextSettings.isBrandTextAsTitle }}); props.setSettingsEdited(true) }} />
                </DisabledSection>
            </Card>
    )
}
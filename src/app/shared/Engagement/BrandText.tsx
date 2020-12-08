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

export const EngagementBrandText = (props: {localEngagemntSettings: EngagementInfo, setLocalEngagementSettings: React.Dispatch<React.SetStateAction<EngagementInfo>>, setSettingsEdited: React.Dispatch<React.SetStateAction<boolean>>, contentType?: string, contentId?: string, handleSectionRevert?: (section: string) => void, saveContentEngagementSettings?: (data: ContentEngagementSettings, contentType: string) => Promise<void>}) => {

    const handleBrandTextLockChange = () => {
        if (!props.localEngagemntSettings.brandTextSettings.locked) {
            props.handleSectionRevert('brandText')
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(props.localEngagemntSettings).filter(f => {return props.localEngagemntSettings[f] && !props.localEngagemntSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: props.localEngagemntSettings[next]}}, {}),
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
                    ...props.localEngagemntSettings,
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
                            {!props.localEngagemntSettings.brandTextSettings.locked ? "lock_open" : "lock"}
                            </IconStyle>
                            <Tooltip target="unlockBrandSectionTooltip">{!props.localEngagemntSettings.brandTextSettings.locked ? "Click to revert Brand Text Settings" : "Click to edit Brand Text Settings"}</Tooltip>
                        </>
                    }
                    
                </Header>
                <DisabledSection settingsEditable={!props.contentType || !props.localEngagemntSettings.brandTextSettings.locked}>
                    <Text size={14} weight='reg' color='gray-3'>This will display on the video player on top of the content.</Text>
                    <div className='flex'>
                        <Input
                            disabled={props.localEngagemntSettings.brandTextSettings.isBrandTextAsTitle} className='my2 pr1 col col-8'
                            label='Brand Text'
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagemntSettings, brandTextSettings: {...props.localEngagemntSettings.brandTextSettings, brandText: event.currentTarget.value }}); props.setSettingsEdited(true) }}
                            value={props.localEngagemntSettings.brandTextSettings.brandText || ""}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='Brand Text Link'
                            value={props.localEngagemntSettings.brandTextSettings.brandTextLink || ""}
                            tooltip='Enter a URL starting with "https://".'
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagemntSettings, brandTextSettings: {...props.localEngagemntSettings.brandTextSettings, brandTextLink: event.currentTarget.value }}); props.setSettingsEdited(true) }} />
                    </div>
                    <Toggle className='' label='Use content title as Brand Text' defaultChecked={props.localEngagemntSettings.brandTextSettings.isBrandTextAsTitle} onChange={() => { props.setLocalEngagementSettings({ ...props.localEngagemntSettings, brandTextSettings: {...props.localEngagemntSettings.brandTextSettings, isBrandTextAsTitle: !props.localEngagemntSettings.brandTextSettings.isBrandTextAsTitle }}); props.setSettingsEdited(true) }} />
                </DisabledSection>
            </Card>
    )
}
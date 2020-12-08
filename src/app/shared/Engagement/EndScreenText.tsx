import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Header } from './EngagementStyle';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { DisabledSection } from '../Common/MiscStyle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { ContentEngagementSettings, EngagementInfo } from '../../redux-flow/store/Settings/Interactions/types';

export const EngagementEndScreenText = (props: {localEngagementSettings: EngagementInfo, setLocalEngagementSettings: React.Dispatch<React.SetStateAction<EngagementInfo>>, setSettingsEdited: React.Dispatch<React.SetStateAction<boolean>>, contentType?: string, contentId?: string, handleSectionRevert?: (section: string) => void, saveContentEngagementSettings?: (data: ContentEngagementSettings, contentType: string) => Promise<void>}) => {

    const handleEndScreenTextLockChange = () => {
        if (!props.localEngagementSettings.endScreenSettings.locked) {
            props.handleSectionRevert('endScreenText')
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(props.localEngagementSettings).filter(f => {return props.localEngagementSettings[f] && !props.localEngagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: props.localEngagementSettings[next]}}, {}),
                    endScreenSettings: {
                        locked:false,
                        endScreenText: '',
                        endScreenTextLink: ''
                    }
                }          
            }, props.contentType).then(() => {
                props.setSettingsEdited(false)
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings,
                    endScreenSettings: {
                        locked:false,
                        endScreenText: '',
                        endScreenTextLink: ''
                    }
                })
            })
        }
    }


    return (
        <Card className='my2'>
                <Header className="mb2">
                    <div>
                        <Text size={20} weight='med'>End Screen Text</Text>
                    </div>
                    { props.contentType &&
                        <>
                            <IconStyle className='pointer' id="unlockEndScreenSectionTooltip" onClick={() => {handleEndScreenTextLockChange()}}>
                            {!props.localEngagementSettings.endScreenSettings.locked ? "lock_open" : "lock"}
                            </IconStyle>
                            <Tooltip target="unlockEndScreenSectionTooltip">{!props.localEngagementSettings.endScreenSettings.locked ? "Click to revert End Screen Text Settings" : "Click to edit End Screen Text Settings"}</Tooltip>
                        </>
                    }
                </Header>
                <DisabledSection settingsEditable={!props.contentType || !props.localEngagementSettings.endScreenSettings.locked}>
                    <Text size={14} weight='reg' color='gray-3'>This will be displayed when the content ends.</Text>
                    <div className='flex'>
                        <Input
                            className='my2 pr1 col col-8'
                            label='End Screen Text'
                            value={props.localEngagementSettings.endScreenSettings.endScreenText || ""}
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, endScreenSettings: {...props.localEngagementSettings.endScreenSettings, endScreenText: event.currentTarget.value }}); props.setSettingsEdited(true) }}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label='End Screen Text Link'
                            tooltip='Enter a URL starting with "https://".'
                            value={props.localEngagementSettings.endScreenSettings.endScreenTextLink || ""}
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, endScreenSettings: {...props.localEngagementSettings.endScreenSettings, endScreenTextLink: event.currentTarget.value }}); props.setSettingsEdited(true) }} />
                    </div>
                </DisabledSection>
            </Card>
    )
}
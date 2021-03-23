import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Header } from './EngagementStyle';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { DisabledSection } from '../Common/MiscStyle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { Toggle } from '../../../components/Toggle/toggle';
import { EngagementComponentProps } from '../../redux-flow/store/Content/Engagement/types';
import { getKnowledgebaseLink } from '../../constants/KnowledgbaseLinks';

export const EngagementGoogleAnalytics = (props: EngagementComponentProps) => {

    const handleGoogleAnalyticsLockChange = () => {
        if (!props.localEngagementSettings.googleAnalyticsSettings.locked) {
            props.lockSection('google-analytics', props.contentId, props.contentType).then(() => {
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings,
                    googleAnalyticsSettings: {
                        locked: true,
                        trackingID: props.globalEngagementSettings.googleAnalyticsSettings.trackingID

                    }
                })
            })
        } else {
            props.saveContentEngagementSettings({
                contentId: props.contentId,
                engagementSettings: {
                    ...Object.keys(props.localEngagementSettings).filter(f => {return props.localEngagementSettings[f] && !props.localEngagementSettings[f].locked}).reduce((acc, next) => {return {...acc, [next]: props.localEngagementSettings[next]}}, {}),
                    googleAnalyticsSettings: {
                        locked:false,
                        trackingID: ''
                    }
                }
            }, props.contentType).then(() => {
                props.setSettingsEdited(false)
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings,
                    googleAnalyticsSettings: {
                        locked:false,
                        trackingID: ''
                    }
                })
            })
            }
    }

    return(
        <Card className="my2">
            <Header className="mb2">
                <div>
                    <Text size={20} weight='med'>Google Analytics</Text>
                </div>
                {
                    props.contentType &&
                        <>
                            <IconStyle className='pointer' id="unlockGASectionTooltip" onClick={() => {handleGoogleAnalyticsLockChange()}}>
                            {!props.localEngagementSettings.googleAnalyticsSettings.locked ? "lock_open" : "lock"}
                            </IconStyle>
                            <Tooltip target="unlockGASectionTooltip">{!props.localEngagementSettings.googleAnalyticsSettings.locked ? "Click to revert Google Analytics Settings" : "Click to edit Google Analytics Settings"}</Tooltip>
                        </>
                }
            </Header>
            <DisabledSection settingsEditable={!props.contentType || !props.localEngagementSettings.googleAnalyticsSettings.locked}>
                <Text size={14} weight='reg' color='gray-3'>Capture video engagment and track data in Google Analytics.</Text>
                <div className='flex my2'>
                    <IconStyle className="mr1">info_outlined</IconStyle>
                    <Text size={14} weight='reg' color='gray-3'>Need help with Google Analytics? Visit the <a href={getKnowledgebaseLink("Google Analytics")} target="_blank" rel="noopener noreferrer">Knowledge Base</a></Text>
                </div>
                    <Input
                            className='my1 pr1 col col-8'
                            label='Google Analytics Tracking ID'
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, googleAnalyticsSettings: {...props.localEngagementSettings.googleAnalyticsSettings, trackingID: event.currentTarget.value }}); props.setSettingsEdited(true) }}
                            value={props.localEngagementSettings.googleAnalyticsSettings.trackingID || ""}
                        />
            </DisabledSection>
        </Card>
    )
}

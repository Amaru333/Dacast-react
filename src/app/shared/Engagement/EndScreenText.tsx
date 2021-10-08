import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Header } from './EngagementStyle';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from '../../../shared/Common/Icon';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { DisabledSection } from '../Common/MiscStyle';
import { Input } from '../../../components/FormsComponents/Input/Input';
import { EngagementComponentProps } from '../../redux-flow/store/Content/Engagement/types';
import { useTranslation } from 'react-i18next';

export const EngagementEndScreenText = (props: EngagementComponentProps) => {
    const { t } = useTranslation()

    const handleEndScreenTextLockChange = () => {
        if (!props.localEngagementSettings.endScreenSettings.locked) {
            props.lockSection('end-screen-text', props.contentId, props.contentType).then(() => {
                props.setLocalEngagementSettings({
                    ...props.localEngagementSettings, 
                    endScreenSettings: {
                        locked: true,
                        endScreenText: props.globalEngagementSettings.endScreenSettings.endScreenText, 
                        endScreenTextLink: props.globalEngagementSettings.endScreenSettings.endScreenTextLink
                    }
                })
            })
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
                        <Text size={20} weight='med'>{t('common_engagement_end_screen_title')}</Text>
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
                    <Text size={14} weight='reg' color='gray-3'>{t('common_engagement_end_screen_info_text')}</Text>
                    <div className='flex'>
                        <Input
                            className='my2 pr1 col col-8'
                            label={t('common_engagement_end_screen_title')}
                            value={props.localEngagementSettings.endScreenSettings.endScreenText || ""}
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, endScreenSettings: {...props.localEngagementSettings.endScreenSettings, endScreenText: event.currentTarget.value }}); props.setSettingsEdited(true) }}
                        />
                        <Input
                            className='my2 pl1 col col-4'
                            label={t('common_engagement_end_screen_text_link_input_title')}
                            tooltip={t('common_engagement_brand_text_text_link_tooltip')}
                            value={props.localEngagementSettings.endScreenSettings.endScreenTextLink || ""}
                            onChange={(event) => { props.setLocalEngagementSettings({ ...props.localEngagementSettings, endScreenSettings: {...props.localEngagementSettings.endScreenSettings, endScreenTextLink: event.currentTarget.value }}); props.setSettingsEdited(true) }} />
                    </div>
                </DisabledSection>
            </Card>
    )
}
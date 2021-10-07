import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from "../../../shared/Common/Icon";

export type PlanDetailsCarType = 'regular' | 'vod';

export interface PlanDetailsCardProps {
    type: PlanDetailsCarType;
}

export const PlanDetailsCard = (props: PlanDetailsCardProps) => {
    const { t } = useTranslation()
    return (
        <div>
            <Text size={16} weight="med" className="block mb2">{t('common_free_trial_limitation_panel_title')}</Text>
            {
                props.type === 'vod' &&
                <div className="mb1 flex">
                    <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                    <Text size={16}>{t('common_free_trial_limitation_panel_playbacks_amount')}</Text>
                </div>
            }
            <div className="mb1 flex">
                <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                <Text size={16}>{t('common_free_trial_limitation_panel_data_amount')}</Text>
            </div>
            <div className="mb1 flex">
                <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                <Text size={16}>{t('common_free_trial_limitation_panel_storage_amount')}</Text>
            </div>
            {
                props.type === 'regular' &&
                <>
                    <div className="mb1 flex">
                        <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                        <Text size={16}>{t('common_free_trial_limitation_panel_live_channel_amount')}</Text>
                    </div>
                    <div className="flex">
                        <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                        <Text size={16}>{t('common_free_trial_limitation_panel_playbacks_amount')}</Text>
                    </div>
                </>
            }
            <Text size={16} className="block mt25"><Trans i18nKey='common_free_trial_limitation_panel_additional_description'>Any questions regarding your trial features? Our team will be more than happy to assist you. <a href='/help' className="text-semibold">Contact Us</a> now.</Trans></Text>
        </div>
    )
}

PlanDetailsCard.defaultProps = { type: 'regular' }

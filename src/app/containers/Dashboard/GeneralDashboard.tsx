import React from 'react'
import { classContainer, WidgetHeader, classItemThirdWidthContainer, classItemHalfWidthContainer, WidgetHeaderTop } from './DashboardStyles'
import { WidgetElement } from './WidgetElement'
import { Text } from '../../../components/Typography/Text';
import { ProgressBar } from '../../../components/FormsComponents/Progress/ProgressBar/ProgressBar';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { getPercentage, useMedia } from '../../../utils/utils';
import { readableBytes, tsToLocaleDate } from '../../../utils/formatUtils';
import { IconStyle } from '../../../shared/Common/Icon';
import { DashboardGeneral } from '../../redux-flow/store/Dashboard';
import { useHistory } from 'react-router';
import { PlanSummary } from '../../redux-flow/store/Account/Plan';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { handleCurrencySymbol } from '../../../utils/utils'
import { userToken } from '../../utils/services/token/tokenService';
import { segmentService } from '../../utils/services/segment/segmentService';
import { Trans, useTranslation } from 'react-i18next';

export const GeneralDashboard = (props: {plan: PlanSummary | null; overage?: { enabled: boolean; amount: number }; openOverage?: (b: boolean) => void; profile: DashboardGeneral; isPlanPage?: boolean; dataButtonFunction?: () => void}) => {

    const { t, ready } = useTranslation('translation', { useSuspense: false });
    let history = useHistory()
    let smallScreen = useMedia('(max-width: 40em)')
    let date = new Date(), y = date.getFullYear(), m = date.getMonth()
    let classItem =  props.isPlanPage || (props.plan && props.plan.displayName === "30 Day Trial") ? classItemThirdWidthContainer : classItemHalfWidthContainer

    let allowanceDataFetching = Number.isNaN(props.profile.storage.consumed)

    const storage = {
        percentage: getPercentage(props.profile.storage.limit-props.profile.storage.consumed, props.profile.storage.limit),
        left: props.profile.storage.limit-props.profile.storage.consumed,
        limit: props.profile.storage.limit,
    }
    const bandwidth = {
        percentage: getPercentage(props.profile.bandwidth.limit-props.profile.bandwidth.consumed, props.profile.bandwidth.limit),
        left: props.profile.bandwidth.limit-props.profile.bandwidth.consumed,
        limit: props.profile.bandwidth.limit,
    }

    const handleBillingPeriod = () => {
        if(!props.plan || props.plan.displayName === "Free" || !props.plan.periodEndsAt || !props.plan.periodStartedAt) {
            return null
        }

        return <Text className={smallScreen ? 'mb1' : "ml-auto mb2"} size={16} weight="reg" color="gray-2" ><b>For Billing Period</b> {tsToLocaleDate( props.plan.periodStartedAt )} - {tsToLocaleDate( props.plan.periodEndsAt )}</Text>
    }

    const handleUpgradeClick = (options: { type: string } = {type: null}) => {
        segmentService.track('Upgrade Form Completed', {
            action: 'Upgrade Source Clicked',
            userId: userToken.getUserInfoItem('user-id'),
            customers: 'trial',
            type: options.type,
            location: props.isPlanPage ? 'countdown widget plan trial' : 'countdown widget dashboard trial',
            step: -1
        })
        history.push('/account/upgrade')
    }

    const handleButtonToPurchase = (percentage: number) => {
        if(percentage <= 25 ) {
            return (
                <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="lightBlue" sizeButton="xs" onClick={() => history.push('/account/upgrade')}>{t('common_button_upgrade_text')}</Button></Text>
            )
        }
        if(userToken.getPrivilege('privilege-billing')) {
            return (
                <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor={percentage <= 25 ? "red" : "lightBlue"} sizeButton="xs" onClick={() => props.isPlanPage ? props.dataButtonFunction() : history.push('/account/plan#purchase-data')}>{t('account_plan_buy_more_button')}</Button></Text>
            )
        }

        return null
    }

    const renderUpgradeText = () => {
        if(props.plan.trialExpiresIn > 7) {
            return <span><Trans i18nKey='dashboard_free_trial_thirty_day_trial_widget_description_3'><a onClick={() => handleUpgradeClick({ type: 'text' })} className='a-blue-260 text-semibold'>Upgrade</a> to enable all features</Trans></span>
        }
        
        if(props.plan.trialExpiresIn > 0) {
            return <span><Trans i18nKey='dashboard_free_trial_almost_expired_thirty_day_trial_widget_description_2'>Your free trial is about to end, <a onClick={() => handleUpgradeClick({ type: 'text' })} className='a-blue-260 text-semibold'>Upgrade Now</a></Trans></span>
        }

        return <span><Trans i18nKey='dashboard_free_trial_expired_thirty_day_trial_widget_description_2'>Or <a href='/help' className='a-blue-260 text-semibold'>Contact Us</a> in order to request more testing</Trans></span>
    }

    const renderDaysRemaining = () => {
        if(props.plan.trialExpiresIn > 0) {
            return (
                <div className="flex flex-wrap items-baseline mb1">
                    <Text className="mr1" size={32} weight="reg" color="white">{props.plan.trialExpiresIn}</Text><Text size={16} weight="reg" color="white" > Days remaining</Text>
                </div>
            )
        }
        return (
            <Text className="mb15 mt1" size={20} weight="reg" color="white">
                <Trans i18nKey='dashboard_free_trial_expired_thirty_day_trial_widget_description_1'>
                Your trial has ended, <a onClick={() => handleUpgradeClick({ type: 'text' })} className='a-blue-2 text-semibold'>Upgrade Now</a>
                </Trans>
            </Text>
        )
    }

    const renderPlanWidget = () => {
        if(!props.plan) {
            return null
        }

        if(props.plan.displayName === "30 Day Trial") {
            return (
                <WidgetElement placeholderWidget={allowanceDataFetching} className={classItemThirdWidthContainer} backgroundColor="gray-1">
                    <WidgetHeaderTop className="flex">
                        <Text size={16} weight="med" color="white"> 30 Day Trial </Text>
                        <Button className="ml-auto" typeButton='primary' buttonColor="lightBlue" sizeButton="xs" onClick={() => handleUpgradeClick({ type: 'button' })}>{t('common_button_upgrade_text')}</Button>
                    </WidgetHeaderTop>
                    {renderDaysRemaining()}
                    <Text size={14} weight="reg" color="white">{renderUpgradeText()}</Text>
                </WidgetElement>
            )
        }

        if(props.isPlanPage && props.plan.displayName !== "30 Day Trial") {
            if(props.plan.state === 'active') {
                return (
                    <WidgetElement placeholderWidget={allowanceDataFetching} className={classItemThirdWidthContainer}>
                        <WidgetHeaderTop className="flex">
                            <Text size={16} weight="med" color="gray-3"> {props.plan.displayName} </Text>
                            <Button className="ml-auto" typeButton='primary' buttonColor="lightBlue" sizeButton="xs" onClick={() => history.push('/account/upgrade')}>{t('common_button_upgrade_text')}</Button>
                        </WidgetHeaderTop>
                        {
                            props.plan.periodEndsAt && <><Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Next Bill due {tsToLocaleDate(props.plan.periodEndsAt)}</Text><br /></>
                        }
                        {props.plan.price && <Text size={32} weight="reg" color="gray-1">{handleCurrencySymbol(props.plan.currency) + props.plan.price}</Text>}
                    </WidgetElement> 
                )
            }
            return (
                <WidgetElement placeholderWidget={allowanceDataFetching} className={classItemThirdWidthContainer}>
                    <WidgetHeaderTop className="flex">
                        <Text size={16} weight="med" color="gray-3"> {props.plan.displayName} </Text>
                        <Button className="ml-auto" typeButton='primary' buttonColor="lightBlue" sizeButton="xs" onClick={() => history.push('/account/upgrade')}>{t('common_button_upgrade_text')}</Button>
                    </WidgetHeaderTop>
                    {
                        props.plan.periodEndsAt && <><Text className="inline-block mb1" size={14} weight="reg" color="gray-1">Your current plan expires {tsToLocaleDate(props.plan.periodEndsAt)}</Text><br /></>
                    }
                    <Text>Please <a href='/help'><Text color='light-blue' weight='med'>contact us</Text></a> or <a href='/upgrade'><Text color='light-blue' weight='med'>upgrade</Text></a>in order to renew your plan.</Text>
                    {/* {props.plan.price && <Text size={32} weight="reg" color="gray-1">{handleCurrencySymbol(props.plan.currency) + props.plan.price}</Text>} */}
                </WidgetElement> 

            )
        }

        return null
    }

    if(!ready) {return null}

    return (
        <section className="col col-12">
            <div className={smallScreen ? 'flex flex-column mb1' : "flex items-baseline mb1"}>
                {
                    !props.isPlanPage &&
                        <Text size={24} weight="reg" className={smallScreen ? 'mb1' : "mt0 mb2 inline-block"}>
                            {t('common_navigation_bar_menu_item_dashboard')}
                        </Text>
                }
                {handleBillingPeriod()}
            </div>
            <div className={classContainer}>
                <WidgetElement placeholderWidget={allowanceDataFetching} className={classItem}>
                    <WidgetHeaderTop className="flex">
                        <Text size={16} weight="med" color="gray-3">{t('dashboard_data_remaning_widget_title')}</Text>
                        {(props.plan && props.plan.displayName !== "Free" && props.plan.displayName !== "30 Day Trial") && handleButtonToPurchase(bandwidth.percentage)}
                    </WidgetHeaderTop>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> {(bandwidth.left < 0 ? '-' : '') + readableBytes(Math.abs(bandwidth.left) )}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(bandwidth.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{isNaN(bandwidth.percentage) ? 0 : bandwidth.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard openOverage={props.openOverage} overage={props.overage} percentage={bandwidth.percentage} widget="bandwidth" plan={props.plan} />
                </WidgetElement>

                {/* {
                    getPrivilege('privilege-china') &&
                    <WidgetElement className={classItem}>
                        <WidgetHeader className="flex">
                            <Text size={16} weight="med" color="gray-3"> China Data Remaining </Text>
                            {handleButtonToPurchase(bandwidth.percentage, "Data", handlePurchaseStepper)}
                        </WidgetHeader>
                        <div className="flex flex-wrap items-baseline mb1">
                            <Text size={32} weight="reg" color="gray-1"> {(bandwidth.left < 0 ? '-' : '') + readableBytes(Math.abs(bandwidth.left) )}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(bandwidth.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{bandwidth.percentage}%</Text>
                        </div>
                        <ProgressBarDashboard  percentage={bandwidth.percentage} widget="bandwidth" />
                    </WidgetElement>
                } */}

                <WidgetElement placeholderWidget={allowanceDataFetching} className={classItem}>
                    <WidgetHeaderTop className="flex">
                        <Text size={16} weight="med" color="gray-3">{t('dashboard_storage_remaining_widget_title')}</Text>
                        <IconStyle className="ml1" id="storageTooltip">info_outlined</IconStyle>
                        <Tooltip target="storageTooltip">{t('dashboard_storage_remaining_widget_description')}</Tooltip>
                    </WidgetHeaderTop>
                    <div className="flex flex-wrap items-baseline mb1">
                        <Text size={32} weight="reg" color="gray-1"> { (storage.left < 0 ? '-' : '') + readableBytes(Math.abs(storage.left))}</Text><Text size={16} weight="reg" color="gray-4" >/{readableBytes(storage.limit)}</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >{isNaN(storage.percentage) ? 0 : storage.percentage}%</Text>
                    </div>
                    <ProgressBarDashboard percentage={storage.percentage} widget="storage" />
                </WidgetElement>
                {renderPlanWidget()}
            </div>
        </section>
    )

}

export const ProgressBarDashboard = (props: { openOverage?: (b: boolean) => void; percentage: number; widget: 'bandwidth' | 'storage' | 'encoding'; overage?: {enabled: boolean; amount: number}; plan?: PlanSummary }) => {

    const handleProgressBar = (percentage: number) => {
        return (
            <ProgressBar static className="mb1" size="large" color={ percentage<= 25 ? 'red' : 'violet' } startingValue={percentage} />
        )
    }
    const handleInfos = () => {
        if(props.widget === "bandwidth" && props.plan && props.plan.displayName !== "Free" && props.plan.displayName !== "30 Day Trial" && userToken.getPrivilege('privilege-billing')) {
            if(props.overage && props.overage.enabled && props.overage.amount > 0) {
                return (
                    <div className="flex align-center"><Text className="self-center mr1" size={12} weight="reg">{ props.percentage <= 0 ? props.overage.amount+"GB Playback Protection purchased" : "Playback Protection enabled"}</Text>
                        <IconStyle className='pointer' onClick={() => props.openOverage(true)} >settings</IconStyle>
                    </div>
                )
            } else {
                return (
                    <div color={props.percentage <= 25 ? 'red' : 'gray-1'} className="flex align-center"><Text className="self-center mr1" size={12} weight="reg">{props.percentage <= 25 ? "Enable Playback Protection" : "Playback Protection"}</Text>
                        <IconStyle className='pointer' onClick={() => props.openOverage(true)}>settings</IconStyle>
                    </div>
                )
            }
        }
        if(props.percentage <= 25 && props.percentage > 0) {
            return <Text size={12} weight="reg" color="red"> Upgrade before you run out of {props.widget}</Text>
        }
        if(props.percentage <= 0) {
            if(props.widget === 'storage' || props.widget === 'encoding' || props.widget === 'bandwidth') {
                return <Text size={12} weight="reg" color="red">You have no {props.widget} remaining</Text>
            }
        }
    }

    return(
        <>
            {handleProgressBar(props.percentage)}
            {handleInfos()}
        </>
    )

}

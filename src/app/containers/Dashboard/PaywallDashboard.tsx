import React from 'react'
import { classContainer, classItemHalfWidthContainer, WidgetHeader } from './DashboardStyles'
import { WidgetElement } from './WidgetElement'
import { Text } from '../../../components/Typography/Text';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { IconStyle } from '../../../shared/Common/Icon'
import { DashboardPaywall } from '../../redux-flow/store/Dashboard/types';

export const PaywallDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {rightSide: boolean; profile: DashboardPaywall }) => {
    var classTopContainer = "col lg-col-6 sm-col-12 "+(props.rightSide?"pl2" : "pr2");
    let paywallDataFetching = Number.isNaN(props.profile.balance)

    return (
        <section className={classTopContainer}>
            <div className="flex items-baseline mb1">
                <IconStyle className="mr1 self-center">attach_money</IconStyle>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Paywall
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement placeholderWidget={paywallDataFetching} className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Balance </Text>
                        <div className="relative ml-auto">
                            <IconStyle id="balanceTooltip">info_outlined</IconStyle>
                            <Tooltip target="balanceTooltip" style={{whiteSpace: 'nowrap'}}>Your current paywall balance as of today</Tooltip>
                        </div>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">${props.profile.balance.toLocaleString()}</Text>
                    </div>
                </WidgetElement>
                <WidgetElement placeholderWidget={paywallDataFetching} className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Revenue </Text>
                        <div className="relative ml-auto">
                            <IconStyle id="revenueTooltip">info_outlined</IconStyle>
                            <Tooltip target="revenueTooltip" style={{whiteSpace: 'nowrap'}}>The paywall revenue you have earned for the last 30 days</Tooltip>
                        </div>
                    </WidgetHeader>
                    <div className="flex flex-column minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">${props.profile.revenue ? props.profile.revenue.toLocaleString() : '0'}</Text>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}


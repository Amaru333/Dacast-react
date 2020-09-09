import React from 'react'
import { classContainer, classItemHalfWidthContainer, WidgetHeader } from './DashboardStyles'
import { WidgetElement } from './WidgetElement'
import { Text } from '../../../components/Typography/Text';
import { numberFormatter } from '../../../utils/utils';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { IconStyle } from '../../../shared/Common/Icon'

interface PaywallDashboardProps {
    balance: number;
    revenue: {currency: string; total: number}[];
}

export const PaywallDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {rightSide: boolean; profile: PaywallDashboardProps }) => {
    var classTopContainer = "col lg-col-6 sm-col-12 "+(props.rightSide?"pl2" : "pr2");
    var balance = numberFormatter(props.profile.balance, 'comma');
    var revenue = numberFormatter(props.profile.revenue ? props.profile.revenue.find(r => r.currency === 'USD').total : 0, 'comma');


    return (
        <section className={classTopContainer}>
            <div className="flex items-baseline mb1">
                <IconStyle className="mr1 self-center">attach_money</IconStyle>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Paywall
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Balance </Text>
                        <IconStyle id="balanceTooltip" className="ml-auto">info_outline</IconStyle>
                        <Tooltip target="balanceTooltip">Your current paywall balance as of today</Tooltip>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">${balance}</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Revenue </Text>
                        <IconStyle id="revenueTooltip" className="ml-auto">info_outline</IconStyle>
                        <Tooltip target="revenueTooltip">The paywall revenue you have earned since the start of the current billing period</Tooltip>
                    </WidgetHeader>
                    <div className="flex minContentDash justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">${revenue}</Text>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}


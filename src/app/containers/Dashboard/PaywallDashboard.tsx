import React from 'react'
import { classContainer, classItemHalfWidthContainer, WidgetHeader } from './DashboardStyles'
import { WidgetElement } from './WidgetElement'
import { Text } from '../../../components/Typography/Text';
import { Tooltip } from '../../../components/Tooltip/Tooltip';
import { IconStyle } from '../../../shared/Common/Icon'

interface PaywallDashboardProps {
    balance: number;
    revenue: {currency: string; total: number}[];
}

export const PaywallDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {rightSide: boolean; profile: PaywallDashboardProps }) => {
    var classTopContainer = "col lg-col-6 sm-col-12 "+(props.rightSide?"pl2" : "pr2");

    const handleCurrencySymbol = (currency: string) => {
        switch(currency) {
            case 'USD':
                return '$'
            case 'AUD':
                return 'AU$'
            case 'GBP': 
                return '£'
            case 'EUR':
                return '€'
            default:
                return '$'
        }
    }

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
                        <Text size={48} weight="reg" color="gray-1">${props.profile.balance.toLocaleString()}</Text>
                    </div>
                </WidgetElement>
                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Revenue </Text>
                        <IconStyle id="revenueTooltip" className="ml-auto">info_outline</IconStyle>
                        <Tooltip target="revenueTooltip">The paywall revenue you have earned since the start of the current billing period</Tooltip>
                    </WidgetHeader>
                    <div className="flex flex-column minContentDash justify-center items-center mb1">
                        {
                            props.profile.revenue ? props.profile.revenue.map((r, i) => {
                                return <Text key={'revenue' + i} size={48} weight="reg" color="gray-1">{handleCurrencySymbol(r.currency) + r.total.toLocaleString()}</Text>

                            })
                            : <Text size={48} weight="reg" color="gray-1">$0</Text>
                        }
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}


import React from 'react'
import { IconGray1, classContainer, classItemHalfWidthContainer, WidgetHeader } from './DashboardStyles'
import { WidgetElement } from '../../components/Dashboard'
import { Text } from '../../components/Typography/Text';
import { numberFormatter } from '../../utils/utils';

interface PaywallDashboardProps {
    balance: number;
    revenue: number;
}

export const PaywallDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {rightSide: boolean; profile: PaywallDashboardProps }) => {
    var classTopContainer = "col lg-col-6 sm-col-12 "+(props.rightSide?"pl2" : "pr2");
    var balance = numberFormatter(props.profile.balance, 'comma');
    var revenue = numberFormatter(props.profile.revenue, 'comma');


    return (
        <section className={classTopContainer}>
            <div className="flex items-baseline mb1">
                <IconGray1 className="mr1 self-center">attach_money</IconGray1>
                <Text size={24} weight="reg" className="mt0 inline-block">
                    Paywall
                </Text>
            </div>

            <div className={classContainer}>
                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Balance </Text>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">${balance}</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Revenue </Text>
                        <IconGray1 className="ml-auto">error_outline</IconGray1>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">${revenue}</Text>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}


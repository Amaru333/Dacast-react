import React from 'react'
import { IconGray1, classContainer, classItemHalfWidthContainer, WidgetHeader } from './DashboardStyles'
import { WidgetElement } from '../../components/Dashboard'
import { Text } from '../../components/Typography/Text';

export const PaywallDashboard = (props: React.HTMLAttributes<HTMLDivElement> & {rightSide: boolean}) => {
    var classTopContainer = "col lg-col-6 sm-col-12 "+(props.rightSide?"pl2" : "pr2");
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
                        <Text size={48} weight="reg" color="gray-1">$3,567</Text>
                    </div>
                </WidgetElement>

                <WidgetElement className={classItemHalfWidthContainer}>
                    <WidgetHeader className="flex">
                        <Text size={16} weight="med" color="gray-3"> Revenue </Text>
                        <IconGray1 className="ml-auto">error_outline</IconGray1>
                    </WidgetHeader>
                    <div className="flex justify-center items-center mb1">
                        <Text size={48} weight="reg" color="gray-1">$400</Text>
                    </div>
                </WidgetElement>
            </div>
        </section>
    )
}


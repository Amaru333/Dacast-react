import React from 'react'
import { Card } from '../../components/Card/Card'

export const WidgetElement = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={props.className}>
            <Card className="dashboardCard">
                {props.children}
            </Card>
        </div>
    )
}
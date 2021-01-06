import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'

export interface EngagementAnalyticsProps {

}

export const EngagementAnalytics = (props: EngagementAnalyticsProps) => {



    React.useEffect(() => {

    }, [])

    return (
        <React.Fragment>
            <AnalyticsCard
                title="Engagement Duration"
            >
                <LineChart
                    title="Engagement Duration"
                    options={ {fill: true, curve: 0} }
                    lines={ [ {data: [89, 82, 71, 61, 53, 41], label: "Engagement", color: ThemeAnalyticsColors.blue} ] }
                    labels={["10/12/20", "10/13/20", "10/14/20", "10/15/20", "10/16/20", "10/17/20"]} />
            </AnalyticsCard>
        </React.Fragment>

    )
}
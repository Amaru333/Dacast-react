import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { TableAnalytics } from '../TableAnalytics'
import {fakeData, fakeColumns} from '../FakeData'
import { AudienceAnalyticsState } from '../../../redux-flow/store/Content/Analytics'

export interface AudienceAnalyticsProps {
    data: AudienceAnalyticsState
}

export const AudienceAnalytics = (props: AudienceAnalyticsProps) => {

    React.useEffect(() => {

    }, [])

    const returnTimeAnalytics = () => {
        return (
            <LineChart
                title="Audience by Time"
                options={{ fill: true, curve: 0, rightYAxes: false }}
                lines={[{ data: props.data.playsImpressionsByTime.plays, label: "Plays", color: ThemeAnalyticsColors.blue }, { data: props.data.playsImpressionsByTime.impressions, label: "Impressions", color: ThemeAnalyticsColors.yellow }]}
                labels={props.data.playsImpressionsByTime.labels} />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                type="vertical"
                title="Audience by device"
                dataSets={[{ data: props.data.playsImpressionsByDevice.plays, label: "Plays", color: ThemeAnalyticsColors.blue }, { data: props.data.playsImpressionsByDevice.impressions, label: "Impressions", color: ThemeAnalyticsColors.yellow }]}
                labels={props.data.playsImpressionsByDevice.labels} />
        )
    }

    const returnLocationAnalytics = () => {
        return (
            <LeafletMap
                markers={props.data.playsImpressionsByLocation}
                markerNameTranform={(element) => element.city + ": "+element.value+" Plays"} />
        )
    }

    return (
        <React.Fragment>
            <AnalyticsCard
                title="Plays & Impressions by"
                tabs={
                    {
                        "Time": { name: 'Time', content: returnTimeAnalytics() },
                        "Device": { name: 'Device', content: returnDeviceAnalytics() },
                        "Location": { name: 'Location', content: returnLocationAnalytics() },
                    }
                }
            />
            <TableAnalytics
                data={fakeData}
                header={fakeColumns}
            />
        </React.Fragment>

    )
}
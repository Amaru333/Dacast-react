import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import {HeaderAudienceDevice, HeaderAudienceLocation, HeaderAudienceTime} from '../TableHeaders'
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
                markers={props.data.playsImpressionsByLocation.data}
                markerNameTranform={(element) => element.city + ": "+element.value+" Plays"} />
        )
    }


    return (
        <React.Fragment>
            <AnalyticsCard
                title="Plays & Impressions by"
                showTable={true}
                tabs={
                    {
                        "Time": { name: 'Time', content: returnTimeAnalytics, table: {data: props.data.playsImpressionsByTime.table, header: HeaderAudienceTime} },
                        "Device": { name: 'Device', content: returnDeviceAnalytics, table: {data: props.data.playsImpressionsByDevice.table, header: HeaderAudienceDevice} },
                        "Location": { name: 'Location', content: returnLocationAnalytics, table: {data: props.data.playsImpressionsByLocation.table, header: HeaderAudienceLocation } },
                    }
                }
            />
        </React.Fragment>

    )
}
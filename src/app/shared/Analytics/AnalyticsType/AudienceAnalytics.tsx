import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { displayBytesForHumans } from '../../../../utils/formatUtils'
import ReactTable from "react-table";

export interface AudienceAnalyticsProps {

}

export const AudienceAnalytics = (props: AudienceAnalyticsProps) => {

    React.useEffect(() => {

    }, [])

    const returnTimeAnalytics = () => {
        return (
            <LineChart
                title="Plays and Impressions by Time"
                options={ {fill: true, curve: 0, isTime: true, rightYAxes: false} }
                lines={ [ {data: [45, 12, 19, 12 ,26, 12, 9, 12, 14, 24], label: "Plays", color: ThemeAnalyticsColors.blue}, {data: [56, 15, 25, 24, 42, 27, 18, 29, 19, 38], label: "Impressions", color: ThemeAnalyticsColors.red} ] }
                labels={[1603869329000, 1603872929000, 1603876529000, 1603880129000, 1603887352000, 1603890929000, 1603894529000, 1603898129000, 1603901789000, 1603905329000]} />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                type="vertical"
                title="Plays & Impressions by device"
                dataSets={ [ {data: [26, 12, 9, 12, 14, 24], label: "Plays", color: ThemeAnalyticsColors.blue }, {data: [42, 27, 18, 29, 19, 38], label: "Impressions", color: ThemeAnalyticsColors.red } ] }
                labels={["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"]} />
        )
    }
    
    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers= {[
                    {  city: 'New York City', position: { latitude:  40.7808, longitude: -73.9772}, consumedMB: 9392 },
                    {  city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167}, consumedMB: 7602 },
                    {  city: 'San Francisco', position: { latitude: 37.6216, longitude:  -122.3929}, consumedMB: 12349 },
                    {  city: 'Londres', position: { latitude: 51.5073509, longitude:  -0.1277583}, consumedMB: 5402 } 
                ]} 
                markerNameTranform={ (element) => element.city+": "+displayBytesForHumans(element.consumedMB) } />
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
        </React.Fragment>

    )
}
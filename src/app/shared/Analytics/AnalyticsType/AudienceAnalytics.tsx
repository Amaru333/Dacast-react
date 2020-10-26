import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { displayBytesForHumans } from '../../../../utils/formatUtils'

export interface AudienceAnalyticsProps {

}

export const AudienceAnalytics = (props: AudienceAnalyticsProps) => {



    React.useEffect(() => {

    }, [])

    const returnTimeAnalytics = () => {
        return (
            <LineChart
                title="Plays and Impressions by Time"
                options={ {fill: true, curve: 0} }
                lines={ [ {data: [26, 12, 9, 12, 14, 24], label: "Plays", color: ThemeAnalyticsColors.blue}, {data: [42, 27, 18, 29, 19, 38], label: "Impressions", color: ThemeAnalyticsColors.red} ] }
                labels={["10/12/20", "10/13/20", "10/14/20", "10/15/20", "10/16/20", "10/17/20"]} />
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
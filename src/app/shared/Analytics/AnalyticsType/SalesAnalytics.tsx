import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { displayBytesForHumans } from '../../../../utils/formatUtils'
import { fakeColumns, fakeData } from '../FakeData'
import { TableAnalytics } from '../TableAnalytics'

export interface SalesAnalyticsProps {

}

export const SalesAnalytics = (props: SalesAnalyticsProps) => {



    React.useEffect(() => {

    }, [])

    const returnTimeAnalytics = () => {
        return (
            <BarChart
                id="uniqueStuff"
                title="Sales and Revenue by Time"
                options={ {rightYAxes: true} }
                type="vertical"
                dataSets={ [ 
                        {data: [45, 12, 19, 12 ,26, 12, 9, 12, 14, 24], label: "Sales", color: ThemeAnalyticsColors.blue, type: 'bar' }, 
                        {data: [56, 15, 25, 24, 42, 27, 18, 29, 19, 38], label: "Revenue", color: ThemeAnalyticsColors.red, type: "line", yAxisPosition: "right" } 
                ] }
                labels={["10/12/20", "10/13/20", "10/14/20", "10/15/20", "10/16/20", "10/17/20", "10/18/20", "10/19/20", "10/2O/20", "10/21/20"]} />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                id="uniqueStuff1"
                type="vertical"
                title="Sales and Revenue by Device"
                dataSets={ [ {data: [26, 12, 9, 12, 14, 24], label: "Sales", color: ThemeAnalyticsColors.blue }, {data: [42, 27, 18, 29, 19, 38], label: "Revenue", color: ThemeAnalyticsColors.red, type: "line" } ] }
                labels={["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"]} />
        )
    }
    
    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers= {[
                    {  city: 'New York City', position: { latitude:  40.7808, longitude: -73.9772}, value: 9392 },
                    {  city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167}, value: 7602 },
                    {  city: 'San Francisco', position: { latitude: 37.6216, longitude:  -122.3929}, value: 12349 },
                    {  city: 'Londres', position: { latitude: 51.5073509, longitude:  -0.1277583}, value: 5402 } 
                ]} 
                markerNameTranform={ (element) => element.city+": "+displayBytesForHumans(element.value) } />
        )
    }

    return (
        <React.Fragment>
            <AnalyticsCard
                title="Slaes & Revenue by"
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
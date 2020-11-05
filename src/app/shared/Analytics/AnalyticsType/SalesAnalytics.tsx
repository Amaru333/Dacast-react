import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { displayBytesForHumans } from '../../../../utils/formatUtils'
import { SalesAnalyticsState } from '../../../redux-flow/store/Content/Analytics'
import { fakeColumns, fakeData } from '../FakeData'
import { TableAnalytics } from '../TableAnalytics'

export interface SalesAnalyticsProps {
    data: SalesAnalyticsState
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
                        {data: props.data.salesRevenuesByTime.sales, label: "Sales", color: ThemeAnalyticsColors.blue, type: 'bar' }, 
                        {data: props.data.salesRevenuesByTime.revenues, label: "Revenues", color: ThemeAnalyticsColors.red, type: "line", yAxisPosition: "right" } 
                ] }
                labels={props.data.salesRevenuesByTime.labels} />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                id="uniqueStuff1"
                type="vertical"
                title="Sales and Revenue by Device"
                dataSets={ [ {data: props.data.salesRevenuesByDevice.sales, label: "Sales", color: ThemeAnalyticsColors.blue }, {data: props.data.salesRevenuesByDevice.revenues, label: "Revenue", color: ThemeAnalyticsColors.red, type: "line" } ] }
                labels={props.data.salesRevenuesByDevice.labels} />
        )
    }
    
    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers= {props.data.salesRevenuesByLocation} 
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
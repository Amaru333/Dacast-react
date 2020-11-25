import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { displayBytesForHumans } from '../../../../utils/formatUtils'
import { SalesAnalyticsState } from '../../../redux-flow/store/Content/Analytics'
import { HeaderSalesDevice, HeaderSalesLocation, HeaderSalesTime } from '../TableHeaders'

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
                unitRight="$"
                dataSets={ [
                        {data: props.data.salesRevenuesByTime.sales, label: "Sales", color: ThemeAnalyticsColors.blue, type: 'bar' }, 
                        {data: props.data.salesRevenuesByTime.revenues, label: "Revenue", color: ThemeAnalyticsColors.yellow, type: "line", yAxisPosition: "right" } 
                ] }
                labels={props.data.salesRevenuesByTime.labels} />
        )
    }

    // const returnDeviceAnalytics = () => {
    //     return (
    //         <BarChart
    //             id="uniqueStuff1"
    //             type="vertical"
    //             title="Sales and Revenue by Device"
    //             dataSets={ [ {data: props.data.salesRevenuesByDevice.sales, label: "Sales", color: ThemeAnalyticsColors.blue }, {data: props.data.salesRevenuesByDevice.revenues, label: "Revenue", color: ThemeAnalyticsColors.yellow, type: "line", yAxisPosition: "right" } ] }
    //             labels={props.data.salesRevenuesByDevice.labels} />
    //     )
    // }
    
    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers={props.data.salesRevenuesByLocation.data} 
                markerNameTranform={ (element) => element.city+": $"+element.value } />
        )
    }

    return (
        <React.Fragment>
            <AnalyticsCard
                title="Sales & Revenue by"
                showTable={true}
                tabs={
                    {
                        "Time": { name: 'Time', content: returnTimeAnalytics, table: {data: props.data.salesRevenuesByTime.table, header: HeaderSalesTime} },
                        // "Device": { name: 'Device', content: returnDeviceAnalytics(), table: {data: props.data.salesRevenuesByDevice.table, header: HeaderSalesDevice} },
                        //"Location": { name: 'Location', content: returnLocationAnalytics, table: {data: props.data.salesRevenuesByLocation.table, header: HeaderSalesLocation} },
                    }
                }
            />
        </React.Fragment>

    )
}
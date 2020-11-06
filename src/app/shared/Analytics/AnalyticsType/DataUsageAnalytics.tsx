import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { displayBytesForHumans } from '../../../../utils/formatUtils'
import {HeaderDataTime, HeaderDataDevice, HeaderDataLocation} from '../TableHeaders'
import { DataAnalyticsState } from '../../../redux-flow/store/Content/Analytics'

export interface DataUsageAnalyticsProps {
    data: DataAnalyticsState
}

export const DataUsageAnalytics = (props: DataUsageAnalyticsProps) => {

    React.useEffect(() => {

    }, [])

    const returnTimeAnalytics = () => {
        return (
            <BarChart
                title="Data Usage by Time"
                dataSets={ [ {data: props.data.dataByTime.data, label: "Data Usage", type:"bar", color: ThemeAnalyticsColors.blue}] }
                labels={props.data.dataByTime.labels}
                unit="GBs" />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                type="vertical"
                title="Data Usage by device"
                dataSets={ [ {data: props.data.dataByDevice.data, label: "Data Usage", color: ThemeAnalyticsColors.blue } ] }
                labels={props.data.dataByDevice.labels} />
        )
    }
    
    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers={props.data.dataByLocation.data} 
                markerNameTranform={ (element) => element.city+": "+displayBytesForHumans(element.value) } />
        )
    }

    return (
        <React.Fragment>
            <AnalyticsCard
                title="Data Usage by"
                showTable={true}
                tabs={
                    {
                        "Time": { name: 'Time', content: returnTimeAnalytics(), table: {data: props.data.dataByTime.table, header: HeaderDataTime} },
                        "Device": { name: 'Device', content: returnDeviceAnalytics(), table: {data: props.data.dataByDevice.table, header: HeaderDataDevice} },
                        "Location": { name: 'Location', content: returnLocationAnalytics(), table: {data: props.data.dataByLocation.table, header: HeaderDataLocation}  },
                    }
                }
            />
        </React.Fragment>

    )
}
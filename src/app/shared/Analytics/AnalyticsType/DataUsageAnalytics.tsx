import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { displayBytesForHumans } from '../../../../utils/formatUtils'
import ReactTable from "react-table";
import { TableAnalytics } from '../TableAnalytics'
import {fakeData, fakeColumns} from '../FakeData'
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
                markers={props.data.dataByLocation} 
                markerNameTranform={ (element) => element.city+": "+displayBytesForHumans(element.value) } />
        )
    }

    return (
        <React.Fragment>
            <AnalyticsCard
                title="Data Usage by"
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
import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { displayBytesForHumans } from '../../../../utils/formatUtils'
import {HeaderDataTime, HeaderDataDevice, HeaderDataLocation} from '../TableHeaders'
import { WatchAnalyticsState } from '../../../redux-flow/store/Content/Analytics'

export interface WatchDurationAnalyticsProps {
    data: WatchAnalyticsState
}

export const WatchDurationAnalytics = (props: WatchDurationAnalyticsProps) => {

    React.useEffect(() => {

    }, [])

    const returnTimeAnalytics = () => {
        return (
            <BarChart
                title="Watch Duration by Time"
                dataSets={ [ {data: props.data.watchByTime.data, label: "Watch Duration", type:"bar", color: ThemeAnalyticsColors.blue}] }
                labels={props.data.watchByTime.labels}
                unit="s" />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                type="vertical"
                title="Watch Duration by device"
                dataSets={ [ {data: props.data.watchByDevice.data, label: "Watch Duration", color: ThemeAnalyticsColors.blue } ] }
                labels={props.data.watchByDevice.labels} />
        )
    }
    
    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers={props.data.watchByLocation.data} 
                markerNameTranform={ (element) => element.city+": "+displayBytesForHumans(element.value) } />
        )
    }

    return (
        <React.Fragment>
            <AnalyticsCard
                title="Watch Duration by"
                showTable={true}
                tabs={
                    {
                        "Time": { name: 'Time', content: returnTimeAnalytics(), table: {data: props.data.watchByTime.table, header: HeaderDataTime} },
                        "Device": { name: 'Device', content: returnDeviceAnalytics(), table: {data: props.data.watchByDevice.table, header: HeaderDataDevice} },
                        "Location": { name: 'Location', content: returnLocationAnalytics(), table: {data: props.data.watchByLocation.table, header: HeaderDataLocation}  },
                    }
                }
            />
        </React.Fragment>

    )
}
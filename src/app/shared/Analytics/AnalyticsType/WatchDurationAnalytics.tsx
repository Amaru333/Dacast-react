import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { formatTimeValue } from '../../../../utils/formatUtils'
import {HeaderWatchTime, HeaderWatchDevice, HeaderWatchLocation} from '../TableHeaders'
import { WatchAnalyticsState } from '../../../redux-flow/store/Content/Analytics'

export interface WatchDurationAnalyticsProps {
    data: WatchAnalyticsState
    loading: boolean
    showTable?: boolean
}

export const WatchDurationAnalytics = (props: WatchDurationAnalyticsProps) => {
    const watchDurationPerTime = formatTimeValue(props.data.watchByTime.data)
    const watchDurationPerDevice = formatTimeValue(props.data.watchByDevice.data)
    const watchDurationPerLocationData = formatTimeValue(props.data.watchByLocation.table.map(item => item.data))
    
    const handleDynamiceHeader = (header: {Header: string, accessor: string}[], metric: string) => {
        return header.map(h => {
            if(h.Header.indexOf('Engagement') !== -1) {
                return {
                    Header: h.Header + ' (' + metric + ')',
                    accessor: h.accessor
                }
            }
            return h
        })
    } 

    const returnTimeAnalytics = () => {
        return (
            <BarChart
                title="Engagement by Time"
                dataSets={ [ {data: watchDurationPerTime.values, label: "Engagement (" + watchDurationPerTime.unitLong + ')', type:"bar", color: ThemeAnalyticsColors.blue}] }
                labels={props.data.watchByTime.labels}
                unit={watchDurationPerTime.unitShort} />
        )
    }

    const returnDeviceAnalytics = () => {
        return (
            <BarChart
                title="Engagement by Device"
                dataSets={ [ {data: watchDurationPerDevice.values, label: "Engagement (device)", color: ThemeAnalyticsColors.blue } ] }
                labels={props.data.watchByDevice.labels} 
                unit={watchDurationPerDevice.unitShort}/>
        )
    }
    const returnLocationAnalytics = () => {
        return (
            <LeafletMap 
                markers={props.data.watchByLocation.data.map((el, i) => {return {...el, value: [watchDurationPerLocationData.values[i]]}})} 
                markerNameTranform={ (element) => element.city+": "+(element.value)+" "+watchDurationPerLocationData.unitShort } />
        )
    }

    return (
        <React.Fragment>
            <AnalyticsCard
                title="Engagement by"
                showTable={props.showTable === false ? props.showTable : true}
                csvType='Engagement'
                loading={props.loading}
                tabs={
                    {
                        "Time": { name: 'Time', content: returnTimeAnalytics, table: {data: props.data.watchByTime.table.map((el, i) => {return {data: watchDurationPerTime.values[i], label: el.label}}), header: handleDynamiceHeader(HeaderWatchTime, watchDurationPerTime.unitShort)} },
                        "Device": { name: 'Device', content: returnDeviceAnalytics, table: {data: props.data.watchByDevice.table.map((el, i) => {return {data: watchDurationPerDevice.values[i], label: el.label}}), header: handleDynamiceHeader(HeaderWatchDevice, watchDurationPerDevice.unitShort)}},
                        "Location": { name: 'Location', content: returnLocationAnalytics, table: {data: props.data.watchByLocation.table.map((el, i) => {return {data: watchDurationPerLocationData.values[i], label: el.label}}), header: handleDynamiceHeader(HeaderWatchLocation, watchDurationPerLocationData.unitShort)}  },
                    }
                }
            />
        </React.Fragment>

    )
} 

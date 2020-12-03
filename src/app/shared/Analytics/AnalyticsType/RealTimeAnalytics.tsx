import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { RealTimeAnalyticsState } from '../../../redux-flow/store/Content/Analytics'
import { HalfSmFullXs } from '../AnalyticsCommun'

export interface RealTimeAnalyticsProps {
    data: RealTimeAnalyticsState
}

export const RealTimeAnalytics = (props: RealTimeAnalyticsProps) => {

    return (
        <div className="clearfix mxn2">
            <div className={HalfSmFullXs}>
                <AnalyticsCard
                    title="Concurrent Viewers"
                >
                    <LineChart
                        title="Concurrent Viewers"
                        options={{ fill: false, curve: 0 }}
                        lines={[{ data: props.data.viewersByTime.data, label: "Viewers", color: ThemeAnalyticsColors.blue }]}
                        labels={props.data.viewersByTime.labels}
                        step={1} />
                </AnalyticsCard>
            </div>
            <div className={HalfSmFullXs}>
                <AnalyticsCard
                    title="Plays"
                >
                    <LineChart
                        title="Plays"
                        options={{ fill: false, curve: 0 }}
                        lines={[{ data: props.data.playsByTime.data, label: "Plays", color: ThemeAnalyticsColors.blue }]}
                        labels={props.data.playsByTime.labels} 
                        step={1}/>
                </AnalyticsCard>
            </div>

            <div className={HalfSmFullXs}>

                <AnalyticsCard
                    title="Play Duration"
                >
                    <BarChart
                        type="vertical"
                        title="Play Duration by device"
                        dataSets={[{ data: props.data.watchByDevice.data, label: "Time (seconds)", color: ThemeAnalyticsColors.blue }]}
                        labels={props.data.watchByDevice.labels} 
                        />
                </AnalyticsCard>
            </div>
            <div className={HalfSmFullXs}>

                <AnalyticsCard
                    title="Plays by Location"
                >
                    <LeafletMap
                        markers={props.data.playsByLocation.data}
                        markerNameTranform={(element) => element.city + ": " + element.value + " Plays"} />
                </AnalyticsCard>
            </div>
        </div>

    )
}
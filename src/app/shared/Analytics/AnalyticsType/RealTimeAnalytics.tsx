import React from 'react'
import { AnalyticsCard } from '../../../../components/Analytics/AnalyticsCard/AnalyticsCard'
import { BarChart } from '../../../../components/Analytics/BarChart'
import LeafletMap from '../../../../components/Analytics/LeafletMap'
import { LineChart } from '../../../../components/Analytics/LineChart'
import { ThemeAnalyticsColors } from '../../../../styled/themes/dacast-theme'
import { HalfSmFullXs } from '../AnalyticsCommun'

export interface RealTimeAnalyticsProps {
        
}

export const RealTimeAnalytics = (props: RealTimeAnalyticsProps) => {



    React.useEffect(() => {

    }, [])

    return (
        <div className="clearfix mxn2">
            <div className={HalfSmFullXs}>
                <AnalyticsCard
                    title="Concurrent Viewers"

                >
                    <LineChart
                        title="Concurrent Viewers"
                        options={{ fill: false, curve: 0, isTime: true }}
                        lines={[{ data: [89, 82, 71, 61, 53, 41], label: "Viewers", color: ThemeAnalyticsColors.yellow }]}
                        labels={[1603869329000, 1603872929000, 1603876529000, 1603880129000, 1603887352000, 1603890929000]} />

                </AnalyticsCard>
            </div>
            <div className={HalfSmFullXs}>
                <AnalyticsCard
                    title="Plays"
                >
                    <LineChart
                        title="Plays"
                        options={{ fill: false, curve: 0, isTime: true }}
                        lines={[{ data: [13, 22, 32, 43, 91, 59], label: "Plays", color: ThemeAnalyticsColors.yellow }]}
                        labels={[1603869329000, 1603872929000, 1603876529000, 1603880129000, 1603887352000, 1603890929000]} />

                </AnalyticsCard>
            </div>

            <div className={HalfSmFullXs}>

                <AnalyticsCard
                    title="Play Duration"
                >
                    <BarChart
                        type="vertical"
                        title="Watch Duration by device"
                        dataSets={[{ data: [26, 12, 9, 12, 14, 24], label: "Plays", color: ThemeAnalyticsColors.blue }]}
                        labels={["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"]} />
                </AnalyticsCard>
            </div>
            <div className={HalfSmFullXs}>

                <AnalyticsCard
                    title="Plays by Location"
                >
                    <LeafletMap
                        markers={[
                            { city: 'New York City', position: { latitude: 40.7808, longitude: -73.9772 }, value: 9392 },
                            { city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167 }, value: 7602 },
                            { city: 'San Francisco', position: { latitude: 37.6216, longitude: -122.3929 }, value: 12349 },
                            { city: 'Londres', position: { latitude: 51.5073509, longitude: -0.1277583 }, value: 5402 }
                        ]}
                        markerNameTranform={(element) => element.city + ": " + element.value + "Plays"} />
                </AnalyticsCard>
            </div>
        </div>

    )
}
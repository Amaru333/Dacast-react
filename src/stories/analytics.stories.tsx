import React from 'react';
import { storiesOf } from '@storybook/react'
import { HalfSmFullXs, renderMap, FailedCardAnalytics } from '../app/shared/Analytics/AnalyticsCommun';
import { DoughnutChart } from '../components/Analytics/DoughnutChart/DoughnutChart';
import LeafletMap from '../components/Analytics/LeafletMap';
import { displayBytesForHumans } from '../utils/formatUtils';
import { LineChart } from '../components/Analytics/LineChart';
import { PieChart } from '../components/Analytics/PieChart';
import { BarChart } from '../components/Analytics/BarChart';
import { ThemeAnalyticsColors } from '../styled/themes/dacast-theme';
import { AnalyticsCard } from '../components/Analytics/AnalyticsCard/AnalyticsCard';

storiesOf('Analytics', module)
    // .add('General Dashboard', () => (
    //     <React.Fragment>
    //         <div className="p2">

    //         <WidgetElement className={"col lg-col-6 md-col-6 sm-col-12 col-12 px2 mb3"} >
    //             <WidgetHeader className="flex">
    //                 <Text size={16} weight="med" color="gray-3"> Play Rate vs Impressions Exemple</Text>
    //                 <IconStyle id="playrateVsImpressionsTooltip" className="ml-auto">info_outline</IconStyle>
    //                 <Tooltip target="playrateVsImpressionsTooltip">The proportion of people who click play</Tooltip>
    //             </WidgetHeader>
    //             <div className="flex minContentDash justify-center items-center mb1">
    //                 <DoughnutChart value={75} className="mr2" />
    //             </div>
    //         </WidgetElement>
    //         <WidgetElement className={"col lg-col-6 md-col-6 sm-col-12 col-12 px2 mb3"}>
    //             <WidgetHeader className="flex">
    //                 <Text size={16} weight="med" color="gray-3"> Storage Remaining Exemple</Text>
    //             </WidgetHeader>
    //             <div className="flex flex-wrap items-baseline mb1">
    //                 <Text size={32} weight="reg" color="gray-1">75GB</Text><Text size={16} weight="reg" color="gray-4" >/100GB</Text><Text className="ml-auto" size={20} weight="med" color="gray-1" >75%</Text>
    //             </div>
    //             <ProgressBarDashboard percentage={75} widget="storage" />
    //         </WidgetElement>
    //         <WidgetElement className={"col lg-col-6 md-col-6 sm-col-12 col-12 px2 mb3"} >
    //                 <Text size={16} weight="med" color="gray-3">Fail Loading Analytics Exemple</Text>
    //                 <FailedCardAnalytics />
    //         </WidgetElement>

    //         </div>
    //     </React.Fragment>
    // ))
    .add('Analytics Section', () => (
        <React.Fragment>
            <div className="clearfix mxn1 mb2 p2">
                <div className={HalfSmFullXs}>
                    <AnalyticsCard
                        dataName="exampleAnalyticsBarchart"
                        data={[]}
                        infoText="An example of Bar chart"
                        title="Bar Chart">
                        <BarChart
                            type="vertical"
                            title="Plays & Impressions by device"
                            dataSets={ [ {data: [26, 12, 9, 12, 14, 24], label: "Plays", color: ThemeAnalyticsColors.blue }, {data: [42, 27, 18, 29, 19, 38], label: "Impressions", color: ThemeAnalyticsColors.red } ] }
                            labels={["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"]} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard
                        dataName="exampleAnalyticsDoughnutChart"
                        data={[]}
                        infoText="An example of Doughnut chart"
                        title="Doughnut Chart">
                        <PieChart
                            type="doughnut"
                            title="OS"
                            dataLabel="Viewers"
                            data={[12, 44, 13, 24]}
                            labels={["MacOs", 'Windows', 'Ubuntu', 'Android']} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard
                        dataName="exampleAnalyticsDoughnutChart"
                        data={[]}
                        infoText="An example of mixed chart"
                        title="Mixed Chart">
                        <BarChart
                            type="vertical"
                            title="Plays & Impressions by device"
                            dataSets={ [ {data: [26, 12, 9, 12, 14, 24], label: "Sales", color: ThemeAnalyticsColors.red, type: 'line' }, {data: [42, 27, 18, 29, 19, 38], label: "Revenue", color: ThemeAnalyticsColors.blue } ] }
                            labels={["Firefox on Windows", "Chrome on Mac", "Safari on Mac", "Opera on Windows", "Chrome on Linux", "Edge on Windows"]} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard
                        dataName="exampleAnalyticsDoubleLineChart"
                        data={[]}
                        infoText="An example of Double Line chart"
                        title="Line Chart">
                        <LineChart
                            title="Plays and Impressions by Time"
                            options={ {fill: true, curve: 0} }
                            lines={ [ {data: [26, 12, 9, 12, 14, 24], label: "Plays", color: ThemeAnalyticsColors.blue}, {data: [42, 27, 18, 29, 19, 38], label: "Impressions", color: ThemeAnalyticsColors.red} ] }
                            labels={["10/12/20", "10/13/20", "10/14/20", "10/15/20", "10/16/20", "10/17/20"]} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard
                        dataName="exampleAnalyticsMap"
                        data={[]}
                        infoText="An example of map analytics"
                        title="World Map Analytics">
                        
                        <LeafletMap 
                        markers= {[
                            {  city: 'New York City', position: { latitude:  40.7808, longitude: -73.9772}, consumedMB: 9392 },
                            {  city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167}, consumedMB: 7602 },
                            {  city: 'San Francisco', position: { latitude: 37.6216, longitude:  -122.3929}, consumedMB: 12349 },
                            {  city: 'Londres', position: { latitude: 51.5073509, longitude:  -0.1277583}, consumedMB: 5402 } 
                        ]} 
                        markerNameTranform={ (element) => element.city+": "+displayBytesForHumans(element.consumedMB) } />
                    </AnalyticsCard>
                </div>
            </div>
        </React.Fragment >
    ))
import React from 'react';
import { storiesOf } from '@storybook/react'
import { Avatar } from '../components/Avatar/Avatar';
import { AnalyticsCard, HalfSmFullXs, renderMap, FailedCardAnalytics } from '../app/pages/Analytics/AnalyticsCommun';
import { DoughnutChart } from '../components/Analytics/DoughnutChart/DoughnutChart';
import { BarChart } from '../components/Analytics/BarChart';
import { CheeseChart } from '../components/Analytics/CheeseChart';
import DoubleLineChart from '../components/Analytics/DoubleLineChart';
import { ProgressBarDashboard } from '../app/containers/Dashboard/GeneralDashboard';
import { WidgetElement } from '../app/containers/Dashboard/WidgetElement';
import { WidgetHeader } from '../app/containers/Dashboard/DashboardStyles';
import { Text } from '../components/Typography/Text';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { IconStyle } from '../shared/Common/Icon';

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
                            datasetName="Seconds"
                            beginAtZero={true}
                            data={[12, 34, 120, 123, 12, 34]}
                            yAxesName="sec"
                            labels={["8:05", "8:06", "8:07", "8:08", "8:09", "8:10"]} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard
                        dataName="exampleAnalyticsCheeseChart"
                        data={[]}
                        infoText="An example of Cheese chart"
                        title="Cheese Chart">
                        <CheeseChart
                            displayBytesFromGB={true}
                            data={[12, 44, 13, 24]}
                            labels={["MacOs", 'Windows', 'Ubuntu', 'Android']} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard
                        dataName="exampleAnalyticsDoubleLineChart"
                        data={[]}
                        infoText="An example of Double Line chart"
                        title="Double Line Chart">
                        <DoubleLineChart
                            datasetName="Hits"
                            noDecimals={false}
                            beginAtZero={true}
                            yAxesName="Plays and viewers"
                            datasetName1="plays"
                            datasetName2="viewers"
                            data1={[12, 34, 45, 13, 51, 3]}
                            data2={[9, 23, 24, 25, 42, 18]}
                            labels={["10/12/20", "10/13/20", "10/14/20", "10/15/20", "10/16/20", "10/17/20"]} />
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard
                        dataName="exampleAnalyticsMap"
                        data={[]}
                        infoText="An example of map analytics"
                        title="World Map Analytics">
                        {renderMap([
                            {  city: 'New York City', position: { latitude:  40.7808, longitude: -73.9772}, consumedMB: 9392 },
                            {  city: 'Annecy', position: { latitude: 45.9, longitude: 6.1167}, consumedMB: 7602 },
                            {  city: 'San Francisco', position: { latitude: 37.6216, longitude:  -122.3929}, consumedMB: 12349 },
                            {  city: 'Londres', position: { latitude: 51.5073509, longitude:  -0.1277583}, consumedMB: 5402 } 
                        ], 'exampleMapStory', true)}
                    </AnalyticsCard>
                </div>
            </div>
        </React.Fragment >
    ))
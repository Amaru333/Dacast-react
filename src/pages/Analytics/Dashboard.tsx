import React from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card/Card';
import { Text } from '../../components/Typography/Text';
import { Icon } from '@material-ui/core';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { Datepicker } from '../../components/FormsComponents/Datepicker/DateRangePicker';
import { BarChart } from '../../components/Analytics/BarChart';
import { tsToLocaleDate, displayBytesForHumans, mapMarkerNameTranformBytesFromGB } from '../../utils/utils';
import DoubleLineChart from '../../components/Analytics/DoubleLineChart';
import { CheeseChart } from '../../components/Analytics/CheeseChart';
import ReactTable from "react-table";
import LeafletMap from '../../components/Analytics/LeafletMap';

interface DashboardAnalyticsProps {

}

export const DashboardAnalytics = (props: DashboardAnalyticsProps) => {

    //First Chart
    var data = [38472, 38472, 38722, 40342, 38472, 12334];

    var labels = [1578528000000, 1578528000000, 1578528000000, 1578528000000, 1578528000000, 1578528000000];
    var labelsFormate = labels.map(number => tsToLocaleDate(number))

    //Second Chart
    var data1 = [12, 45, 78, 12, 35, 78];
    var data2 = [45, 67, 123, 34, 56, 98];

    //Third chart
    var labelsDevice = ["iphone", 'pc', 'whatever'];
    var dataCheese = [9876, 2983, 921];

    //Table
    var dataTable = [{ contentId: 9876, watchtime: 2934, viewercount: 921, revenueUSD: 987, revenueEUR: 821 }];

    //Map
    var mapData = [{ "city": "San Francisco (California)", "position": { "latitude": 37.7484, "longitude": -122.4156 }, "consumedMB": 36.8285 }, { "city": "Annecy (Auvergne-Rhone-Alpes)", "position": { "latitude": 45.9, "longitude": 6.1167 }, "consumedMB": 2.767 }, { "city": "Hampstead (England)", "position": { "latitude": 51.5407, "longitude": -0.1964 }, "consumedMB": 0 }, { "city": "Lille (Hauts-de-France)", "position": { "latitude": 50.633, "longitude": 3.0586 }, "consumedMB": 83.9529 }, { "city": "San Carlos (California)", "position": { "latitude": 37.498, "longitude": -122.2672 }, "consumedMB": 17.2149 }, { "city": "Pacy-sur-Eure (Normandy)", "position": { "latitude": 49.0167, "longitude": 1.3833 }, "consumedMB": 0 }, { "city": "Paris (Île-de-France)", "position": { "latitude": 48.9333, "longitude": 2.3667 }, "consumedMB": 0 }]

    const COLUMNS_TOP_CONTENT = [
        {
            Header: 'Content',
            accessor: 'contentId'
        },
        {
            Header: 'Watch Time (sec)',
            accessor: 'watchtime'
        },
        {
            Header: 'Number of views',
            accessor: 'viewercount'
        },
        {
            Header: 'Revenue (USD)',
            accessor: 'revenueUSD'
        },
        {
            Header: 'Revenue (EUR)',
            accessor: 'revenueEUR'
        }
    ]

    const renderMap = (dataRepo: any) => {
        let mapMin: any = Math.min(...dataRepo.map(m => m.consumedMB));
        if (isFinite(mapMin)) {
            mapMin = displayBytesForHumans(mapMin, true);
        } else {
            mapMin = 'No Data';
        }
        let mapMax: any = Math.max(...dataRepo.map(m => m.consumedMB));
        if (isFinite(mapMax)) {
            mapMax = displayBytesForHumans(mapMax, true);
        } else {
            mapMax = 'No Data';
        }

        return (
            <div>
                <LeafletMap
                    height="400px"
                    markerNameTranform={mapMarkerNameTranformBytesFromGB}
                    markers={dataRepo} />
                <div className="flex mt2 justify-center">
                    <a className="mr2">{mapMin}</a>
                    <div style={{ backgroundColor: '#93d5ed', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#45a5f5', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#4285f4', height: '20px', width: '30px' }}></div>
                    <div style={{ backgroundColor: '#2f5ec4', height: '20px', width: '30px' }}></div>
                    <a className="ml2">{mapMax}</a>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="col col-12 mb25">
                <Datepicker className="col-3 right" />
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-4 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption Per Time">
                        <BarChart
                            datasetName="GBytes"
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={data}
                            yAxesName="GB"
                            labels={labelsFormate} />
                    </AnalyticsCard>
                </div>
                <div className="col col-4 px1">
                    <AnalyticsCard  infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Plays and Viewers per Time">
                        <DoubleLineChart
                            datasetName="Hits"
                            noDecimals={false}
                            beginAtZero={true}
                            yAxesName="Plays and viewers"
                            datasetName1="plays"
                            datasetName2="viewers"
                            data1={data1}
                            data2={data2}
                            labels={labelsFormate} />
                    </AnalyticsCard>
                </div>
                <div className="col col-4 px1">
                    <AnalyticsCard  infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption per Device">
                        <CheeseChart
                            displayBytesFromGB={true}
                            data={dataCheese}
                            labels={labelsDevice} />
                    </AnalyticsCard>
                </div>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-6 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption per Device">
                        <ReactTable
                            data={dataTable}
                            columns={COLUMNS_TOP_CONTENT}
                            pageSizeOptions={[5, 10, 20, 25]}
                            defaultPageSize={10} />
                    </AnalyticsCard>
                </div>
                <div className="col col-6 px1">
                    <AnalyticsCard  infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption per Location">
                        {renderMap(mapData)}
                    </AnalyticsCard>
                </div>
                
            </div>

        </React.Fragment>
    )
}

export const AnalyticsCard = (props: React.HTMLAttributes<HTMLDivElement> & { infoText: string; title: string }) => {

    return (
        <AnalyticsCardStyle className={props.className}>
            <AnalyticsCardHeader>
                <Text size={16} weight="med" color="gray-1">{props.title}</Text>
                <div>
                    <Icon id={"tooltip" + props.id}>info_outlined</Icon>
                    <Tooltip target={"tooltip" + props.id}>{props.infoText}</Tooltip>
                </div>
            </AnalyticsCardHeader>
            {props.children}
        </AnalyticsCardStyle>
    )
}

export const AnalyticsCardStyle = styled(Card)<{}>`
    padding: 16px !important;
    min-height: 273px;
`


export const AnalyticsCardHeader = styled.div<{}>`
    display: flex;
    justify-content: space-between;
`
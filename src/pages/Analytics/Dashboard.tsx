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
import { AnalyticsDashboardInfos } from '../../redux-flow/store/Analytics/Dashboard';

export const DashboardAnalyticsPage = (props: AnalyticsDashboardInfos) => {
    console.log(props);

    //Map header accesseur match data
    const COLUMNS_TOP_CONTENT = [   
        {
            Header: 'Content',
            accessor: 'content'
        },
        {
            Header: 'Watch Time (sec)',
            accessor: 'watchTime'
        },
        {
            Header: 'Number of views',
            accessor: 'views'
        },
        {
            Header: 'Revenue (USD)',
            accessor: 'revenueUsd'
        },
        {
            Header: 'Revenue (EUR)',
            accessor: 'revenueEur'
        }
    ]

    const labelsFormate = (labels: number[]) => {return labels.map(number => tsToLocaleDate(number))};

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
                    markers={props.consumptionPerLocation.data} />
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
                            data={props.consumptionPerTime.data}
                            yAxesName="GB"
                            labels={labelsFormate(props.consumptionPerTime.time)} />
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
                            data1={props.playsViewersPerTime.plays.data}
                            data2={props.playsViewersPerTime.viewers.data}
                            labels={labelsFormate(props.playsViewersPerTime.plays.time)} />
                    </AnalyticsCard>
                </div>
                <div className="col col-4 px1">
                    <AnalyticsCard  infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption per Device">
                        <CheeseChart
                            displayBytesFromGB={true}
                            data={props.consumptionPerDevice.data}
                            labels={props.consumptionPerDevice.labels} />
                    </AnalyticsCard>
                </div>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-6 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption per Device">
                        <ReactTable
                            data={props.topContents.data}
                            columns={COLUMNS_TOP_CONTENT}
                            pageSizeOptions={[5, 10, 20, 25]}
                            defaultPageSize={10} />
                    </AnalyticsCard>
                </div>
                <div className="col col-6 px1">
                    <AnalyticsCard  infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption per Location">
                        {renderMap(props.consumptionPerLocation.data)}
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
                <Text className='mb2' size={16} weight="med" color="gray-1">{props.title}</Text>
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
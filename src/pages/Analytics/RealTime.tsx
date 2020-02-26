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
import { AnalyticsRealTimeInfos } from '../../redux-flow/store/Analytics/RealTime';
import { AnalyticsCard } from './Dashboard';

export const RealTimeAnalyticsPage = (props: AnalyticsRealTimeInfos) => {
    

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

    const labelsFormate = (labels: number[]) => {return labels.map(number => tsToLocaleDate(number))};

    return (
        <React.Fragment>
            <div className="col col-12 mb25">
                
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-6 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Concurent Viewers Per Time (UTC)">
                        <BarChart
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={props.concurentViewersPerTime.data}
                            yAxesName="Concurent Viewers"
                            datasetName="Concurent Viewers"
                            labels={labelsFormate(props.concurentViewersPerTime.time)} />
                    </AnalyticsCard>
                </div>
                <div className="col col-6 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="New Playback Sessions Per Time (UTC)">
                        <BarChart
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={props.newPlaybackSessionsPerTime.data}
                            datasetName="New Playback Sessions"
                            yAxesName="New Playback Sessions"
                            labels={labelsFormate(props.newPlaybackSessionsPerTime.time)} />
                    </AnalyticsCard>
                </div>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-6 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="GBytes Per Time (UTC)">
                        <BarChart
                            datasetName="GBytes"
                            displayBytesFromGB={true}
                            beginAtZero={true}
                            data={props.gbPerTime.data}
                            yAxesName="GB"
                            labels={labelsFormate(props.gbPerTime.time)} />
                    </AnalyticsCard>
                </div>
                <div className="col col-6 px1">
                    <AnalyticsCard infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption per Location">
                        {renderMap(props.consumptionPerLocation.data)}
                    </AnalyticsCard>
                </div>

            </div>

        </React.Fragment>
    )
}
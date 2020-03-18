import React from 'react';
import { BarChart } from '../../../components/Analytics/BarChart';
import { tsToLocaleDate, displayBytesForHumans, mapMarkerNameTranformBytesFromGB } from '../../utils/utils';
import LeafletMap from '../../../components/Analytics/LeafletMap';
import { AnalyticsRealTimeInfos } from '../../redux-flow/store/Analytics/RealTime';
import { AnalyticsCard } from './Dashboard';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';

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
            <div className="flex items-end col col-12 mb25">
                <DropdownSingle 
                    id='timeRefreshDropdown'
                    isInModal={false}
                    dropdownDefaultSelect='5 mins'
                    className='col col-2 pr1'
                    dropdownTitle='Time Period' 
                    list={{'5 Minutes': false, '15 Minutes': false, '20 Minutes': false, '30 Minutes': false, '45 Minutes': false, '1 Hour': false, '1.5 Hour': false, '2 Hours': false}}
                />
                <DropdownSingle
                    id='liveChannelsDropdown'
                    isInModal
                    className='col col-3 px1'
                    dropdownTitle='Live Channel'
                    list={{'Channel1': false, 'Channel2': false}}
                />
                <Button className='ml1' typeButton='primary' sizeButton='large' buttonColor='blue'>Apply</Button>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className="col col-6 px1">
                    <AnalyticsCard realTime dataName="concurentViewersPerTime" data={props.concurentViewersPerTime} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Concurent Viewers By Time (UTC)">
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
                    <AnalyticsCard realTime dataName="newPlaybackSessionsPerTime" data={props.newPlaybackSessionsPerTime} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="New Playback Sessions By Time (UTC)">
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
                    <AnalyticsCard realTime dataName="gbPerTime" data={props.gbPerTime}  infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="GBytes By Time (UTC)">
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
                    <AnalyticsCard realTime dataName="consumptionPerLocation" data={props.consumptionPerLocation.data} infoText="What devices are your viewers using? Data collected starting 07/29/2018. Data is tracked on the default player only." title="Consumption By Location">
                        {renderMap(props.consumptionPerLocation.data)}
                    </AnalyticsCard>
                </div>

            </div>

        </React.Fragment>
    )
}
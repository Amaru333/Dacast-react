import React from 'react';
import { BarChart } from '../../../components/Analytics/BarChartOld';
import { tsToLocaleDate } from '../../../utils/formatUtils';
import { renderMap, HalfSmFullXs, FailedCardAnalytics } from './AnalyticsCommun';
import { DropdownSingle } from '../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { RealTimePageProps } from '../../containers/Analytics/RealTime';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { DropdownListType, DropdownSingleListItem } from '../../../components/FormsComponents/Dropdown/DropdownTypes';
import { ContentItem } from '../../redux-flow/store/Content/General/types';
import { AnalyticsCard } from '../../../components/Analytics/AnalyticsCard/AnalyticsCard';

export const RealTimeAnalyticsPage = (props: RealTimePageProps) => {

    const labelsFormate = (labels: number[]) => { return labels.length ? labels.map(number => tsToLocaleDate(number, { hour: "2-digit", minute: "2-digit", day: '2-digit' })) : [] };
    const [timePeriod, setTimePeriod] = React.useState<number>(5)

    const [selectedContent, setSelectedContent] = React.useState<string>( props.liveList && props.liveList.results.length > 0 ? props.liveList.results[0].title : '')

    const timePeriodDropdownList = [{title: "5 Minutes", data: 5}, {title: "15 Minutes", data: 15}, {title: "30 Minutes", data: 30}, {title: "45 Minutes", data: 45}, {title: "1 Hour", data: 60}, {title: "1.5 Hours", data: 90}]
    const liveChannelsDropdownList = props.liveList && props.liveList.results.map((item) => {
        let channelDropdownItem: DropdownSingleListItem = {title: null}
        channelDropdownItem.title = item.title
        return channelDropdownItem
    })

    const handleReload = () => {
        let selectedChannelFilter = selectedContent.length && props.liveList ? props.liveList.results.filter(element => element.title == selectedContent) : false;
        if(selectedChannelFilter) {
            let selectedChannelId = selectedChannelFilter[0].objectID;
            props.getAnalyticsRealTime({period: timePeriod, channelId:  selectedChannelId ? selectedChannelId : null })
        } else {
            props.getAnalyticsRealTime({period: timePeriod})
        }
    }
    
    return (
        <React.Fragment>
            <div className="flex items-end col col-12 mb25">
                <DropdownSingle
                    id='timeRefreshDropdown'
                    callback={(item: DropdownSingleListItem) => setTimePeriod(item.data) }
                    isInModal={false}
                    isWhiteBackground
                    defaultSelected="5 Minutes"
                    className='col sm-col-2 col-5 pr1'
                    dropdownTitle='Time Period'
                    list={timePeriodDropdownList}
                />
                {props.liveList &&
                    <DropdownSingle
                        id='liveChannelsDropdown'
                        isInModal
                        isWhiteBackground
                        className='col sm-col-3 col-5 px1'
                        dropdownTitle='Live Channel'
                        defaultSelected={props.liveList.results[0].title}
                        callback={(item: DropdownSingleListItem) => setSelectedContent(item.title)}
                        list={liveChannelsDropdownList}
                    />
                }

                <Button onClick={handleReload} style={{ marginBottom: 5 }} className='ml1' typeButton='primary' sizeButton='small' buttonColor='blue'>Apply</Button>
            </div>
            <div className="clearfix mxn1 mb2">
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="concurentViewersPerTime" data={props.realTimeAnalytics.data.concurentViewersPerTime} infoText="The number of viewers consuming your content at the same time" title="Concurent Viewers by Time">
                        {
                            props.realTimeAnalytics.data.concurentViewersPerTime ?
                                props.realTimeAnalytics.data.concurentViewersPerTime.failed ?
                                    <FailedCardAnalytics /> :
                                    <BarChart
                                        beginAtZero={true}
                                        data={props.realTimeAnalytics.data.concurentViewersPerTime.data}
                                        yAxesName="Concurent Viewers"
                                        datasetName="Concurent Viewers"
                                        labels={labelsFormate(props.realTimeAnalytics.data.concurentViewersPerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="playsPerRealTime" data={props.realTimeAnalytics.data.playsPerRealTime} infoText="The number of new viewers who haven't consumed your content before" title="Plays by Time">
                        {
                            props.realTimeAnalytics.data.playsPerRealTime ?
                                props.realTimeAnalytics.data.playsPerRealTime.failed ?
                                    <FailedCardAnalytics /> :
                                    <BarChart
                                        beginAtZero={true}
                                        data={props.realTimeAnalytics.data.playsPerRealTime.data}
                                        datasetName="Plays"
                                        yAxesName="Plays"
                                        labels={labelsFormate(props.realTimeAnalytics.data.playsPerRealTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="playtimePerTime" data={props.realTimeAnalytics.data.playtimePerTime} infoText="Data consumption over time" title="Play time per Time">
                        {
                            props.realTimeAnalytics.data.playtimePerTime && props.realTimeAnalytics.data.playtimePerTime.data ?
                                props.realTimeAnalytics.data.playtimePerTime.failed ?
                                    <FailedCardAnalytics /> :
                                    <BarChart
                                        datasetName="Seconds"
                                        beginAtZero={true}
                                        data={props.realTimeAnalytics.data.playtimePerTime.data}
                                        yAxesName="sec"
                                        labels={labelsFormate(props.realTimeAnalytics.data.playtimePerTime.time)} />
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }

                    </AnalyticsCard>
                </div>
                <div className={HalfSmFullXs}>
                    <AnalyticsCard realTime dataName="playsPerLocation" data={props.realTimeAnalytics.data.playsPerLocation} infoText="Where viewers are consuming your data" title="Plays by Location">
                        {
                            props.realTimeAnalytics.data.playsPerLocation ?
                                props.realTimeAnalytics.data.playsPerLocation.failed ?
                                    <FailedCardAnalytics /> :
                                    renderMap(props.realTimeAnalytics.data.playsPerLocation.data, 'realTimeAnalyticsplaysPerLocation', false)
                                :
                                <LoadingSpinner center size='medium' color='violet' />
                        }
                    </AnalyticsCard>
                </div>

            </div>

        </React.Fragment>
    )
}
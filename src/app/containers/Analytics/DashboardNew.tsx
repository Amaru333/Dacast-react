import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, AnalyticsDashboardState, GetAnalyticsDashboardOptions, getAnalyticsDashboardAction, getAnalyticsDashboardNewAction, AnalyticsDashboardNewInfo, AnalyticsDashboardDimension, AnalyticsTopContentParams, getAnalyticsTopContentAction, AnalyticsTopContentInfo } from '../../redux-flow/store/Analytics/Dashboard';
import { DashboardAnalyticsPage } from '../../pages/Analytics/Dashboard';
import { dateAdd, getCurrentTs } from '../../../utils/services/date/dateService';
import { WidgetElement } from '../Dashboard/WidgetElement';
import { classItemHalfWidthContainer, classItemQuarterWidthContainer, WidgetHeader } from '../Dashboard/DashboardStyles';
import { IconStyle } from '../../../shared/Common/Icon';
import { Text } from '../../../components/Typography/Text';
import { userToken } from '../../utils/services/token/tokenService';
import LeafletMap from '../../../components/Analytics/LeafletMap';
import { AccountAnalyticsParameters, TimeRangeAccountAnalytics } from '../../redux-flow/store/Analytics/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { useHistory } from 'react-router';
import { DateFilteringAnalytics } from '../../shared/Analytics/DateFilteringAnalytics';
import { ContentType } from '../../redux-flow/store/Common/types';
import { formatTimeValue } from '../../../utils/formatUtils';
import { getAnalyticsQsParams, setAnalyticsQsParams } from '../../shared/Analytics/AnalyticsCommun';
import { TabSmall } from '../../../components/Tab/TabSmall';
import { Pagination } from '../../../components/Pagination/Pagination';
import { world } from '../../constants/CountriesList';
import { EmptyAnalytics } from '../../../components/Analytics/EmptyAnalytics';
import EventHooker from '../../../utils/services/event/eventHooker';

export interface DashboardPageProps {
    dashboardAnalytics: AnalyticsDashboardNewInfo;
    topContent: AnalyticsTopContentInfo[];
    getAnalyticsDashboard: (options: AccountAnalyticsParameters) => Promise<void>;
    getAnalyticsTopContent: (options: AnalyticsTopContentParams) => Promise<void>;
}

const DashboardAnalyticsNew = (props: DashboardPageProps) => {

    const {timeRange, startDate, endDate} = getAnalyticsQsParams()
    let history = useHistory()
    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAccountAnalytics, custom: { start: number; end: number } }>({timeRange: timeRange ? timeRange as TimeRangeAccountAnalytics : 'LAST_WEEK', custom: { end: parseInt(endDate) || new Date().getTime(), start: parseInt(startDate) || dateAdd(new Date, 'week', -1).getTime()}})
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [playsByLocationView, setPlaysByLocationView] = React.useState<'Map' | 'Details'>('Map')
    const [paginationInfo, setPaginationInfo] = React.useState<{ page: number; nbResults: number }>({ page: 1, nbResults: 5})
    const loaded = React.useRef(false);


    React.useEffect(() => {
        props.getAnalyticsDashboard({ id: null, timeRange: timeRange as TimeRangeAccountAnalytics, type: "account", dimension: AnalyticsDashboardDimension, start: parseInt(startDate), end: parseInt(endDate) })
        .then(() => setIsFetching(false))
        props.getAnalyticsTopContent({metrics: ['impressions'], sortBy: 'impressions'})
    }, [])

    React.useEffect(() => {
        if(loaded.current) {
            if(timeRangePick.timeRange === 'CUSTOM' && (isNaN(timeRangePick.custom.start) || isNaN(timeRangePick.custom.end)) ) {

            } else {
                setLoading(true)
                props.getAnalyticsDashboard({
                    id: null,
                    dimension: AnalyticsDashboardDimension,
                    timeRange: timeRangePick.timeRange,
                    type: 'account',
                    start: timeRangePick.timeRange === 'CUSTOM' ? timeRangePick.custom.start : undefined,
                    end: timeRangePick.timeRange === 'CUSTOM' ? timeRangePick.custom.end : undefined,
                }).then(() => {
                    setLoading(false)
                })
            }
            
        } else {
            loaded.current = true;
        }
        
    }, [timeRangePick])

    const handleTitleClick = (id: string, type: ContentType) => {
        switch(type) {
            case 'vod':
                return '/videos/' + id + '/analytics' + history.location.search
            case 'live': 
                return'/livestreams/' + id + '/analytics' + history.location.search
            case 'playlist': 
                return '/playlists/' + id + '/analytics' + history.location.search
            default:
                return null
        }
    }

    const renderTopContent = () => {
        if(props.topContent) {
            return props.topContent.map((content, i) => {
                return (
                    <div className='flex col col-12' key={content.id}>
                        <Text>{i + 1}</Text>
                        <Text style={i === 9 ? {paddingLeft: 24} : {}} className={(i === 9 ? '' : 'px3') +' flex-auto'}>{content.title !== 'Deleted Content' ? <a className='pointer' href={handleTitleClick(content.id, content.type)}>{content.title}</a> : content.title}</Text>
                        <Text className='pr2'>{content.total.toLocaleString()}</Text>
                    </div>
                )
            })
        }
    }

    const renderPlaysByLocation = () => {
        if(props.dashboardAnalytics.audienceLocation.length === 0 ) {
            return <EmptyAnalytics />
        }
        
        if(playsByLocationView === 'Map') {
            return (
                <div>
                    <LeafletMap
                        smallMap
                        markers={props.dashboardAnalytics.audienceLocation}
                        markerNameTranform={(element, index) => element.value.map((value, index) => { return (index === 0 ? element.city+": " : ' ' ) + value+" "+element.label[index] }).join() } 
                    />
                </div>
            )
        }

        let minIndex = paginationInfo.nbResults * (paginationInfo.page - 1)
        return (
            <div className='col col-12 flex flex-column'>
                <div className='flex pb2'>
                    <Text className='col col-6' weight='med'>Country</Text>
                    <Text weight='med'>Plays</Text>
                </div>
                {
                    props.dashboardAnalytics.audienceLocation.map((item, i) => {
                        if(i >= minIndex && i < minIndex + paginationInfo.nbResults) {
                            return (
                                <div className='flex col col-12' key={i}>
                                    <Text className='col col-6'>{world.features.filter(i => i.id.indexOf(item.city) !== -1).length > 0 ? world.features.filter(i => i.id.indexOf(item.city) !== -1)[0].properties.name : 'Unknown'}</Text>
                                    <Text >{item.value}</Text>
                                </div>
                            )
                        }
                    })
                }
                <Pagination smallScreen displayedItemsOptions={[5, 10, 20]} totalResults={props.dashboardAnalytics.audienceLocation.length} callback={(page: number, nbResults: number) => setPaginationInfo({ page: page, nbResults: nbResults })} />
            </div>
        )
    }

    const handleDatepickerChange = (info: {value?: TimeRangeAccountAnalytics, startDate?: number, endDate?: number}) => {
        if(info.endDate && info.startDate) {
            setTimeRangePick(  {timeRange: info.value, custom: info.value === "CUSTOM" ?  { start: info.startDate, end: info.endDate} : timeRangePick.custom })
            setAnalyticsQsParams({key: 'timeRange', value: info.value}, info.startDate, info.endDate)
        }
    }

    if(isFetching && !props.dashboardAnalytics) {
        return <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    }
    return (
        <React.Fragment>
            <div className="flex mb2 ml1">
                <DateFilteringAnalytics
                    selectedPreset={timeRangePick.timeRange}
                    isDisabled={loading}
                    className='col col-9'
                    defaultDates={{ start: timeRangePick.custom.start, end: timeRangePick.custom.end }}
                    callback={(info) =>  handleDatepickerChange(info) }
                />
            </div>
            <WidgetElement className={classItemQuarterWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex items-center'>
                    <IconStyle className='pointer pr1' onClick={() => history.push('/analytics/data' + history.location.search)} coloricon='dark-violet'>wifi</IconStyle>
                    <Text className='pointer' onClick={() => history.push('/analytics/data' + history.location.search)} size={14} weight='med' color='gray-3'>Data Usage</Text>
                </WidgetHeader>
                <div className='flex flex-wrap minContentDash items-center'>
                    <Text className='pr2' size={32} weight='reg'>{props.dashboardAnalytics.dataConsumption.toLocaleString()}</Text>
                    <Text size={20} weight='reg' color='gray-3'>GB</Text>
                </div>
                <Text className='flex flex-last items-center justify-end' size={14}><a href={'/analytics/data' + history.location.search}>Data Usage Report</a><IconStyle className='pl1' coloricon='dark-violet' customsize={14}>arrow_forward</IconStyle></Text>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex items-center'>
                    <IconStyle className='pointer pr1' onClick={() => history.push('/analytics/audience' + history.location.search)}coloricon='dark-violet'>play_circle_outlined</IconStyle>
                    <Text className='pointer' onClick={() => history.push('/analytics/audience' + history.location.search)} size={14} weight='med' color='gray-3'>Audience</Text>
                </WidgetHeader>
                <div className='flex flex-wrap minContentDash items-center'>
                    <Text className='pr2' size={32} weight='reg'>{props.dashboardAnalytics.plays.toLocaleString()}</Text>
                    <Text size={20} weight='reg' color='gray-3'>plays</Text>
                </div>
                <Text className='flex flex-last items-center justify-end' size={14}><a href={'/analytics/audience' + history.location.search}>Audience Report</a><IconStyle className='pl1' coloricon='dark-violet' customsize={14}>arrow_forward</IconStyle></Text>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex items-center'>
                    <IconStyle  className='pointer pr1' onClick={() => history.push('/analytics/engagement' + history.location.search)} coloricon='dark-violet'>access_time</IconStyle>
                    <Text className='pointer' onClick={() => history.push('/analytics/engagement' + history.location.search)} size={14} weight='med' color='gray-3'>Engagement</Text>
                </WidgetHeader>
                <div className='flex flex-wrap minContentDash items-center'>
                    <Text className='pr2' size={32} weight='reg'>{formatTimeValue([props.dashboardAnalytics.engagement]).values[0]}</Text>
                    <Text size={20} weight='reg' color='gray-3'>{formatTimeValue([props.dashboardAnalytics.engagement]).unitLong.toLowerCase()}</Text>
                </div>
                <Text className='flex flex-last items-center justify-end' size={14}><a href={'/analytics/engagement' + history.location.search}>Engagement Report</a><IconStyle className='pl1' coloricon='dark-violet' customsize={14}>arrow_forward</IconStyle></Text>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex items-center'>
                    <IconStyle className='pointer pr1' onClick={() => history.push('/analytics/paywall' + history.location.search)} coloricon='dark-violet'>account_balance</IconStyle>
                    <Text className='pointer' onClick={() => history.push('/analytics/paywall' + history.location.search)} size={14} weight='med' color='gray-3'>Paywall</Text>
                </WidgetHeader>
                    {
                        userToken.getPrivilege('privilege-paywall') ? 
                            <>
                                <div className="flex flex-wrap minContentDash items-center">
                                    <IconStyle coloricon='gray-3' customsize={38}>attach_money</IconStyle>
                                    <Text size={32} weight="reg" color="gray-1">{props.dashboardAnalytics.paywall.toLocaleString()}</Text>
                                </div>
                                <Text className='flex flex-last items-center justify-end' size={14}><a href={'/analytics/paywall' + history.location.search}>Paywall Report</a><IconStyle className='pl1' coloricon='dark-violet' customsize={14}>arrow_forward</IconStyle></Text>
                            </>
                            : <Text className="flex flex-wrap minContentDash items-center" >This feature is not included in your plan. <a href='/account/upgrade'>Upgrade</a>&nbsp;to have access.
                            </Text>
                    }
            </WidgetElement>
            <div className='col col-12'>
            <WidgetElement className={classItemHalfWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex'>
                    <IconStyle className='pr1' coloricon='dark-violet'>language</IconStyle>
                    <Text className='flex-auto' size={14} weight='med' color='gray-3'>Plays by Location</Text>
                    <TabSmall list={[{title: 'Map'}, {title: 'Details'}]} callback={(value) => setPlaysByLocationView(value.title)} />
                </WidgetHeader>
                {renderPlaysByLocation()}
            </WidgetElement>
            <WidgetElement color='dark-violet' className={classItemHalfWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex'>
                    <IconStyle className='pr1' coloricon='dark-violet'>emoji_events</IconStyle>
                    <Text className='flex-auto' size={14} weight='med' color='gray-3'>Top Content (Last 30 Days)</Text>
                </WidgetHeader>
                <div className='flex pb2'>
                    <Text weight='med'>#</Text>
                    <Text className='px3 flex-auto' weight='med'>Name</Text>
                    <Text className='pr2' weight='med'>Viewers</Text>
                </div>
                {renderTopContent()}
            </WidgetElement>
            </div>
        </React.Fragment>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        dashboardAnalytics: state.analytics.dashboard.newDashboardInfo,
        topContent: state.analytics.dashboard.topContent
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsDashboard: async (options: AccountAnalyticsParameters) => {
            await dispatch(getAnalyticsDashboardNewAction(options));
        },
        getAnalyticsTopContent: async (options: AnalyticsTopContentParams) => {
            await dispatch(getAnalyticsTopContentAction(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnalyticsNew);
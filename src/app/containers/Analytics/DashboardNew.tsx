import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, AnalyticsDashboardState, GetAnalyticsDashboardOptions, getAnalyticsDashboardAction, getAnalyticsDashboardNewAction, AnalyticsDashboardNewInfo, AnalyticsDashboardDimension } from '../../redux-flow/store/Analytics/Dashboard';
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

export interface DashboardPageProps {
    dashboardAnalytics: AnalyticsDashboardNewInfo;
    getAnalyticsDashboard: (options: AccountAnalyticsParameters) => Promise<void>;

}

const DashboardAnalyticsNew = (props: DashboardPageProps) => {

    let history = useHistory()
    const [timeRangePick, setTimeRangePick] = React.useState<{timeRange: TimeRangeAccountAnalytics, custom: { start: number; end: number } }>( {timeRange: 'LAST_WEEK', custom: { end: new Date().getTime(), start: dateAdd(new Date, 'week', -1).getTime() } } )
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const loaded = React.useRef(false);


    React.useEffect(() => {
        props.getAnalyticsDashboard({ id: null, timeRange: 'LAST_MONTH', type: "account", dimension: AnalyticsDashboardDimension })
        .then(() => setIsFetching(false))
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
                    callback={(info) => {  info.endDate && info.startDate ?  setTimeRangePick(  {timeRange: info.value as TimeRangeAccountAnalytics, custom: info.value === "CUSTOM" ?  { start: info.startDate, end: info.endDate} : timeRangePick.custom } ) : null } }
                />
            </div>
            <WidgetElement className={classItemQuarterWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex items-center'>
                    <IconStyle className='pointer pr1' onClick={() => history.push('/analytics/data')} coloricon='dark-violet'>wifi</IconStyle>
                    <Text className='pointer' onClick={() => history.push('/analytics/data')} size={14} weight='med' color='gray-3'>Data Usage</Text>
                </WidgetHeader>
                <div className='flex minContentDash items-center'>
                    <Text className='pr2' size={32} weight='reg'>{props.dashboardAnalytics.dataConsumption}</Text>
                    <Text size={32} weight='reg' color='gray-3'>gbs</Text>
                </div>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex items-center'>
                    <IconStyle className='pointer pr1' onClick={() => history.push('/analytics/audience')}coloricon='dark-violet'>play_circle_outlined</IconStyle>
                    <Text className='pointer' onClick={() => history.push('/analytics/audience')} size={14} weight='med' color='gray-3'>Audience</Text>
                </WidgetHeader>
                <div className='flex minContentDash items-center'>
                    <Text className='pr2' size={32} weight='reg'>{props.dashboardAnalytics.plays}</Text>
                    <Text size={32} weight='reg' color='gray-3'>plays</Text>
                </div>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex items-center'>
                    <IconStyle  className='pointer pr1' onClick={() => history.push('/analytics/engagement')} coloricon='dark-violet'>access_time</IconStyle>
                    <Text className='pointer' onClick={() => history.push('/analytics/engagement')} size={14} weight='med' color='gray-3'>Engagement</Text>
                </WidgetHeader>
                <div className='flex minContentDash items-center'>
                    <Text className='pr2' size={32} weight='reg'>{props.dashboardAnalytics.engagement}</Text>
                    <Text size={32} weight='reg' color='gray-3'>hours</Text>
                </div>
            </WidgetElement>
            <WidgetElement className={classItemQuarterWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex items-center'>
                    <IconStyle className='pointer pr1' onClick={() => history.push('/analytics/paywall')} coloricon='dark-violet'>account_balance</IconStyle>

                    <Text className='pointer' onClick={() => history.push('/analytics/paywall')} size={14} weight='med' color='gray-3'>Paywall</Text>
                </WidgetHeader>
                <div className="flex minContentDash items-center">
                    {
                        userToken.getPrivilege('privilege-paywall') ? 
                            <div className='flex items-center'>
                                <IconStyle coloricon='gray-3' customsize={38}>attach_money</IconStyle>
                                <Text size={32} weight="reg" color="gray-1">{props.dashboardAnalytics.paywall}</Text>
                            </div>
                            : <Text >This feature is not included in your plan. <a href='/account/upgrade'>Upgrade</a> to have access.
                            </Text>
                    }
                </div>
            </WidgetElement>
            <div className='col col-12'>
            <WidgetElement className={classItemHalfWidthContainer} customPadding='16px'>
                <WidgetHeader className='flex'>
                    <IconStyle className='pr1' coloricon='dark-violet'>language</IconStyle>
                    <Text className='flex-auto' size={14} weight='med' color='gray-3'>Plays by Location</Text>
                </WidgetHeader>
                <div>
                    <LeafletMap
                        markers={props.dashboardAnalytics.audienceLocation}
                        markerNameTranform={(element, index) => element.value.map((value, index) => { return (index === 0 ? element.city+": " : ' ' ) + value+" "+element.label[index] }).join() } 
                    />
                </div>
            </WidgetElement>
            </div>

        </React.Fragment>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        dashboardAnalytics: state.analytics.dashboard.newDashboardInfo
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsDashboard: async (options: AccountAnalyticsParameters) => {
            await dispatch(getAnalyticsDashboardNewAction(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnalyticsNew);
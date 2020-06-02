import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Action, AnalyticsRealTimeState, GetAnalyticsRealtimeOptions, getAnalyticsRealTimeViewersTimesAction, getAnalyticsRealTimePlaybackTimeAction, getAnalyticsRealTimeGbTimeAction, getAnalyticsRealTimeConsumptionLocationAction, getAnalyticsRealTimeJobIdsAction } from '../../redux-flow/store/Analytics/RealTime';
import { RealTimeAnalyticsPage } from '../../pages/Analytics/RealTime';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getLiveListAction } from '../../redux-flow/store/Live/General/actions';
import { SearchResult } from '../../redux-flow/store/Live/General/types';


export interface RealTimePageProps {
    realTimeAnalytics: AnalyticsRealTimeState;
    getAnalyticsRealTimeViewersTimes: Function;
    getAnalyticsRealTimePlaybackTime: Function;
    getAnalyticsRealTimeGbTime: Function;
    getAnalyticsRealTimeConsumptionLocation: Function;
    getAnalyticsRealTimeJobIds: Function;
    liveList: false | SearchResult;
    getLiveList: Function;
}

const RealTimeAnalytics = (props: RealTimePageProps) => {

    React.useEffect(() => {
        if(!props.liveList) {
            props.getLiveList();
        }
        props.getAnalyticsRealTimeJobIds({ period: 5 })
    }, [])

    React.useEffect(() => {
        if (!props.realTimeAnalytics.data.concurentViewersPerTime && props.realTimeAnalytics.jobIds) {
            props.getAnalyticsRealTimeViewersTimes(props.realTimeAnalytics.jobIds.concurentViewersPerTime.jobID);
        }
        if (!props.realTimeAnalytics.data.consumptionPerLocation && props.realTimeAnalytics.jobIds) {
            props.getAnalyticsRealTimeConsumptionLocation(props.realTimeAnalytics.jobIds.consumptionPerLocation.jobID);
        }
        if (!props.realTimeAnalytics.data.gbPerTime && props.realTimeAnalytics.jobIds) {
            props.getAnalyticsRealTimeGbTime(props.realTimeAnalytics.jobIds.gbPerTime.jobID);
        }
        if (!props.realTimeAnalytics.data.newPlaybackSessionsPerTime && props.realTimeAnalytics.jobIds) {
            props.getAnalyticsRealTimePlaybackTime(props.realTimeAnalytics.jobIds.newPlaybackSessionsPerTime.jobID);
        }
    }, [props.realTimeAnalytics.jobIds])
    return <RealTimeAnalyticsPage {...props} />  
}

export function mapStateToProps(state: ApplicationState) {
    return {
        realTimeAnalytics: state.analytics.realTime,
        liveList: state.live.list,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsRealTimeJobIds: (options?: any) => {
            dispatch(getAnalyticsRealTimeJobIdsAction(options));
        },
        getAnalyticsRealTimeViewersTimes: (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
            dispatch(getAnalyticsRealTimeViewersTimesAction(jobId, options));
        },
        getAnalyticsRealTimePlaybackTime: (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
            dispatch(getAnalyticsRealTimePlaybackTimeAction(jobId, options));
        },
        getAnalyticsRealTimeGbTime: (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
            dispatch(getAnalyticsRealTimeGbTimeAction(jobId, options));
        },
        getAnalyticsRealTimeConsumptionLocation: (jobId: string, options?: GetAnalyticsRealtimeOptions) => {
            dispatch(getAnalyticsRealTimeConsumptionLocationAction(jobId, options));
        },
        getLiveList: (qs: string) => {
            dispatch(getLiveListAction(qs));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeAnalytics);
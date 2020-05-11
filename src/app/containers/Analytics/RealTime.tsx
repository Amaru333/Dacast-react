import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Action, AnalyticsRealTimeState, GetAnalyticsRealtimeOptions, getAnalyticsRealTimeViewersTimesAction, getAnalyticsRealTimePlaybackTimeAction, getAnalyticsRealTimeGbTimeAction, getAnalyticsRealTimeConsumptionLocationAction } from '../../redux-flow/store/Analytics/RealTime';
import { RealTimeAnalyticsPage } from '../../pages/Analytics/RealTime';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


export interface RealTimePageProps {
    realTimeAnalytics: AnalyticsRealTimeState;
    getAnalyticsRealTimeViewersTimes: Function;
    getAnalyticsRealTimePlaybackTime: Function;
    getAnalyticsRealTimeGbTime: Function;
    getAnalyticsRealTimeConsumptionLocation: Function;
}

const RealTimeAnalytics = (props: RealTimePageProps) => {

    React.useEffect(() => {
        if (!props.realTimeAnalytics.data.concurentViewersPerTime) {
            props.getAnalyticsRealTimeViewersTimes();
        }
        if (!props.realTimeAnalytics.data.consumptionPerLocation) {
            props.getAnalyticsRealTimeConsumptionLocation();
        }
        if (!props.realTimeAnalytics.data.gbPerTime) {
            props.getAnalyticsRealTimeGbTime();
        }
        if (!props.realTimeAnalytics.data.newPlaybackSessionsPerTime) {
            props.getAnalyticsRealTimePlaybackTime();
        }
    }, [])
    return <RealTimeAnalyticsPage {...props} />  
}

export function mapStateToProps(state: ApplicationState) {
    return {
        realTimeAnalytics: state.analytics.realTime
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsRealTimeViewersTimes: (options?: GetAnalyticsRealtimeOptions) => {
            dispatch(getAnalyticsRealTimeViewersTimesAction(options));
        },
        getAnalyticsRealTimePlaybackTime: (options?: GetAnalyticsRealtimeOptions) => {
            dispatch(getAnalyticsRealTimePlaybackTimeAction(options));
        },
        getAnalyticsRealTimeGbTime: (options?: GetAnalyticsRealtimeOptions) => {
            dispatch(getAnalyticsRealTimeGbTimeAction(options));
        },
        getAnalyticsRealTimeConsumptionLocation: (options?: GetAnalyticsRealtimeOptions) => {
            dispatch(getAnalyticsRealTimeConsumptionLocationAction(options));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeAnalytics);
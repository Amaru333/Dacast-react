import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Action, AnalyticsRealTimeState, GetAnalyticsRealtimeOptions, getAnalyticsRealTimeAction } from '../../redux-flow/store/Analytics/RealTime';
import { RealTimeAnalyticsPage } from '../../pages/Analytics/RealTime';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getLiveListAction } from '../../redux-flow/store/Live/General/actions';
import { SearchResult } from '../../redux-flow/store/Live/General/types';


export interface RealTimePageProps {
    realTimeAnalytics: AnalyticsRealTimeState;
    getAnalyticsRealTime: Function;
    liveList: false | SearchResult;
    getLiveList: Function;
}

const RealTimeAnalytics = (props: RealTimePageProps) => {

    React.useEffect(() => {
        if(!props.liveList) {
            props.getLiveList();
        }
        if(props.liveList) {
            if(props.liveList.results.length === 0) {
                // HANDLE NO CHANNEL
            }
            props.getAnalyticsRealTime({ period: 5, channel: props.liveList.results[0].objectID })
        }
    }, [props.liveList])


    if(!props.liveList) {
        return <LoadingSpinner center size='medium' color='violet' />
    } else {
        return <RealTimeAnalyticsPage {...props} />  
    }
}

export function mapStateToProps(state: ApplicationState) {
    return {
        realTimeAnalytics: state.analytics.realTime,
        liveList: state.live.list,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsRealTime: (options?: any) => {
            dispatch(getAnalyticsRealTimeAction(options));
        },
        getLiveList: (qs: string) => {
            dispatch(getLiveListAction(qs));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeAnalytics);
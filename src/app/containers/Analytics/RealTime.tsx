import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Action, AnalyticsRealTimeState, GetAnalyticsRealtimeOptions, getAnalyticsRealTimeAction } from '../../redux-flow/store/Analytics/RealTime';
import { RealTimeAnalyticsPage } from '../../pages/Analytics/RealTime';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getContentListAction } from '../../redux-flow/store/Content/List/actions';
import { SearchResult } from '../../redux-flow/store/Content/General/types';


export interface RealTimePageProps {
    realTimeAnalytics: AnalyticsRealTimeState;
    getAnalyticsRealTime: Function;
    liveList: false | SearchResult;
    getLiveList: Function;
}

const RealTimeAnalytics = (props: RealTimePageProps) => {

    React.useEffect(() => {
        props.getLiveList(null)
    }, [])

    React.useEffect(() => {
        if(props.liveList) {
            if(!props.liveList.results || props.liveList.results.length === 0) {
                // HANDLE NO CHANNEL
            } else if(!props.realTimeAnalytics ) {
                props.getAnalyticsRealTime({ period: 5, channelId: props.liveList.results[0].objectID })
            }
        }
    }, [props.liveList])


    if(!props.liveList || !props.realTimeAnalytics) {
        return <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    } else {
        return <RealTimeAnalyticsPage {...props} />  
    }
}

export function mapStateToProps(state: ApplicationState) {
    return {
        realTimeAnalytics: state.analytics.realTime,
        liveList: state.content.list['live'],
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsRealTime: (options?: any) => {
            dispatch(getAnalyticsRealTimeAction(options));
        },
        getLiveList: (qs: string) => {
            dispatch(getContentListAction(qs, 'live'));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeAnalytics);
import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getAnalyticsRealTimeDetailsAction, Action, AnalyticsRealTimeState } from '../../redux-flow/store/Analytics/RealTime';
import { RealTimeAnalyticsPage } from '../../pages/Analytics/RealTime';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


export interface RealTimePageProps {
    realTimeAnalytics: AnalyticsRealTimeState;
    getAnalyticsRealTimeDetailsAction: Function;
}

const RealTimeAnalytics = (props: RealTimePageProps) => {

    React.useEffect(() => {
        if (!props.realTimeAnalytics) {
            props.getAnalyticsRealTimeDetailsAction();
        }
    }, [])

    return (
        props.realTimeAnalytics.data ?
            (
                <RealTimeAnalyticsPage {...props.realTimeAnalytics.data} />
            )
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        realTimeAnalytics: state.analytics.realTime
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsRealTimeDetailsAction: () => {
            dispatch(getAnalyticsRealTimeDetailsAction());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeAnalytics);
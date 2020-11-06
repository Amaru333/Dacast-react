import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { RealTimeAnalyticsPage } from '../../pages/Analytics/RealTime';
import { useHistory } from 'react-router';
import { ContentAnalytics } from '../../shared/Analytics/ContentAnalytics';
import { Action, getAudienceAnalyticsAction, getDataAnalyticsAction } from '../../redux-flow/store/Analytics/actions';
import { getRevenueAnalyticsAction } from '../../redux-flow/store/Analytics/actions';
import { GetAudienceAnalyticsInput, GetDataAnalyticsInput, GetRevenueAnalyticsInput } from '../../../DacastSdk/analytics';
import { AnalyticsState } from '../../redux-flow/store/Analytics';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface AnalyticsProps {
    analyticsData: AnalyticsState;
    getRevenueAnalytics: Function;
    getDataAnalytics: Function;
    getAudienceAnalytics: Function;
}

const Analytics = (props: AnalyticsProps) => {

    const [noChannel, setNoChannel] = React.useState<boolean>(false)

    let history = useHistory()
    console.log(props.analyticsData)

    React.useEffect(() => {
        if(!Object.keys(props.analyticsData).length) {
            props.getRevenueAnalytics({})
            props.getDataAnalytics({});
            props.getAudienceAnalytics({});
        }
    }, [])

    return Object.keys(props.analyticsData).length ?
        <ContentAnalytics contentAnalyticsData={props.analyticsData} contentId="" getContentAnalytics={() => {}} contentType="all" />  
        : <><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></> 
}

export function mapStateToProps(state: ApplicationState) {
    return {
        analyticsData: state.analytics
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getRevenueAnalytics: async (options: GetRevenueAnalyticsInput) => {
            await dispatch(getRevenueAnalyticsAction(options));
        },
        getDataAnalytics: async (options: GetDataAnalyticsInput) => {
            await dispatch(getDataAnalyticsAction(options));
        },
        getAudienceAnalytics: async (options: GetAudienceAnalyticsInput) => {
            await dispatch(getAudienceAnalyticsAction(options));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
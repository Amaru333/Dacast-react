import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, AnalyticsDashboardState, GetAnalyticsDashboardOptions, getAnalyticsDashboardAction } from '../../redux-flow/store/Analytics/Dashboard';
import { DashboardAnalyticsPage } from '../../pages/Analytics/Dashboard';
import moment from 'moment';

export interface DashboardPageProps {
    dashboardAnalytics: AnalyticsDashboardState;
    getAnalyticsDashboard: Function;

}

const DashboardAnalytics = (props: DashboardPageProps) => {

    React.useEffect(() => {
        props.getAnalyticsDashboard({ end: Math.round(moment() / 1000), start: Math.round(moment().startOf('day') / 1000) })
    }, [])

    return <DashboardAnalyticsPage {...props} />

}

export function mapStateToProps(state: ApplicationState) {
    return {
        dashboardAnalytics: state.analytics.dashboard
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsDashboard: (options?: GetAnalyticsDashboardOptions) => {
            dispatch(getAnalyticsDashboardAction(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnalytics);
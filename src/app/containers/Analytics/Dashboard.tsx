import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, AnalyticsDashboardState, GetAnalyticsDashboardOptions, getAnalyticsDashboardAction } from '../../redux-flow/store/Analytics/Dashboard';
import { DashboardAnalyticsPage } from '../../pages/Analytics/Dashboard';
import { getCurrentTs } from '../../../utils/services/date/dateService';

export interface DashboardPageProps {
    dashboardAnalytics: AnalyticsDashboardState;
    getAnalyticsDashboard: (options?: GetAnalyticsDashboardOptions) => Promise<void>;

}

const DashboardAnalytics = (props: DashboardPageProps) => {

    React.useEffect(() => {
        props.getAnalyticsDashboard({ end: getCurrentTs('s'), start: Math.floor(new Date().setHours(0, 0, 0, 0)) })
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
        getAnalyticsDashboard: async (options?: GetAnalyticsDashboardOptions) => {
            await dispatch(getAnalyticsDashboardAction(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnalytics);
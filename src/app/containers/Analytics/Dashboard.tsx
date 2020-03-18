import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { getAnalyticsDashboardDetailsAction, Action, AnalyticsDashboardState, GetAnalyticsDashboardOptions } from '../../redux-flow/store/Analytics/Dashboard';
import { DashboardAnalyticsPage } from '../../pages/Analytics/Dashboard';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


export interface DashboardPageProps {
    dashboardAnalytics: AnalyticsDashboardState;
    getAnalyticsDashboardDetailsAction: Function;
}

const DashboardAnalytics = (props: DashboardPageProps) => {

    React.useEffect(() => {
        if (!props.dashboardAnalytics) {
            props.getAnalyticsDashboardDetailsAction();
        }
    }, [])

    return (
        props.dashboardAnalytics ?
            (
                <DashboardAnalyticsPage getAnalyticsDashboard={props.getAnalyticsDashboardDetailsAction} {...props.dashboardAnalytics.data} />
            )
            :<SpinnerContainer> <LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        dashboardAnalytics: state.analytics.dashboard
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsDashboardDetailsAction: (dates: GetAnalyticsDashboardOptions) => {
            dispatch(getAnalyticsDashboardDetailsAction(dates));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnalytics);
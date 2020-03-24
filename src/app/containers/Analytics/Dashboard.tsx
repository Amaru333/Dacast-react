import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Action, AnalyticsDashboardState, GetAnalyticsDashboardOptions, getAnalyticsDashboardConsumptionLocationAction, getAnalyticsDashboardTopContentsAction, getAnalyticsDashboardConsumptionDeviceAction, getAnalyticsDashboardPlaysViewersTimeAction, getAnalyticsDashboardConsumptionTimeAction } from '../../redux-flow/store/Analytics/Dashboard';
import { DashboardAnalyticsPage } from '../../pages/Analytics/Dashboard';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';


export interface DashboardPageProps {
    dashboardAnalytics: AnalyticsDashboardState;
    getAnalyticsDashboardConsumptionLocation: Function;
    getAnalyticsDashboardTopContents: Function;
    getAnalyticsDashboardConsumptionDevice: Function;
    getAnalyticsDashboardPlaysViewersTime: Function;
    getAnalyticsDashboardConsumptionTime: Function;

}

const DashboardAnalytics = (props: DashboardPageProps) => {

    React.useEffect(() => {
        if(!props.dashboardAnalytics.data.consumptionPerLocation) {
            props.getAnalyticsDashboardConsumptionLocation();
        }
        if(!props.dashboardAnalytics.data.topContents) {
            props.getAnalyticsDashboardTopContents();
        }
        if(!props.dashboardAnalytics.data.consumptionPerDevice) {
            props.getAnalyticsDashboardConsumptionDevice();
        }
        if(!props.dashboardAnalytics.data.playsViewersPerTime) {
            props.getAnalyticsDashboardPlaysViewersTime();
        }
        if(!props.dashboardAnalytics.data.consumptionPerTime) {
            props.getAnalyticsDashboardConsumptionTime();
        }
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
        getAnalyticsDashboardConsumptionLocation: (dates: GetAnalyticsDashboardOptions) => {
            dispatch(getAnalyticsDashboardConsumptionLocationAction(dates));
        },
        getAnalyticsDashboardTopContents: (dates: GetAnalyticsDashboardOptions) => {
            dispatch(getAnalyticsDashboardTopContentsAction(dates));
        },
        getAnalyticsDashboardConsumptionDevice: (dates: GetAnalyticsDashboardOptions) => {
            dispatch(getAnalyticsDashboardConsumptionDeviceAction(dates));
        },
        getAnalyticsDashboardPlaysViewersTime: (dates: GetAnalyticsDashboardOptions) => {
            dispatch(getAnalyticsDashboardPlaysViewersTimeAction(dates));
        },
        getAnalyticsDashboardConsumptionTime: (dates: GetAnalyticsDashboardOptions) => {
            dispatch(getAnalyticsDashboardConsumptionTimeAction(dates));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnalytics);
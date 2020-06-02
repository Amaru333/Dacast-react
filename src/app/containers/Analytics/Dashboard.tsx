import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { Action, AnalyticsDashboardState, GetAnalyticsDashboardOptions, getAnalyticsDashboardConsumptionLocationAction, getAnalyticsDashboardTopContentsAction, getAnalyticsDashboardConsumptionDeviceAction, getAnalyticsDashboardPlaysViewersTimeAction, getAnalyticsDashboardConsumptionTimeAction, getAnalyticsDashboardJobIdsAction } from '../../redux-flow/store/Analytics/Dashboard';
import { DashboardAnalyticsPage } from '../../pages/Analytics/Dashboard';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import moment from 'moment';


export interface DashboardPageProps {
    dashboardAnalytics: AnalyticsDashboardState;
    getAnalyticsDashboardConsumptionLocation: Function;
    getAnalyticsDashboardTopContents: Function;
    getAnalyticsDashboardConsumptionDevice: Function;
    getAnalyticsDashboardPlaysViewersTime: Function;
    getAnalyticsDashboardConsumptionTime: Function;
    getAnalyticsDashboardJobIds: Function;

}

const DashboardAnalytics = (props: DashboardPageProps) => {

    React.useEffect(() => {
        props.getAnalyticsDashboardJobIds({ end: Math.round(moment() / 1000), start: Math.round(moment().startOf('day') / 1000) });
    }, [])

    React.useEffect(() => {
        if(!props.dashboardAnalytics.data.playsViewersPerTime && props.dashboardAnalytics.jobIds) {
            props.getAnalyticsDashboardPlaysViewersTime(null, props.dashboardAnalytics.jobIds.playsViewersPerTime.jobID);
        }
        if(!props.dashboardAnalytics.data.consumptionPerTime && props.dashboardAnalytics.jobIds) {
            props.getAnalyticsDashboardConsumptionTime(null, props.dashboardAnalytics.jobIds.consumptionPerTime.jobID);
        }

        // PART OF ANALYTICS V2 TO REWORK
        //
        // if(!props.dashboardAnalytics.data.consumptionPerLocation && props.dashboardAnalytics.jobIds) {
        //     props.getAnalyticsDashboardConsumptionLocation(null, props.dashboardAnalytics.jobIds.consumptionPerLocation.jobID);
        // }
        // if(!props.dashboardAnalytics.data.topContents && props.dashboardAnalytics.jobIds) {
        //     props.getAnalyticsDashboardTopContents(null, props.dashboardAnalytics.jobIds.topContents.jobID);
        // }
        // if(!props.dashboardAnalytics.data.consumptionPerDevice && props.dashboardAnalytics.jobIds) {
        //     props.getAnalyticsDashboardConsumptionDevice(null, props.dashboardAnalytics.jobIds.consumptionPerDevice.jobID);
        // }
      
        
    }, [props.dashboardAnalytics.jobIds])
    

    return <DashboardAnalyticsPage {...props} />

}

export function mapStateToProps(state: ApplicationState) {
    return {
        dashboardAnalytics: state.analytics.dashboard
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsDashboardJobIds: (options?: GetAnalyticsDashboardOptions) => {
            dispatch(getAnalyticsDashboardJobIdsAction(options));
        },
        getAnalyticsDashboardConsumptionLocation: (dates: GetAnalyticsDashboardOptions, jobId: string) => {
            dispatch(getAnalyticsDashboardConsumptionLocationAction(dates, jobId));
        },
        getAnalyticsDashboardTopContents: (dates: GetAnalyticsDashboardOptions, jobId: string) => {
            dispatch(getAnalyticsDashboardTopContentsAction(dates, jobId));
        },
        getAnalyticsDashboardConsumptionDevice: (dates: GetAnalyticsDashboardOptions, jobId: string) => {
            dispatch(getAnalyticsDashboardConsumptionDeviceAction(dates, jobId));
        },
        getAnalyticsDashboardPlaysViewersTime: (dates: GetAnalyticsDashboardOptions, jobId: string) => {
            dispatch(getAnalyticsDashboardPlaysViewersTimeAction(dates, jobId));
        },
        getAnalyticsDashboardConsumptionTime: (dates: GetAnalyticsDashboardOptions, jobId: string) => {
            dispatch(getAnalyticsDashboardConsumptionTimeAction(dates, jobId));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnalytics);
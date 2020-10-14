import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos } from '../../redux-flow/store/Folders/types';
import { RevenueAnalytics } from '../../pages/Analytics/Revenue';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { AnalyticsRevenueInfos, GetAnalyticsRevenueOptions, getAnalyticsRevenueAction } from '../../redux-flow/store/Analytics/Revenue';
import moment from 'moment';

export interface RevenueComponentProps {
    folderData: FoldersInfos;
    analyticsRevenueData: AnalyticsRevenueInfos;
    getFolderContent: (folderPath: string) => Promise<void>;
    getAnalyticsRevenue: (options: GetAnalyticsRevenueOptions) => Promise<void>;
}

const Revenue = (props: RevenueComponentProps) => {
    React.useEffect(() => {
        const wait = async () => {
            await props.getFolderContent(null)
        }
        wait()
        if(!props.analyticsRevenueData) {
            props.getAnalyticsRevenue({ endDate: Math.round(moment() / 1000), startDate: Math.round(moment().startOf('day') / 1000) });
        }
    }, [])
    return (
        props.folderData && props.analyticsRevenueData ? 
            <RevenueAnalytics {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        analyticsRevenueData: state.analytics.revenue
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getAnalyticsRevenue: async (options: GetAnalyticsRevenueOptions) => {
            await dispatch(getAnalyticsRevenueAction(options))
        },
        getFolderContent: async (folderPath: string) => {
            await dispatch(getFolderContentAction(folderPath))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
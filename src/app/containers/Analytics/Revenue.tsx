import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, restoreContentAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos, ContentType } from '../../redux-flow/store/Folders/types';
import { RevenueAnalytics } from '../../pages/Analytics/Revenue';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { AnalyticsRevenueState, getAnalyticsRevenueRevenueTimeAction, GetAnalyticsRevenueOptions, getAnalyticsRevenueSalesTimeAction, getAnalyticsRevenueSalesCountryAction, getAnalyticsRevenueAction } from '../../redux-flow/store/Analytics/Revenue';
export interface RevenueComponentProps {
    folderData: FoldersInfos;
    getFolders: Function;
    getFolderContent: Function;
    moveItemsToFolder: Function;
    addFolder: Function;
    deleteFolder: Function;
    deleteContent: Function;
    restoreContent: Function;
    renameFolder: Function;
    analyticsRevenueData: AnalyticsRevenueState;
    getAnalyticsRevenue: Function;
}

const Revenue = (props: RevenueComponentProps) => {
    React.useEffect(() => {
        if(!props.folderData) {
            const wait = async () => {
                await props.getFolderContent('/')
                //await props.getFolders('/');
            }
            wait()
        }
        if(!props.analyticsRevenueData.data) {
            props.getAnalyticsRevenue();
        }
    }, [])
    return (
        props.folderData && props.analyticsRevenueData.data ? 
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
        getAnalyticsRevenue: (options: GetAnalyticsRevenueOptions) => {
            dispatch(getAnalyticsRevenueAction(options))
        },
        getFolderContent: (folderPath: string) => {
            dispatch(getFolderContentAction(folderPath))
        },
        restoreContent: (content: ContentType[]) => {
            dispatch(restoreContentAction(content))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
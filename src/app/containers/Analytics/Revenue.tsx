import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getFoldersAction, moveItemsToFolderAction, Action, addFolderAction, deleteFolderAction, deleteContentAction, restoreContentAction, renameFolderAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SetupPage } from '../../pages/Playlist/Setup/Setup';
import { RevenueAnalytics } from '../../pages/Analytics/Revenue';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { AnalyticsRevenueState, getAnalyticsRevenueRevenueTimeAction, GetAnalyticsRevenueOptions, getAnalyticsRevenueSalesTimeAction, getAnalyticsRevenueSalesCountryAction } from '../../redux-flow/store/Analytics/Revenue';
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
    getRevenueByTime: Function;
    getSalesByTime: Function;
    getSalesPerCountry: Function;
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
        if(!props.analyticsRevenueData.data.revenueByTime) {
            props.getRevenueByTime();
        }
        if(!props.analyticsRevenueData.data.salesByTime) {
            props.getSalesByTime();
        }
        if(!props.analyticsRevenueData.data.salesPerCountry) {
            props.getSalesPerCountry();
        }
    }, [])
    return (
        props.folderData ? 
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
        getFolders: (folderPath: string) => {
            dispatch(getFoldersAction(folderPath));
        },
        getFolderContent: (folderPath: string) => {
            dispatch(getFolderContentAction(folderPath))
        },
        restoreContent: (content: FolderAsset[]) => {
            dispatch(restoreContentAction(content))
        },
        getRevenueByTime: (options: GetAnalyticsRevenueOptions) => {
            dispatch(getAnalyticsRevenueRevenueTimeAction(options))
        },
        getSalesByTime: (options: GetAnalyticsRevenueOptions) => {
            dispatch(getAnalyticsRevenueSalesTimeAction(options))
        },
        getSalesPerCountry: (options: GetAnalyticsRevenueOptions) => {
            dispatch(getAnalyticsRevenueSalesCountryAction(options))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
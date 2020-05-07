import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getFoldersAction, moveItemsToFolderAction, Action, addFolderAction, deleteFolderAction, deleteContentAction, restoreContentAction, renameFolderAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SetupPage } from '../../pages/Playlist/Setup/Setup';
import { ViewershipAnalytics } from '../../pages/Analytics/Viewership';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { GetAnalyticsViewershipOptions, getAnalyticsViewershipDetailsAction, AnalyticsViewershipState, getAnalyticsViewershipViewingTimeAction, getAnalyticsViewershipConsumptionBreakdownAction, getAnalyticsViewershipPlaysViewersTimeAction, getAnalyticsViewershipConsumptionDeviceAction, getAnalyticsViewershipConsumptionDomainAction, getAnalyticsViewershipConcurrentPlaybackAction } from '../../redux-flow/store/Analytics/Viewership';

export interface ViewershipComponentProps {
    folderData: FoldersInfos;
    getFolders: Function;
    getFolderContent: Function;
    moveItemsToFolder: Function;
    addFolder: Function;
    deleteFolder: Function;
    deleteContent: Function;
    restoreContent: Function;
    renameFolder: Function;
    viewershipAnalytics: AnalyticsViewershipState;
    getAnalyticsViewershipViewingTime: Function;
    getAnalyticsViewershipConsumptionBreakdown: Function;
    getAnalyticsViewershipPlaysViewersTime: Function;
    getAnalyticsViewershipConsumptionDevice: Function;
    getAnalyticsViewershipConsumptionDomain: Function;
    getAnalyticsViewershipConcurrentPlayback: Function;
}

const Viewership = (props: ViewershipComponentProps) => {
    React.useEffect(() => {
        if(!props.folderData) {
            const wait = async () => {
                await props.getFolderContent('/')
                //await props.getFolders('/');
            }
            wait()
        }
        console.log(props);
        if(!props.viewershipAnalytics.data.consumptionPerDomain) {
            props.getAnalyticsViewershipConsumptionDomain();
        }
        if(!props.viewershipAnalytics.data.consumptionPerDevices) {
            props.getAnalyticsViewershipConsumptionDevice();
        }
        if(!props.viewershipAnalytics.data.playsViewersPerTime) {
            props.getAnalyticsViewershipPlaysViewersTime();
        }
        if(!props.viewershipAnalytics.data.consumptionBreakdown) {
            props.getAnalyticsViewershipConsumptionBreakdown();
        }
        if(!props.viewershipAnalytics.data.concurrentPlaybackDevice) {
            props.getAnalyticsViewershipConcurrentPlayback();
        }
        if(!props.viewershipAnalytics.data.viewingTimeBreakdown) {
            props.getAnalyticsViewershipViewingTime();
        }
    }, [])
    return (
        props.folderData ? 
            <ViewershipAnalytics {...props} viewershipAnalytics={props.viewershipAnalytics} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        viewershipAnalytics: state.analytics.viewership
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
        getAnalyticsViewershipViewingTime: (dates: GetAnalyticsViewershipOptions) => {
            dispatch(getAnalyticsViewershipViewingTimeAction(dates));
        },
        getAnalyticsViewershipConsumptionBreakdown: (dates: GetAnalyticsViewershipOptions) => {
            dispatch(getAnalyticsViewershipConsumptionBreakdownAction(dates));
        },
        getAnalyticsViewershipPlaysViewersTime: (dates: GetAnalyticsViewershipOptions) => {
            dispatch(getAnalyticsViewershipPlaysViewersTimeAction(dates));
        },
        getAnalyticsViewershipConsumptionDevice: (dates: GetAnalyticsViewershipOptions) => {
            dispatch(getAnalyticsViewershipConsumptionDeviceAction(dates));
        },
        getAnalyticsViewershipConsumptionDomain: (dates: GetAnalyticsViewershipOptions) => {
            dispatch(getAnalyticsViewershipConsumptionDomainAction(dates));
        },
        getAnalyticsViewershipConcurrentPlayback: (dates: GetAnalyticsViewershipOptions) => {
            dispatch(getAnalyticsViewershipConcurrentPlaybackAction(dates));
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewership);
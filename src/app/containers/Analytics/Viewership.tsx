import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, deleteContentAction, restoreContentAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos, ContentType } from '../../redux-flow/store/Folders/types';
import { SetupPage } from '../../pages/Playlist/Setup/Setup';
import { ViewershipAnalytics } from '../../pages/Analytics/Viewership';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { GetAnalyticsViewershipOptions, AnalyticsViewershipState, getAnalyticsViewershipPlaysViewersTimeAction, getAnalyticsViewershipConsumptionDeviceAction, getAnalyticsViewershipConsumptionDomainAction, getAnalyticsViewershipConcurrentPlaybackAction, getAnalyticsViewershipConsumptionBreakdownTimeAction, getAnalyticsViewershipConsumptionBreakdownContentAction, getAnalyticsViewershipConsumptionBreakdownMapAction, getAnalyticsViewershipJobIdsAction, getAnalyticsViewershipViewingTimeDeviceAction, getAnalyticsViewershipViewingTimeContentAction, getAnalyticsViewershipViewingTimeMapAction, getAnalyticsViewershipConcurrentPlaybackDeviceAction, getAnalyticsViewershipConcurrentPlaybackContentAction, getAnalyticsViewershipConcurrentPlaybackMapAction } from '../../redux-flow/store/Analytics/Viewership';

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
                await props.getFolderContent(null)
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
        getFolderContent: (folderPath: string) => {
            dispatch(getFolderContentAction(folderPath))
        },
        restoreContent: (content: ContentType[]) => {
            dispatch(restoreContentAction(content))
        },
        getAnalyticsViewershipJobIds: () => {
            dispatch(getAnalyticsViewershipJobIdsAction())
        },
        getAnalyticsViewershipViewingTimeDevice: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipViewingTimeDeviceAction(jobId, dates));
        },
        getAnalyticsViewershipViewingTimeContent: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipViewingTimeContentAction(jobId, dates));
        },
        getAnalyticsViewershipViewingTimeMap: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipViewingTimeMapAction(jobId, dates));
        },
        getAnalyticsViewershipConsumptionBreakdownTime: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipConsumptionBreakdownTimeAction(jobId, dates));
        },
        getAnalyticsViewershipConsumptionBreakdownContent: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipConsumptionBreakdownContentAction(jobId, dates));
        },
        getAnalyticsViewershipConsumptionBreakdownLocation: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipConsumptionBreakdownMapAction(jobId, dates));
        },
        getAnalyticsViewershipPlaysViewersTime: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipPlaysViewersTimeAction(jobId, dates));
        },
        getAnalyticsViewershipConsumptionDevice: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipConsumptionDeviceAction(jobId, dates));
        },
        getAnalyticsViewershipConsumptionDomain: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipConsumptionDomainAction(jobId, dates));
        },
        getAnalyticsViewershipConcurrentPlaybackDevice: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipConcurrentPlaybackDeviceAction(jobId, dates));
        },
        getAnalyticsViewershipConcurrentPlaybackContent: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipConcurrentPlaybackContentAction(jobId, dates));
        },
        getAnalyticsViewershipConcurrentPlaybackMap: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
            dispatch(getAnalyticsViewershipConcurrentPlaybackMapAction(jobId, dates));
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewership);
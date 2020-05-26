import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, deleteContentAction, restoreContentAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos, ContentType } from '../../redux-flow/store/Folders/types';
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
    jobIds: any;
    restoreContent: Function;
    renameFolder: Function;
    viewershipAnalytics: AnalyticsViewershipState;
    getAnalyticsViewershipJobIds: Function;
    getAnalyticsViewershipPlaysViewersTime: Function;
    getAnalyticsViewershipConsumptionDevice: Function;
    getAnalyticsViewershipConsumptionDomain: Function;
    getAnalyticsViewershipViewingTimeDevice: Function;
    getAnalyticsViewershipViewingTimeContent: Function;
    getAnalyticsViewershipViewingTimeMap: Function;
    getAnalyticsViewershipConsumptionBreakdownTime: Function;
    getAnalyticsViewershipConsumptionBreakdownContent: Function;
    getAnalyticsViewershipConsumptionBreakdownMap: Function;
    getAnalyticsViewershipConcurrentPlaybackDevice: Function;
    getAnalyticsViewershipConcurrentPlaybackContent: Function;
    getAnalyticsViewershipConcurrentPlaybackMap: Function;
}

const Viewership = (props: ViewershipComponentProps) => {

    React.useEffect(() => {
        if(!props.viewershipAnalytics.jobIds) {
            props.getAnalyticsViewershipJobIds()
        }
        
        if(!props.folderData) {
            const wait = async () => {
                await props.getFolderContent(null);
            }
            wait()
        }
    })

    React.useEffect(() => {
        console.log("reset by jobIds")
        if(props.jobIds && props.jobIds !== null) {
            if(!props.viewershipAnalytics.data.consumptionBreakdown.content) {
                props.getAnalyticsViewershipConsumptionBreakdownContent(null, props.viewershipAnalytics.jobIds.consumptionPerContent.jobID);
            }
            if(!props.viewershipAnalytics.data.consumptionBreakdown.map) {
                props.getAnalyticsViewershipConsumptionBreakdownMap(null, props.viewershipAnalytics.jobIds.consumptionPerLocation.jobID);
            }
            if(!props.viewershipAnalytics.data.consumptionBreakdown.time) {
                props.getAnalyticsViewershipConsumptionBreakdownTime(null, props.viewershipAnalytics.jobIds.consumptionPerTime.jobID);
            }
            if(!props.viewershipAnalytics.data.concurrentPlayback.content) {
                props.getAnalyticsViewershipConcurrentPlaybackContent(null, props.viewershipAnalytics.jobIds.concurrentPlaybackPerContent.jobID);
            }
            if(!props.viewershipAnalytics.data.concurrentPlayback.device) {
                props.getAnalyticsViewershipConcurrentPlaybackDevice(null, props.viewershipAnalytics.jobIds.concurrentPlaybackPerDevice.jobID);
            }
            if(!props.viewershipAnalytics.data.concurrentPlayback.map) {
                props.getAnalyticsViewershipConcurrentPlaybackMap(null, props.viewershipAnalytics.jobIds.concurrentPlaybackPerLocation.jobID);
            }
            if(!props.viewershipAnalytics.data.viewingTimeBreakdown.device) {
                props.getAnalyticsViewershipViewingTimeDevice(null, props.viewershipAnalytics.jobIds.viewingTimePerDevice.jobID);
            }
            if(!props.viewershipAnalytics.data.viewingTimeBreakdown.content) {
                props.getAnalyticsViewershipViewingTimeContent(null, props.viewershipAnalytics.jobIds.viewingTimePerContent.jobID);
            }
            if(!props.viewershipAnalytics.data.viewingTimeBreakdown.map) {
                props.getAnalyticsViewershipViewingTimeMap(null, props.viewershipAnalytics.jobIds.viewingTimePerLocation.jobID);
            }
            if(!props.viewershipAnalytics.data.consumptionPerDomain) {
                props.getAnalyticsViewershipConsumptionDomain(null, props.viewershipAnalytics.jobIds.consumptionPerDomain.jobID);
            }
            if(!props.viewershipAnalytics.data.consumptionPerDevices) {
                props.getAnalyticsViewershipConsumptionDevice(null, props.viewershipAnalytics.jobIds.consumptionPerDevice.jobID);
            }
            if(!props.viewershipAnalytics.data.playsViewersPerTime) {
                props.getAnalyticsViewershipPlaysViewersTime(null, props.viewershipAnalytics.jobIds.playsViewersPerTime.jobID);
            }    
        }
        
    }, [props.jobIds])

    return (
        props.folderData ? 
            <ViewershipAnalytics {...props} viewershipAnalytics={props.viewershipAnalytics} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )

}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        viewershipAnalytics: state.analytics.viewership,
        jobIds: state.analytics.viewership.jobIds
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
        getAnalyticsViewershipConsumptionBreakdownMap: (dates: GetAnalyticsViewershipOptions, jobId: string) => {
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
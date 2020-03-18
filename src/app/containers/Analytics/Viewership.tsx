import React from 'react';
import {LoadingSpinner} from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getFoldersAction, moveItemsToFolderAction, Action, addFolderAction, deleteFolderAction, deleteContentAction, restoreContentAction, renameFolderAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FolderAsset, FoldersInfos } from '../../redux-flow/store/Folders/types';
import { SetupPage } from '../../pages/Playlist/Setup/Setup';
import { ViewershipAnalytics } from '../../pages/Analytics/Viewership';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { GetAnalyticsViewershipOptions, getAnalyticsViewershipDetailsAction, AnalyticsViewershipState, AnalyticsViewershipInfos } from '../../redux-flow/store/Analytics/Viewership';

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
    getAnalyticsViewership: Function;
    viewershipAnalytics: AnalyticsViewershipState;
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
        if (!props.viewershipAnalytics.data) {
            props.getAnalyticsViewership();
        }
    }, [])
    return (
        props.folderData && props.viewershipAnalytics.data ? 
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
        getAnalyticsViewership: (dates: GetAnalyticsViewershipOptions) => {
            dispatch(getAnalyticsViewershipDetailsAction(dates));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewership);

import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, deleteContentAction, restoreContentAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos, ContentType } from '../../redux-flow/store/Folders/types';
import { ViewershipAnalytics } from '../../pages/Analytics/Viewership';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { GetAnalyticsViewershipOptions, AnalyticsViewershipState, getAnalyticsViewershipAction } from '../../redux-flow/store/Analytics/Viewership';

export interface ViewershipComponentProps {
    folderData: FoldersInfos;
    viewershipAnalytics: AnalyticsViewershipState;
    getFolderContent: (folderPath: string) => Promise<void>;
    getAnalyticsViewership: (options?: GetAnalyticsViewershipOptions) => Promise<void>;
}

const Viewership = (props: ViewershipComponentProps) => {

    React.useEffect(() => {
        if(!props.viewershipAnalytics) {
            props.getAnalyticsViewership({ end: getCurrentTs('s'), start: Math.floor(new Date().setHours(0, 0, 0, 0)), selectedContents: [] })
        }
        
        if(!props.folderData) {
            const wait = async () => {
                await props.getFolderContent(null);
            }
            wait()
        }
    })

    return (
        props.folderData && props.viewershipAnalytics ? 
            <ViewershipAnalytics {...props} viewershipAnalytics={props.viewershipAnalytics} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )

}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        viewershipAnalytics: state.analytics.viewership,
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getFolderContent: async (folderPath: string) => {
            await dispatch(getFolderContentAction(folderPath))
        },
        getAnalyticsViewership: async (options?: GetAnalyticsViewershipOptions) => {
           await dispatch(getAnalyticsViewershipAction(options))
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewership);
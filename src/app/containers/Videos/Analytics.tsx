import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router';
import { ContentAnalytics } from '../../shared/Analytics/ContentAnalytics';
import { ContentAnalyticsParameters, ContentAnalyticsState, getContentAnalyticsAction } from '../../redux-flow/store/Content/Analytics';
import { Action } from '../../redux-flow/store/Content/Analytics';
import { AudienceDimension } from '../../shared/Analytics/AnalyticsCommun';

const VodAnalytics = (props: { getContentAnalytics: (options: ContentAnalyticsParameters) => Promise<void>, contentAnalyticsData: ContentAnalyticsState }) => {

    let { vodId } = useParams<{vodId: string}>()

    const [isFetching, setIsFetching] = React.useState<boolean>(false)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)
    
    React.useEffect(() => {
        if(!isFetching && (!props.contentAnalyticsData.vod || !props.contentAnalyticsData.vod[vodId])  ) {
            setIsFetching(true);
            props.getContentAnalytics({ id: vodId, timeRange: 'LAST_WEEK', type: "vod", dimension: AudienceDimension }).then(() => setIsFetching(false))
        }
    }, [])
    
    return !isFetching && (props.contentAnalyticsData.vod && props.contentAnalyticsData.vod[vodId])?
        <div className='flex flex-column'>
            <VideoTabs videoId={vodId} />
            <ContentAnalytics {...props} contentAnalyticsData={props.contentAnalyticsData.vod[vodId]} contentType="vod" contentId={vodId} />
        </div>
        : <><VideoTabs videoId={vodId} /><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentAnalyticsData: state.content.analytics
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentAnalytics: async (options: ContentAnalyticsParameters) => {
            await dispatch(getContentAnalyticsAction(options));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodAnalytics)
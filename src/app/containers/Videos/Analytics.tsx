import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { VideoTabs } from './VideoTabs';
import { useParams } from 'react-router';
import { ContentAnalytics, ContentAnalyticsProps } from '../../shared/Analytics/ContentAnalytics';
import { getContentAnalyticsAction } from '../../redux-flow/store/Content/Analytics';
import { Action } from '../../redux-flow/store/Content/Analytics';

const VodAnalytics = (props: ContentAnalyticsProps) => {

    let { vodId } = useParams()

    const [isFetching, setIsFetching] = React.useState<boolean>(false)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    console.log(vodId);
    
    React.useEffect(() => {
        // if(Object.keys(props.contentAnalyticsData).length === 0 && props.contentAnalyticsData.constructor === Object) {
        //     props.getContentAnalytics(liveId, 'vod')
        // }
    }, [])


    
    
    return !isFetching ?
        <div className='flex flex-column'>
            <VideoTabs videoId={vodId} />
            <ContentAnalytics {...props} contentType="vod" contentId={vodId} />
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
        getContentAnalytics: async (liveId: string, contentType: string) => {
            await dispatch(getContentAnalyticsAction(liveId, contentType));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodAnalytics)
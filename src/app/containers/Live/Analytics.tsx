import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentAnalytics, ContentAnalyticsProps } from '../../shared/Analytics/ContentAnalytics';
import { getContentAnalyticsAction } from '../../redux-flow/store/Content/Analytics';
import { Action } from '../../redux-flow/store/Content/Analytics';


const LiveAnalytics = (props: ContentAnalyticsProps) => {

    let { liveId } = useParams()

    const [isFetching, setIsFetching] = React.useState<boolean>(false)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    console.log(liveId);
    
    React.useEffect(() => {
        // if(Object.keys(props.contentAnalyticsData).length === 0 && props.contentAnalyticsData.constructor === Object) {
        //     props.getContentAnalytics(liveId, 'channel')
        // }
    }, [])
        
    return !isFetching ?
        <div className='flex flex-column'>
            <LiveTabs liveId={liveId} />
            <ContentAnalytics {...props} contentType="live" contentId={liveId} />
        </div>
        : <><LiveTabs liveId={liveId} /><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></>
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

export default connect(mapStateToProps, mapDispatchToProps)(LiveAnalytics)
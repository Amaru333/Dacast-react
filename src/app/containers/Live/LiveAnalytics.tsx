import React from 'react'
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ContentPaywallComponentProps } from '../Videos/Paywall';


const LiveAnalytics = (props: ContentPaywallComponentProps) => {

    let { liveId } = useParams()
    const [isFetching, setIsFetching] = React.useState<boolean>(false)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {

    }, [])


    
    
    return !isFetching ?
        <div className='flex flex-column'>
            <LiveTabs liveId={liveId} />
               
        </div>
        : <><LiveTabs liveId={liveId} /><SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer></>
}

export function mapStateToProps(state: ApplicationState) {
    return {
       
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveAnalytics)
import React from 'react';
import { LiveGeneralPage } from '../../pages/Live/General/General'
import { LiveDetails } from '../../redux-flow/store/Live/General/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveDetailsAction } from '../../redux-flow/store/Live/General/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

interface LiveGeneralProps {
    liveDetails: LiveDetails;
    getLiveDetails: Function
}

export const LiveGeneral = (props: LiveGeneralProps) => {

    React.useEffect(() => {
        if (!props.liveDetails) {
            props.getLiveDetails();
        }
    }, [])

    return (
        props.liveDetails ? 
        (
            <LiveGeneralPage {...props} />
        )
        : <LoadingSpinner color='dark-violet' size='large' />
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        liveDetails: state.live.general
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveDetails: () => {
            dispatch(getLiveDetailsAction());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveGeneral);
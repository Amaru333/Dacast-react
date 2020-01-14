import React from 'react';
import { LiveGeneralPage } from '../../pages/Live/General/General'
import { LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from '../../redux-flow/store/Live/General/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveDetailsAction, saveLiveDetailsAction, changeLiveThumbnailAction, changeLiveSplashscreenAction, changeLivePosterAction } from '../../redux-flow/store/Live/General/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';

interface LiveGeneralProps {
    liveDetails: LiveDetails;
    getLiveDetails: Function;
    saveLiveDetails: Function;
    changeLiveThumbnail: Function;
    changeLiveSplashscreen: Function;
    changeLivePoster: Function;
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
        },
        saveLiveDetails: (data: LiveDetails) => {
            dispatch(saveLiveDetailsAction(data));
        },
        changeLiveThumbnail: (data: ThumbnailUpload) => {
            dispatch(changeLiveThumbnailAction(data))
        },
        changeLiveSplashscreen: (data: SplashscreenUpload) => {
            dispatch(changeLiveSplashscreenAction(data))
        },
        changeLivePoster: (data: PosterUpload) => {
            dispatch(changeLivePosterAction(data))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveGeneral);
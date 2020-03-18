import React from 'react';
import { LiveGeneralPage } from '../../pages/Live/General/General'
import { LiveDetails, ThumbnailUpload, SplashscreenUpload, PosterUpload } from '../../redux-flow/store/Live/General/types';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveDetailsAction, saveLiveDetailsAction, changeLiveThumbnailAction, changeLiveSplashscreenAction, changeLivePosterAction, deleteLiveThumbnailAction, deleteLiveSplashscreenAction, deleteLivePosterAction } from '../../redux-flow/store/Live/General/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

interface LiveGeneralProps {
    liveDetails: LiveDetails;
    getLiveDetails: Function;
    saveLiveDetails: Function;
    changeLiveThumbnail: Function;
    deleteLiveThumbnail: Function;
    changeLiveSplashscreen: Function;
    deleteLiveSplashscreen: Function;
    changeLivePoster: Function;
    deleteLivePoster: Function;
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
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
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
        deleteLiveThumbnail: () => {
            dispatch(deleteLiveThumbnailAction())
        },
        changeLiveSplashscreen: (data: SplashscreenUpload) => {
            dispatch(changeLiveSplashscreenAction(data))
        },
        deleteLiveSplashscreen: () => {
            dispatch(deleteLiveSplashscreenAction())
        },
        changeLivePoster: (data: PosterUpload) => {
            dispatch(changeLivePosterAction(data))
        },
        deleteLivePoster: () => {
            dispatch(deleteLivePosterAction())
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveGeneral);
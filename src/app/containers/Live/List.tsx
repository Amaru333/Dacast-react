import React from 'react';
import { LiveListPage } from '../../pages/Live/LiveList/List';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveListAction, deleteLiveChannelAction } from '../../redux-flow/store/Live/General/actions';
import { LiveItem } from '../../redux-flow/store/Live/General/types';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';

export interface LiveListContainerProps {
    liveList: LiveItem[];
    getLiveList: Function;
    deleteLiveChannel: Function;
}

export const LiveList = (props: LiveListContainerProps) => {

   

    React.useEffect(() => {
        if (!props.liveList) {
            props.getLiveList();
        }
    }, [])

    if (!props.liveList) {
        return <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
    } else {
        return (
            <LiveListPage {...props}/>
        )
    }
}

export function mapStateToProps(state: ApplicationState) {
    return {
        liveList: state.live.list
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveList: (qs: string) => {
            dispatch(getLiveListAction(qs));
        },
        deleteLiveChannel: (id: string) => {
            dispatch(deleteLiveChannelAction(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);
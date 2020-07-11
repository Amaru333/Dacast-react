import React from 'react';
import { LiveListPage } from '../../pages/Live/LiveList/List';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveListAction, deleteLiveChannelAction } from '../../redux-flow/store/Live/General/actions';
import { SearchResult } from '../../redux-flow/store/Live/General/types';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { ThemesData } from '../../redux-flow/store/Settings/Theming/types';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';

export interface LiveListComponentProps {
    liveList: SearchResult;
    getLiveList: Function;
    deleteLiveChannel: Function;
    getThemesList: Function;
    themesList: ThemesData;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void
}

export const LiveList = (props: LiveListComponentProps) => {

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
        liveList: state.live.list,
        themesList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveList: async (qs: string) => {
            await dispatch(getLiveListAction(qs));
        },
        deleteLiveChannel: (id: string) => {
            dispatch(deleteLiveChannelAction(id));
        },
        getThemesList: () => {
            dispatch(getThemingListAction())
        },
        showToast: (text: string, size: Size, type: NotificationType) => {
            dispatch(showToastNotification(text, size, type))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);
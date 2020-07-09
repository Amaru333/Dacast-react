import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { Action } from '../../redux-flow/store/VOD/General/actions';
import { getVodListAction, deleteVodAction } from '../../redux-flow/store/VOD/General/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { VideosListProps, VideosListPage } from '../../pages/Videos/VideosList/VideosList';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';

const VideosList = (props: VideosListProps) => {

    React.useEffect(() => {
        if (!props.items) {
            props.getVodList();
        }
    }, [])

    if (!props.items) {
        return <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
    } else {
        return (
            <VideosListPage {...props} />
        )
    }
}

export function mapStateToProps(state: ApplicationState) {
    return {
        items: state.vod.list,
        themesList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodList: (qs: string) => {
            dispatch(getVodListAction(qs));
        },
        deleteVodList: (vodId: string) => {
            dispatch(deleteVodAction(vodId));
        },
        getThemesList: () => {
            dispatch(getThemingListAction())
        },
        showVodDeletedToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosList);
import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentListPage } from '../../shared/List/contentList';
import { ContentListProps } from '../Videos/VideosList';
import { Action, getContentListAction, deleteContentAction } from '../../redux-flow/store/Content/List/actions';
import { getDashboardLiveAction } from '../../redux-flow/store/Dashboard/actions';

export const LiveList = (props: ContentListProps) => {

    return <ContentListPage
        contentType="live"
        items={props.contentListState['live']}
        themesList={props.themesList}
        getContentList={props.getContentList}
        deleteContentList={props.deleteContentList}
        getThemesList={props.getThemesList}
        showToast={props.showToast}
        getDashboardLive={props.getDashboardLive}
        infos={props.infos}
    />
}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentListState: state.content.list,
        themesList: state.settings.theming,
        infos: state.dashboard.info
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentList: async (qs: string) => {
            await dispatch(getContentListAction('live')(qs))
        },
        deleteContentList: async (contentId: string) => {
            await dispatch(deleteContentAction('live')(contentId))
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction(undefined))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        },
        getDashboardLive: async () => {
            await dispatch(getDashboardLiveAction(undefined));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);

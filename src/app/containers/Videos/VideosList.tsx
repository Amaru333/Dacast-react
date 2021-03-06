import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { Action, getContentListAction, deleteContentAction } from '../../redux-flow/store/Content/List/actions';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { ThemesData } from '../../redux-flow/store/Settings/Theming/types';
import {ContentListPage} from '../../shared/List/contentList'
import { ContentListState } from '../../redux-flow/store/Content/List/types';
import { DashboardInfos } from '../../redux-flow/store/Dashboard';

export interface ContentListProps {
    contentListState: ContentListState;
    themesList: ThemesData;
    infos: DashboardInfos;
    getContentList: (qs: string) => Promise<void>;
    deleteContentList: (contentId: string) => Promise<void>;
    getThemesList: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const VideosList = (props: ContentListProps) => {

    return <ContentListPage
        contentType="vod"
        items={props.contentListState['vod']}
        themesList={props.themesList}
        getContentList={props.getContentList}
        deleteContentList={props.deleteContentList}
        getThemesList={props.getThemesList}
        showToast={props.showToast}
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
            await dispatch(getContentListAction('vod')(qs))
        },
        deleteContentList: async (contentId: string) => {
            await dispatch(deleteContentAction('vod')(contentId))
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction(undefined))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosList);

import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentListPage } from '../../shared/List/contentList';
import { ContentListProps } from '../Videos/VideosList';
import { Action, getContentListAction, deleteContentAction } from '../../redux-flow/store/Content/List/actions';

const PlaylistList = (props: ContentListProps) => {


    return <ContentListPage
            contentType="playlist" 
            items={props.contentListState['playlist']}
            themesList={props.themesList}
            getContentList={props.getContentList}
            deleteContentList={props.deleteContentList}
            getThemesList={props.getThemesList}
            showToast={props.showToast}
         />

}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentListState: state.content.list,
        themeList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentList: async (qs: string) => {
            await dispatch(getContentListAction('playlist')(qs))
        },
        deleteContentList: async (contentId: string) => {
            await dispatch(deleteContentAction('playlist')(contentId))
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction(undefined))
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);
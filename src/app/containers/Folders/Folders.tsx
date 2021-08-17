import React from 'react';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, restoreContentAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos, FolderContent } from '../../redux-flow/store/Folders/types';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { ThemesData } from '../../redux-flow/store/Settings/Theming';
import { ContentType } from '../../redux-flow/store/Common/types';
import { deleteContentAction } from '../../redux-flow/store/Content/List/actions';

export interface FoldersComponentProps {
    folderData: FoldersInfos;
    themesList: ThemesData
    getFolderContent: (qs: string) => Promise<void>;
    restoreContent: (content: FolderContent[]) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    getThemesList: () => Promise<void>;
    deleteContent: (contentId: string, contentType: ContentType) => Promise<void>;
}

const Folders = (props: FoldersComponentProps) => {

    return <FoldersPage {...props} />
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        themesList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getFolderContent: async (qs: string) => {
            await dispatch(getFolderContentAction(qs))
        },
        restoreContent: async (content: FolderContent[]) => {
            await dispatch(restoreContentAction(content))
        },
        showToast: (text: string, size: Size, type: NotificationType) => {
            dispatch(showToastNotification(text, size, type))
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction(undefined))
        },
        deleteContent: async (contentId: string, contentType: ContentType) => {
            await dispatch(deleteContentAction(contentType)(contentId))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
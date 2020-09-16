import React from 'react';
import {LoadingSpinner} from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { FoldersPage } from '../../pages/Folders/Folders';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Action, deleteContentAction, restoreContentAction, getFolderContentAction } from '../../redux-flow/store/Folders/actions';
import { FoldersInfos, ContentType } from '../../redux-flow/store/Folders/types';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { ThemesData } from '../../redux-flow/store/Settings/Theming';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
export interface FoldersComponentProps {
    folderData: FoldersInfos;
    themesList: ThemesData
    getFolderContent: (qs: string) => Promise<void>;
    deleteContent: (content: ContentType[]) => Promise<void>;
    restoreContent: (content: ContentType[]) => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
    getThemesList: () => Promise<void>;
}

const Folders = (props: FoldersComponentProps) => {
    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getFolderContent(null)
        .then(() => setIsFetching(false))
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    if(isFetching) {
        return <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    }
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
        deleteContent: async (content: ContentType[]) => {
            await dispatch(deleteContentAction(content))
        },
        restoreContent: async (content: ContentType[]) => {
            await dispatch(restoreContentAction(content))
        },
        showToast: (text: string, size: Size, type: NotificationType) => {
            dispatch(showToastNotification(text, size, type))
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
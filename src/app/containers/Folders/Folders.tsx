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
export interface FoldersComponentProps {
    folderData: FoldersInfos;
    themesList: ThemesData
    getFolderContent: Function;
    deleteContent: Function;
    restoreContent: Function;
    showToast: Function;
    getThemesList: Function;
}

const Folders = (props: FoldersComponentProps) => {
    React.useEffect(() => {
        if(!props.folderData.requestedContent) {
                props.getFolderContent(null)       
        }
        
    }, [])
    return (
        props.folderData ? 
            <FoldersPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data,
        themesList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getFolderContent: (qs: string) => {
            dispatch(getFolderContentAction(qs))
        },
        deleteContent: (content: ContentType[]) => {
            dispatch(deleteContentAction(content))
        },
        restoreContent: (content: ContentType[]) => {
            dispatch(restoreContentAction(content))
        },
        showToast: (text: string, size: Size, type: NotificationType) => {
            dispatch(showToastNotification(text, size, type))
        },
        getThemesList: () => {
            dispatch(getThemingListAction())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
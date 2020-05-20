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
export interface FoldersComponentProps {
    folderData: FoldersInfos;
    getFolderContent: Function;
    deleteContent: Function;
    restoreContent: Function;
    showToast: Function;
}

const Folders = (props: FoldersComponentProps) => {
    React.useEffect(() => {
        if(!props.folderData.requestedContent) {
            const wait = async () => {
                await props.getFolderContent(null)
            }
            wait()
        }
    }, [])
    return (
        props.folderData.requestedContent ? 
            <FoldersPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}


export function mapStateToProps(state: ApplicationState) {
    return {
        folderData: state.folders.data
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
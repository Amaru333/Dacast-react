import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentListPage } from '../../shared/List/contentList';
import { ContentListProps } from '../Videos/VideosList';
import { Action, getContentListAction, deleteContentAction } from '../../redux-flow/store/Content/List/actions';

export const LiveList = (props: ContentListProps) => {

    const [isFetching, setIsFetching] = React.useState<boolean>(true)

    React.useEffect(() => {     
        props.getContentList(null, 'live')
        .then(() => setIsFetching(false))
    }, [])

    return !isFetching ? 
        <ContentListPage
            contentType="live" 
            items={props.contentListState['live']}
            themesList={props.themesList}
            getContentList={props.getContentList}
            deleteContentList={props.deleteContentList}
            getThemesList={props.getThemesList}
            showToast={props.showToast}
         />

        : <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentListState: state.content.list,
        themesList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentList: async (qs: string, contentType: string) => {
            await dispatch(getContentListAction(qs, contentType))
        },
        deleteContentList: async (contentId: string, contentType: string) => {
            await dispatch(deleteContentAction(contentId, contentType))
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction())
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);
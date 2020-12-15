import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { Action, getContentListAction, deleteContentAction } from '../../redux-flow/store/Content/List/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { ThemesData } from '../../redux-flow/store/Settings/Theming/types';
import {ContentListPage} from '../../shared/List/contentList'
import { ContentListState } from '../../redux-flow/store/Content/List/types';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { ContentType } from '../../redux-flow/store/Common/types';

export interface ContentListProps {
    contentListState: ContentListState;
    themesList: ThemesData;
    getContentList: (qs: string) => Promise<void>;
    deleteContentList: (voidId: string, contentType: string) => Promise<void>;
    getThemesList: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const VideosList = (props: ContentListProps) => {

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {     
        props.getContentList(null)
        .then(() => setIsFetching(false))
        .catch(() => setNodataFetched(true))

    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return !isFetching ? 
        <ContentListPage
            contentType="vod" 
            items={props.contentListState['vod']}
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
        getContentList: async (qs: string) => {
            await dispatch(getContentListAction('vod')(qs))
        },
        deleteContentList: async (contentId: string, contentType: string) => {
            await dispatch(deleteContentAction(contentId, contentType))
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
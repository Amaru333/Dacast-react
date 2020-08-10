import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { Action } from '../../redux-flow/store/VOD/General/actions';
import { getVodListAction, deleteVodAction } from '../../redux-flow/store/VOD/General/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { SearchResult } from '../../redux-flow/store/VOD/General/types';
import { ThemesData } from '../../redux-flow/store/Settings/Theming/types';
import {ContentListPage} from '../../shared/List/contentList'

export interface VideosListProps {
    items: SearchResult;
    themesList: ThemesData;
    getVodList: (qs: string) => Promise<void>;
    deleteVodList: (voidId: string) => Promise<void>;
    getThemesList: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}

const VideosList = (props: VideosListProps) => {

    React.useEffect(() => {     
        props.getVodList(null)
    }, [])

    return props.items ? 
        <ContentListPage
            contentType="videos" 
            items={props.items}
            themesList={props.themesList}
            getContentList={props.getVodList}
            deleteContentList={props.deleteVodList}
            getThemesList={props.getThemesList}
            showToast={props.showToast}
         />
        : <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        items: state.vod.list,
        themesList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodList: async (qs: string) => {
            await dispatch(getVodListAction(qs))
        },
        deleteVodList: async (vodId: string) => {
            await dispatch(deleteVodAction(vodId))
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction())
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosList);
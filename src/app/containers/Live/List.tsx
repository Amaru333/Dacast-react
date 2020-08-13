import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { Action, getLiveListAction, deleteLiveChannelAction } from '../../redux-flow/store/Live/General/actions';
import { SearchResult } from '../../redux-flow/store/Live/General/types';
import { connect } from 'react-redux';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { ThemesData } from '../../redux-flow/store/Settings/Theming/types';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentListPage } from '../../shared/List/contentList';

export interface LiveListComponentProps {
    liveList: SearchResult;
    themesList: ThemesData;
    getLiveList: (qs: string) => Promise<void>;
    deleteLiveChannel: (id: string) => Promise<void>;
    getThemesList: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void
}

export const LiveList = (props: LiveListComponentProps) => {

    React.useEffect(() => {
        props.getLiveList(null)
    }, [])

    return props.liveList ? 
        <ContentListPage
            contentType="livestreams" 
            items={props.liveList}
            themesList={props.themesList}
            getContentList={props.getLiveList}
            deleteContentList={props.deleteLiveChannel}
            getThemesList={props.getThemesList}
            showToast={props.showToast}
        />

        : <SpinnerContainer><LoadingSpinner className="mlauto mrauto" size="medium" color="violet" /></SpinnerContainer>
}

export function mapStateToProps(state: ApplicationState) {
    return {
        liveList: state.live.list,
        themesList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveList: async (qs: string) => {
            await dispatch(getLiveListAction(qs));
        },
        deleteLiveChannel: async (id: string) => {
            await dispatch(deleteLiveChannelAction(id));
        },
        getThemesList: async () => {
            await dispatch(getThemingListAction())
        },
        showToast: (text: string, size: Size, type: NotificationType) => {
            dispatch(showToastNotification(text, size, type))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveList);
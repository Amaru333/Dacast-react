import React from 'react';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ContentListPage } from '../../shared/List/contentList';
import { ContentListProps } from '../Videos/VideosList';
import { Action, getContentListAction, deleteContentAction } from '../../redux-flow/store/Content/List/actions';
import { EmptyCardExpos } from '../../pages/Expos/EmptyCardExpos';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

const ExposList = (props: ContentListProps) => {

    const [isFetching, setIsFetching] = React.useState<boolean>(true)

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if(!noDataFetched) {
            props.getContentList(null, 'expo')        
            .then(() => {
                setIsFetching(false)
            })
            .catch(() => setNodataFetched(true))
        } 
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }
    
    return !isFetching ? 
        <>
        {
            props.contentListState['expo'].countTotal === 0 ? 
            <EmptyCardExpos /> :
            <ContentListPage
                contentType='expo'
                items={props.contentListState['expo']}
                themesList={props.themesList}
                getContentList={props.getContentList}
                deleteContentList={props.deleteContentList}
                getThemesList={props.getThemesList}
                showToast={props.showToast}
            />}
        </>
        : <SpinnerContainer><LoadingSpinner size="medium" color="violet" /></SpinnerContainer>


}

export function mapStateToProps(state: ApplicationState) {
    return {
        contentListState: state.content.list,
        themeList: state.settings.theming
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

export default connect(mapStateToProps, mapDispatchToProps)(ExposList);
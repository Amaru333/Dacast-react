import React from 'react';
import { LiveThemingPage } from '../../pages/Live/Theming/Theming';
import { ThemesData, Action, getThemingListAction, ContentTheme } from '../../redux-flow/store/Settings/Theming';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { getLiveThemeAction, saveLiveThemeAction } from '../../redux-flow/store/Live/Theming/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { handleCustomTheme } from '../../shared/Theming/handleCustomTheme';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';

export interface LiveThemingComponentProps {
    theme: ContentTheme;
    themeList: ThemesData;
    getLiveTheme: Function;
    saveLiveTheme: Function;
    getThemingList: Function;
    setCustomThemeList: Function;
    showDiscardToast: Function;
}

export const LiveTheming = (props: LiveThemingComponentProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if(!props.theme) {
            props.getLiveTheme();            
        }
        if(!props.themeList) {
            props.getThemingList();
        }
    }, [])
    
    const [customThemeList, setCustomThemeList] = React.useState<ThemesData>(null)
    
    React.useEffect(() => {
        handleCustomTheme(props.theme, props.themeList, setCustomThemeList) 
    }, [props.themeList, props.theme])
    
    return (
        props.theme && customThemeList ?
            <div className='flex flex-column'>
                <LiveTabs liveId={liveId} />
                <LiveThemingPage setCustomThemeList={setCustomThemeList} themeList={customThemeList} {...props} />
            </div>
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
    
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        theme: state.live.theming,
        themeList: state.settings.theming
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveTheme: () => {
            dispatch(getLiveThemeAction());
        },
        saveLiveTheme: (theme: ContentTheme) => {
            dispatch(saveLiveThemeAction(theme));
        },
        getThemingList: () => {
            dispatch(getThemingListAction())
        },
        showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveTheming);
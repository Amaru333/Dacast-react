import React from 'react';
import { Action, ContentTheme, ThemeOptions, ContentThemeState } from '../../redux-flow/store/Settings/Theming';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { getLiveThemeAction, saveLiveThemeAction } from '../../redux-flow/store/Live/Theming/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { Size, NotificationType } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ThemingControlsCard } from '../../shared/Theming/ThemingControlsCard';

export interface LiveThemingComponentProps {
    theme: ContentTheme;
    themeState: ContentThemeState;
    getLiveTheme: Function;
    saveLiveTheme: Function;
    showDiscardToast: Function;
}

export const LiveTheming = (props: LiveThemingComponentProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if(!props.themeState[liveId]) 
            props.getLiveTheme(liveId);            
    }, [])
    
    return (
        props.themeState[liveId] ?
            <div className='flex flex-column'>
                <LiveTabs liveId={liveId} />
                <ThemingControlsCard
                    theme={props.themeState[liveId]} 
                    saveTheme={props.saveLiveTheme}
                    contentType='live'
                    actionType='Save'
                />            
            </div>
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
    
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        themeState: state.live.theming,
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveTheme: (liveId: string) => {
            dispatch(getLiveThemeAction(liveId));
        },
        saveLiveTheme: (theme: ThemeOptions, liveId: string) => {
            dispatch(saveLiveThemeAction(theme, liveId));
        },
        showDiscardToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveTheming);
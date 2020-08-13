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
    getLiveTheme: (liveId: string) => Promise<void>;
    saveLiveTheme: (theme: ThemeOptions, liveId: string) => Promise<void>;
}

export const LiveTheming = (props: LiveThemingComponentProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if (!props.themeState[liveId])
            props.getLiveTheme(liveId)
    }, [])

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.themeState[liveId] ?
                    <div className='flex flex-column'>
                        <ThemingControlsCard
                            theme={props.themeState[liveId]}
                            saveTheme={props.saveLiveTheme}
                            contentType='live'
                            actionType='Save'
                            contentId={liveId}
                        />
                    </div>
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )

}

export function mapStateToProps(state: ApplicationState) {
    return {
        themeState: state.live.theming,
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getLiveTheme: async (liveId: string) => {
            await dispatch(getLiveThemeAction(liveId))
        },
        saveLiveTheme: async (theme: ThemeOptions, liveId: string) => {
            await dispatch(saveLiveThemeAction(theme, liveId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveTheming);
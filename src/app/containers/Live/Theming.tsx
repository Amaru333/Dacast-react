import React from 'react';
import { Action, ThemeOptions } from '../../redux-flow/store/Settings/Theming';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { LiveTabs } from './LiveTabs';
import { useParams } from 'react-router';
import { ThemingControlsCard } from '../../shared/Theming/ThemingControlsCard';
import { getContentThemeAction, saveContentThemeAction } from '../../redux-flow/store/Content/Theming/actions';
import { ContentThemingComponentProps } from '../Videos/Theming';

export const LiveTheming = (props: ContentThemingComponentProps) => {

    let { liveId } = useParams()

    React.useEffect(() => {
        if (!props.themeState[liveId])
            props.getContentTheme(liveId, 'live')
    }, [])

    return (
        <>
            <LiveTabs liveId={liveId} />
            {
                props.themeState['live'] && props.themeState['live'][liveId] ?
                    <div className='flex flex-column'>
                        <ThemingControlsCard
                            theme={props.themeState['live'][liveId]}
                            saveTheme={props.saveContentTheme}
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
        themeState: state.content.theming,
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getContentTheme: async (contentId: string, contentType: string) => {
            await dispatch(getContentThemeAction(contentId, contentType))
        },
        saveContentTheme: async (theme: ThemeOptions, contentId: string, contentType: string) => {
            await dispatch(saveContentThemeAction(theme, contentId, contentType))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveTheming);
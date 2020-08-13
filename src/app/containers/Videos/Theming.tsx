import React from 'react';
import { ContentTheme, ThemeOptions, ContentThemeState } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getVodThemeAction, saveVodThemeAction } from '../../redux-flow/store/VOD/Theming/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { ThemingControlsCard } from '../../shared/Theming/ThemingControlsCard';

export interface VodThemingComponentProps {
    theme: ContentTheme;
    themeState: ContentThemeState;
    getVodTheme: (vodId: string) => Promise<void>;
    saveVodTheme: (theme: ThemeOptions, vodId: string) => Promise<void>;
}

export const VodTheming = (props: VodThemingComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if (!props.themeState[vodId]) {
            props.getVodTheme(vodId)
        }
    }, [])

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.themeState[vodId] ?
                    <div className='flex flex-column'>
                        <ThemingControlsCard
                            theme={props.themeState[vodId]}
                            saveTheme={props.saveVodTheme}
                            contentType='vod'
                            actionType='Save'
                            contentId={vodId}
                        />
                    </div>
                    : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
            }
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        themeState: state.vod.theming,
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodTheme: async (vodId: string) => {
            await dispatch(getVodThemeAction(vodId))
        },
        saveVodTheme: async (theme: ThemeOptions, vodId: string) => {
            await dispatch(saveVodThemeAction(theme, vodId))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodTheming);
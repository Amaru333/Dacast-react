import React from 'react';
import { ContentTheme, ThemeOptions, ContentThemeState } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';
import { ThemingControlsCard } from '../../shared/Theming/ThemingControlsCard';
import { Action, getContentThemeAction, saveContentThemeAction } from '../../redux-flow/store/Content/Theming/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface ContentThemingComponentProps {
    theme: ContentTheme;
    themeState: ContentThemeState;
    getContentTheme: (contentId: string, contentType: string) => Promise<void>;
    saveContentTheme: (theme: ThemeOptions, contentId: string, contentType: string) => Promise<void>;
}

export const VodTheming = (props: ContentThemingComponentProps) => {

    let { vodId } = useParams()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (!props.themeState[vodId]) {
            props.getContentTheme(vodId, 'vod')
            .catch(() => setNodataFetched(true))
        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            <VideoTabs videoId={vodId} />
            {
                props.themeState['vod'] && props.themeState['vod'][vodId] ?
                    <div className='flex flex-column'>
                        <ThemingControlsCard
                            theme={props.themeState['vod'][vodId]}
                            saveTheme={props.saveContentTheme}
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
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodTheming);
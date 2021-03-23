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
import { Action, createContentCustomThemeAction, getContentThemeAction, saveContentThemeAction } from '../../redux-flow/store/Content/Theming/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { ContentType } from '../../redux-flow/store/Common/types';

export interface ContentThemingComponentProps {
    theme: ContentTheme;
    themeState: ContentThemeState;
    getContentTheme: (contentId: string, contentType: ContentType) => Promise<void>;
    createContentCustomTheme: (theme: ThemeOptions, contentId: string, contentType: ContentType) => Promise<void>;
    saveContentTheme: (theme: ThemeOptions, contentId: string, contentType: ContentType) => Promise<void>;
}

export const VodTheming = (props: ContentThemingComponentProps) => {

    let { vodId } = useParams<{vodId: string}>()
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
                            createContentCustomTheme={props.createContentCustomTheme}
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
        getContentTheme: async (contentId: string, contentType: ContentType) => {
            await dispatch(getContentThemeAction(contentType)(contentId))
        },
        createContentCustomTheme: async (theme: ThemeOptions, contentId: string, contentType: ContentType) => {
            await dispatch(createContentCustomThemeAction(contentType)({theme: theme, contentId: contentId}))
        },
        saveContentTheme: async (theme: ThemeOptions, contentId: string, contentType: ContentType) => {
            await dispatch(saveContentThemeAction(contentType)({theme: theme, contentId: contentId}))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodTheming);
import React from 'react';
import { ThemeOptions } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action } from '../../redux-flow/store/Content/Theming/actions';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { useParams } from 'react-router';
import { PlaylistsTabs } from './PlaylistTabs';
import { ThemingControlsCard } from '../../shared/Theming/ThemingControlsCard';
import { ContentThemingComponentProps } from '../Videos/Theming';
import { getContentThemeAction, saveContentThemeAction } from '../../redux-flow/store/Content/Theming/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { ContentType } from '../../redux-flow/store/Common/types';

const PlaylistTheming = (props: ContentThemingComponentProps) => {

    let { playlistId } = useParams<{playlistId: string}>()
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getContentTheme(playlistId, 'playlist')
        .catch(() => setNodataFetched(true))
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }


    return (
        <>
            <PlaylistsTabs playlistId={playlistId} />
            {props.themeState['playlist'] && props.themeState['playlist'][playlistId] ?
                <div className='flex flex-column'>
                    <ThemingControlsCard
                        theme={props.themeState['playlist'][playlistId]}
                        saveTheme={props.saveContentTheme}
                        contentType='playlist'
                        actionType='Save'
                        contentId={playlistId}
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
        saveContentTheme: async (theme: ThemeOptions, contentId: string, contentType: string) => {
            await dispatch(saveContentThemeAction(theme, contentId, contentType))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTheming);
import React from 'react';
import { ContentTheme, ThemeOptions } from '../../redux-flow/store/Settings/Theming/types';
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
    getVodTheme: Function;
    saveVodTheme: Function;
}

export const VodTheming = (props: VodThemingComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        props.getVodTheme(vodId);
    }, [])
    
    return (
        props.theme ?
            <div className='flex flex-column'>
                <VideoTabs videoId={vodId} />
                <ThemingControlsCard
                    theme={props.theme} 
                    saveTheme={props.saveVodTheme}
                    contentType='vod'
                    actionType='Save'
                    contentId={vodId}
                />
            </div>
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        theme: state.vod.theming,
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodTheme: (vodId: string) => {
            dispatch(getVodThemeAction(vodId));
        },
        saveVodTheme: (theme: ThemeOptions, vodId: string) => {
            dispatch(saveVodThemeAction(theme, vodId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodTheming);
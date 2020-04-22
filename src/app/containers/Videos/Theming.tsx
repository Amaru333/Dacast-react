import React from 'react';
import { VodThemingPage } from '../../pages/Videos/Theming/Theming';
import { ThemesData, ContentTheme } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getVodThemeAction, saveVodThemeAction } from '../../redux-flow/store/VOD/Theming/actions';
import { connect } from 'react-redux';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { handleCustomTheme } from '../../shared/Theming/handleCustomTheme';
import { useParams } from 'react-router-dom';
import { VideoTabs } from './VideoTabs';

export interface VodThemingComponentProps {
    theme: ContentTheme;
    themeList: ThemesData;
    getVodTheme: Function;
    saveVodTheme: Function;
    getThemingList: Function;
    setCustomThemeList: Function;
}

export const VodTheming = (props: VodThemingComponentProps) => {

    let { vodId } = useParams()

    React.useEffect(() => {
        if(!props.theme) {
            props.getVodTheme();
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
                <VideoTabs videoId={vodId} />
                <VodThemingPage setCustomThemeList={setCustomThemeList} themeList={customThemeList} {...props} />
            </div>
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState ) {
    return {
        theme: state.vod.theming,
        themeList: state.settings.theming
    }
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getVodTheme: () => {
            dispatch(getVodThemeAction());
        },
        saveVodTheme: (theme: ContentTheme) => {
            dispatch(saveVodThemeAction(theme));
        },
        getThemingList: () => {
            dispatch(getThemingListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodTheming);
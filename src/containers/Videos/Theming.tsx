import React from 'react';
import { VodThemingPage } from '../../pages/Videos/Theming/Theming';
import { VodTheme } from '../../redux-flow/store/VOD/Theming/types';
import { ThemesData } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getVodThemeAction, saveVodThemeAction } from '../../redux-flow/store/VOD/Theming/actions';
import { connect } from 'react-redux';
import { getThemingListAction } from '../../redux-flow/store/Settings/Theming/actions';

export interface VodThemingComponentProps {
    theme: VodTheme;
    themeList: ThemesData;
    getVodTheme: Function;
    saveVodTheme: Function;
    getThemingList: Function;
}

export const VodTheming = (props: VodThemingComponentProps) => {
    return (
        <VodThemingPage {...props} />
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
        saveVodTheme: (theme: VodTheme) => {
            dispatch(saveVodThemeAction(theme));
        },
        getThemingList: () => {
            dispatch(getThemingListAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodTheming);
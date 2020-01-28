import React from 'react';
import { VodThemingPage } from '../../pages/Videos/Theming/Theming';
import { VodTheme } from '../../redux-flow/store/VOD/Theming/types';
import { ThemeOptions } from '../../redux-flow/store/Settings/Theming/types';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux-flow/store';
import { Action, getVodThemeAction } from '../../redux-flow/store/VOD/Theming/actions';
import { connect } from 'react-redux';

export interface VodThemingComponentProps {
    theme: VodTheme;
    themeList: ThemeOptions[];
    getVodTheme: Function;
}

export const VodTheming = () => {
    return (
        <VodThemingPage />
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VodTheming);
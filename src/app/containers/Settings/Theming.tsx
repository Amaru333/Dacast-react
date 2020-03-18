import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ThemeOptions, Action, getThemingListAction, saveThemeAction, createThemeAction, deleteThemeAction, ThemesData } from '../../redux-flow/store/Settings/Theming';
import {ThemingPage} from '../../pages/Settings/Theming/Theming';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface ThemingComponentProps {
    themingList: ThemesData;
    getThemingList: Function;
    saveTheme: Function;
    createTheme: Function;
    deleteTheme: Function;
}

export const Theming = (props: ThemingComponentProps) => {

    React.useEffect(() => {
        if(!props.themingList) {
            props.getThemingList();
        }
    }, [])
    return (
        props.themingList ?
            <ThemingPage {...props} />
            : <SpinnerContainer><LoadingSpinner color='violet' size='medium' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        themingList: state.settings.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getThemingList: () => {
            dispatch(getThemingListAction());
        },
        saveTheme: (theme: ThemeOptions) => {
            dispatch(saveThemeAction(theme));
        },
        createTheme: (theme: ThemeOptions) => {
            dispatch(createThemeAction(theme));
        },
        deleteTheme: (theme: ThemeOptions) => {
            dispatch(deleteThemeAction(theme));
        },
    };
}

   
export default  connect(mapStateToProps, mapDispatchToProps)(Theming);
import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ThemeOptions, Action, getThemingListAction, saveThemeAction, createThemeAction, deleteThemeAction, ThemesData } from '../../redux-flow/store/Settings/Theming';
import {ThemingPage} from '../../pages/Settings/Theming/Theming';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface ThemingComponentProps {
    themingList: ThemesData;
    getThemingList: () => Promise<void>;
    saveTheme: (theme: ThemeOptions, contentId: string) => Promise<void>;
    createTheme: (theme: ThemeOptions) => Promise<void>;
    deleteTheme: (theme: ThemeOptions) => Promise<void>;
}

export const Theming = (props: ThemingComponentProps) => {

    React.useEffect(() => {
        if(!props.themingList) {
            props.getThemingList()
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
        getThemingList: async () => {
            await dispatch(getThemingListAction())
        },
        saveTheme: async (theme: ThemeOptions, contentId: string) => {
            await dispatch(saveThemeAction(theme))
        },
        createTheme: async (theme: ThemeOptions) => {
            await dispatch(createThemeAction(theme))
        },
        deleteTheme: async (theme: ThemeOptions) => {
            await dispatch(deleteThemeAction(theme))
        },
    };
}

   
export default  connect(mapStateToProps, mapDispatchToProps)(Theming);
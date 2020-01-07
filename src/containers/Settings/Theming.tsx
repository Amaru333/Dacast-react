import React from 'react';
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { ApplicationState } from "../../redux-flow/store";
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { ThemeOptions, Action, getThemingListAction, ThemesData } from '../../redux-flow/store/Settings/Theming';
import {ThemingPage} from '../../pages/Settings/Theming/Theming';

export interface ThemingComponentProps {
    themingList: ThemesData;
    getThemingList: Function;
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
            : <LoadingSpinner color='violet80' size='large' />
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
    };
}

   
export default  connect(mapStateToProps, mapDispatchToProps)(Theming);
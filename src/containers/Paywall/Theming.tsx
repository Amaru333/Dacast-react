import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PaywallThemingPage } from '../../pages/Paywall/Theming/Theming';
import { Action, PaywallThemingData, getPaywallThemesAction, PaywallTheme, savePaywallThemeAction, createPaywallThemeAction, deletePaywallThemeAction } from '../../redux-flow/store/Paywall/Theming';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface PaywallThemingComponentProps {
    paywallThemes: PaywallThemingData;
    getPaywallThemes: Function;
    savePaywallTheme: Function;
    createPaywallTheme: Function;
    deletePaywallTheme: Function;
}

const PaywallTheming = (props: PaywallThemingComponentProps) => {

    React.useEffect(() => {
        if(!props.paywallThemes) {
            props.getPaywallThemes();
        }
    }, [])

    return (
        props.paywallThemes ?
            <PaywallThemingPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        paywallThemes: state.paywall.theming
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPaywallThemes: () => {
            dispatch(getPaywallThemesAction());
        },
        savePaywallTheme: (data: PaywallTheme) => {
            dispatch(savePaywallThemeAction(data));
        },
        createPaywallTheme: (data: PaywallTheme) => {
            dispatch(createPaywallThemeAction(data));
        },
        deletePaywallTheme: (data: PaywallTheme) => {
            dispatch(deletePaywallThemeAction(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaywallTheming);
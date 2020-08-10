import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PaywallThemingPage } from '../../pages/Paywall/Theming/Theming';
import { Action, PaywallThemingData, getPaywallThemesAction, PaywallTheme, savePaywallThemeAction, createPaywallThemeAction, deletePaywallThemeAction } from '../../redux-flow/store/Paywall/Theming';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { CompanyPageInfos, getCompanyPageDetailsAction } from '../../redux-flow/store/Account/Company';

export interface PaywallThemingComponentProps {
    paywallThemes: PaywallThemingData;
    companyState: CompanyPageInfos;
    getPaywallThemes: () => Promise<void>;
    savePaywallTheme: (data: PaywallTheme) => Promise<void>;
    createPaywallTheme: (data: PaywallTheme) => Promise<void>;
    deletePaywallTheme: (data: PaywallTheme) => Promise<void>;
    getCompanyState: () => Promise<void>;
}

const PaywallTheming = (props: PaywallThemingComponentProps) => {

    React.useEffect(() => {
        if(!props.paywallThemes) {
            props.getPaywallThemes()
        }
        if(!props.companyState) {
            props.getCompanyState()
        }
    }, [])

    return (
        props.paywallThemes && props.companyState ?
            <PaywallThemingPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        paywallThemes: state.paywall.theming,
        companyState: state.account.company
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPaywallThemes: async () => {
            await dispatch(getPaywallThemesAction())
        },
        savePaywallTheme: async (data: PaywallTheme) => {
            await dispatch(savePaywallThemeAction(data))
        },
        createPaywallTheme: async (data: PaywallTheme) => {
            await dispatch(createPaywallThemeAction(data))
        },
        deletePaywallTheme: async (data: PaywallTheme) => {
            await dispatch(deletePaywallThemeAction(data))
        },
        getCompanyState: async () => {
            await dispatch(getCompanyPageDetailsAction())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaywallTheming);
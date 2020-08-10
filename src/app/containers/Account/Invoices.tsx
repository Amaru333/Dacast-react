import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { ThunkDispatch } from 'redux-thunk';
import { Invoice, getInvoicesAction, Action } from '../../redux-flow/store/Account/Invoices';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InvoicesPage } from '../../pages/Account/Invoices/Invoices';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface InvoicesComponentProps {
    invoices: Invoice[];
    getInvoices: () => Promise<void>;
}

const Invoices = (props: InvoicesComponentProps) => {

    React.useEffect(() => {
        props.getInvoices();
    }, [])

    return (
        props.invoices ?
            <InvoicesPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        invoices: state.account.invoices
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getInvoices: async () => {
            await dispatch(getInvoicesAction());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices); 
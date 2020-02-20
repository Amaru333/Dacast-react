import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { ThunkDispatch } from 'redux-thunk';
import { Invoice, getInvoicesAction, Action } from '../../redux-flow/store/Account/Invoices';
import { LoadingSpinner } from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InvoicesPage } from '../../pages/Account/Invoices/Invoices';

export interface InvoicesComponentProps {
    invoices: Invoice[];
    getInvoices: Function;
}

const Invoices = (props: InvoicesComponentProps) => {

    React.useEffect(() => {
        if(!props.invoices) {
            props.getInvoices();
        }
    }, [])

    return (
        props.invoices ?
            <InvoicesPage {...props} />
            : <LoadingSpinner size='large' color='blue60' />
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        invoices: state.account.invoices
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getInvoices: () => {
            dispatch(getInvoicesAction());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices); 
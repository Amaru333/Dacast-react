import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { ThunkDispatch } from 'redux-thunk';
import { getInvoicesAction, Action, SearchInvoicesResult } from '../../redux-flow/store/Account/Invoices';
import { InvoicesPage } from '../../pages/Account/Invoices/Invoices';

export interface InvoicesComponentProps {
    invoicesInfo: SearchInvoicesResult;
    getInvoices: (qs: string) => Promise<void>;
}

const Invoices = (props: InvoicesComponentProps) => {

    return <InvoicesPage {...props} />
}

export function mapStateToProps( state: ApplicationState) {
    return {
        invoicesInfo: state.account.invoices
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getInvoices: async (qs: string) => {
            await dispatch(getInvoicesAction(qs));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices); 
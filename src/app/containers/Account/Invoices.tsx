import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from "../../redux-flow/store";
import { ThunkDispatch } from 'redux-thunk';
import { Invoice, getInvoicesAction, Action, SearchInvoicesResult } from '../../redux-flow/store/Account/Invoices';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { InvoicesPage } from '../../pages/Account/Invoices/Invoices';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface InvoicesComponentProps {
    invoicesInfo: SearchInvoicesResult;
    getInvoices: (qs: string) => Promise<void>;
}

const Invoices = (props: InvoicesComponentProps) => {

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getInvoices(null)
        .then(() => setIsFetching(false))
        .catch(() => setNodataFetched(true))
    }, [])


    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    if(isFetching) {
        return <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    }
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
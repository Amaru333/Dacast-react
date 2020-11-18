import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { TransactionsPage } from '../../pages/Paywall/Tansactions/Transactions';
import { getTransactionsAction, Action, getTransactionsCsvAction } from '../../redux-flow/store/Paywall/Transactions/actions';
import { TransactionsInfo } from '../../redux-flow/store/Paywall/Transactions/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';

export interface TransactionsComponentProps {
    transactionsInfo: TransactionsInfo;
    getTransactions: (qs:string) => Promise<void>;
    getTransactionsCsv: () => Promise<void>;
}

const Transactions = (props: TransactionsComponentProps) => {

    const [isFetching, setIsFetching] = React.useState<boolean>(true)
    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)

    React.useEffect(() => {
        props.getTransactions('page=1&perPage=20&sortBy=created-at-desc')
        .then(() => setIsFetching(false))
        .catch(() => setNodataFetched(true))

    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        !isFetching ?     
            <TransactionsPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        transactionsInfo: state.paywall.transactions
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getTransactions: async (qs:string) => {
            await dispatch(getTransactionsAction(qs))
        },
        getTransactionsCsv: async () => {
            await dispatch(getTransactionsCsvAction(undefined))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
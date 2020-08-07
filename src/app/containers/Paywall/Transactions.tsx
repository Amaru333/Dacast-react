import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { TransactionsPage } from '../../pages/Paywall/Tansactions/Transactions';
import { getTransactionsAction, Action } from '../../redux-flow/store/Paywall/Transactions/actions';
import { TransactionsInfos } from '../../redux-flow/store/Paywall/Transactions/types';
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';

export interface TransactionsComponentProps {
    transactionsInfos: TransactionsInfos;
    getTransactions: () => Promise<void>;
}

const Transactions = (props: TransactionsComponentProps) => {

    React.useEffect(() => {
        if(!props.transactionsInfos) {
            props.getTransactions()
        }
    }, [])

    return (
        props.transactionsInfos ?     
            <TransactionsPage {...props} />
            : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        transactionsInfos: state.paywall.transactions
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getTransactions: async () => {
            await dispatch(getTransactionsAction())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
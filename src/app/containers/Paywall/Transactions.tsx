import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { TransactionsPage } from '../../pages/Paywall/Tansactions/Transactions';
import { getTransactionsAction, Action, getTransactionsCsvAction, syncTransactionsAction } from '../../redux-flow/store/Paywall/Transactions/actions';
import { TransactionsInfo } from '../../redux-flow/store/Paywall/Transactions/types';
import { Privilege } from '../../../utils/services/token/token';
import { userToken } from '../../utils/services/token/tokenService';
import PlanLimitReachedModal from '../../containers/Navigation/PlanLimitReachedModal';

export interface TransactionsComponentProps {
    transactionsInfo: TransactionsInfo;
    associatePrivilege: Privilege;
    getTransactions: (qs: string) => Promise<void>;
    getTransactionsCsv: (qs: string) => Promise<void>;
}

const Transactions = (props: TransactionsComponentProps) => {
    const [PlanLimitReachedModalOpen, setPlanLimitReachedModalOpen] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (userToken.isUnauthorized(props.associatePrivilege)) {
            setPlanLimitReachedModalOpen(true)
        }
    }, [])

    return (
        <>
            <TransactionsPage {...props} />
            <PlanLimitReachedModal type='feature_not_included_starter_paywall' toggle={() => setPlanLimitReachedModalOpen(false)} opened={PlanLimitReachedModalOpen === true} allowNavigation={true}/>
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        transactionsInfo: state.paywall.transactions
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getTransactions: async (qs: string) => {
            await dispatch(getTransactionsAction(qs))
        },
        getTransactionsCsv: async (qs: string) => {
            await dispatch(getTransactionsCsvAction(qs))
        },
        syncTransactions: async () => {
            await dispatch(syncTransactionsAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)

import React from 'react';
import { ApplicationState } from '../../redux-flow/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { PayoutPage } from '../../pages/Paywall/Payout/Payout';
import { Action, addWithdrawalRequestAction, getPaymentMethodsAction, getWithdrawalRequestsAction, addPaymentMethodAction, updatePaymentMethodAction, deletePaymentMethodAction, cancelWithdrawalRequestAction, getPaywallBalanceAction } from '../../redux-flow/store/Paywall/Payout/actions'
import { LoadingSpinner } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner';
import { PayoutInfos, WithdrawalRequest, PaymentMethod, PaymentMethodPut } from '../../redux-flow/store/Paywall/Payout';
import { SpinnerContainer } from '../../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinnerStyle';
import { NotificationType, Size } from '../../../components/Toast/ToastTypes';
import { showToastNotification } from '../../redux-flow/store/Toasts/actions';
import { ErrorPlaceholder } from '../../../components/Error/ErrorPlaceholder';
import { Privilege } from '../../../utils/services/token/token';
import { userToken } from '../../utils/services/token/tokenService';
import PlanLimitReachedModal from '../../containers/Navigation/PlanLimitReachedModal';

export interface PayoutComponentProps {
    payoutInfos: PayoutInfos;
    getPaymentMethods: () => Promise<void>;
    getWithdrawalRequests: () => Promise<void>;
    associatePrivilege: Privilege;
    addPaymentMethod: (data: PaymentMethodPut) => Promise<void>;
    updatePaymentMethod: (data: PaymentMethodPut) => Promise<void>;
    deletePaymentMethod: (data: PaymentMethod) => Promise<void>;
    addWithdrawalRequest: (data: WithdrawalRequest) => Promise<void>;
    cancelWithdrawalRequest: (data: WithdrawalRequest) => Promise<void>;
    getBalance: () => Promise<void>;
    showToast: (text: string, size: Size, notificationType: NotificationType) => void;
}


const Payout = (props: PayoutComponentProps) => {

    const [noDataFetched, setNodataFetched] = React.useState<boolean>(false)
    const [PlanLimitReachedModalOpen, setPlanLimitReachedModalOpen] = React.useState<boolean>(false)

    const isLocked = () => {
        return props.associatePrivilege && !userToken.getPrivilege(props.associatePrivilege)
    }

    React.useEffect(() => {
        if (isLocked()) {
            setPlanLimitReachedModalOpen(true)
        } else {
            props.getPaymentMethods()
                .catch(() => setNodataFetched(true))

            props.getWithdrawalRequests()
                .catch(() => setNodataFetched(true))

            props.getBalance()
        }
    }, [])

    if(noDataFetched) {
        return <ErrorPlaceholder />
    }

    return (
        <>
            {props.payoutInfos || isLocked() ?
                <PayoutPage {...props} />
                : <SpinnerContainer><LoadingSpinner size='medium' color='violet' /></SpinnerContainer>}
            <PlanLimitReachedModal type='feature_not_included_starter_paywall' toggle={() => setPlanLimitReachedModalOpen(false)} opened={PlanLimitReachedModalOpen === true} allowNavigation={true}/>
        </>
    )
}

export function mapStateToProps(state: ApplicationState) {
    return {
        payoutInfos: state.paywall.payout
    };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        getPaymentMethods: async () => {
            await dispatch(getPaymentMethodsAction(undefined))
        },
        getWithdrawalRequests: async () => {
            await dispatch(getWithdrawalRequestsAction(undefined))
        },
        addPaymentMethod: async (data: PaymentMethodPut) => {
            await dispatch(addPaymentMethodAction(data));
        },
        updatePaymentMethod: async (data: PaymentMethodPut) => {
            await dispatch(updatePaymentMethodAction(data));
        },
        deletePaymentMethod: async (data: PaymentMethod) => {
            await dispatch(deletePaymentMethodAction(data));
        },
        addWithdrawalRequest: async (data: WithdrawalRequest) => {
            await dispatch(addWithdrawalRequestAction(data));
        },
        cancelWithdrawalRequest: async (data: WithdrawalRequest) => {
            await dispatch(cancelWithdrawalRequestAction(data));
        },
        getBalance: async () => {
            await dispatch(getPaywallBalanceAction(undefined));
        },
        showToast: (text: string, size: Size, notificationType: NotificationType) => {
            dispatch(showToastNotification(text, size, notificationType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payout);
